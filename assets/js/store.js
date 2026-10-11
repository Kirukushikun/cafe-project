/* Brew & Bite Café — browser storage helpers that stand in for a database.
   Every key starts with "bb_" so "Reset demo data" can clear them all. */
(function () {
  const PREFIX = 'bb_';

  function get(key, fallback) {
    try {
      const raw = localStorage.getItem(PREFIX + key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch (e) {
      return fallback;
    }
  }

  function set(key, value) {
    try { localStorage.setItem(PREFIX + key, JSON.stringify(value)); } catch (e) { /* storage blocked */ }
  }

  function reset() {
    try {
      Object.keys(localStorage).filter(k => k.startsWith(PREFIX)).forEach(k => localStorage.removeItem(k));
      return true;
    } catch (e) {
      return false;
    }
  }

  // Peso formatting: peso(145) -> "₱145", peso(145, true) -> "₱145.00"
  function peso(n, decimals) {
    return '₱' + Number(n).toLocaleString('en-PH', {
      minimumFractionDigits: decimals ? 2 : 0,
      maximumFractionDigits: decimals ? 2 : 0
    });
  }

  const round2 = (n) => Math.round(n * 100) / 100;

  // 2026-10-11 -> "20261011"
  function ymd(d) {
    d = d || new Date();
    return d.getFullYear() + String(d.getMonth() + 1).padStart(2, '0') + String(d.getDate()).padStart(2, '0');
  }

  // Daily counters: nextNumber('GC') -> "GC-20261011-0001"
  function nextNumber(prefix) {
    const seq = get('seq', {});
    const key = prefix + '-' + ymd();
    seq[key] = (seq[key] || 0) + 1;
    set('seq', seq);
    return key + '-' + String(seq[key]).padStart(4, '0');
  }

  function dateTime(iso) {
    return new Date(iso).toLocaleString('en-PH', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });
  }

  // ---- Ordering session set by the table QR (dine-in) or the counter QR (take-out) ----
  const session = {
    get: () => get('session', null),
    set: (s) => set('session', s)
  };

  // ---- Cart ----
  const cart = {
    lines: () => get('cart', []),
    save: (lines) => set('cart', lines),
    add(line) {
      const lines = cart.lines();
      const same = lines.find(l => l.key === line.key && l.notes === line.notes);
      if (same) same.qty += line.qty;
      else lines.push(Object.assign({ id: Date.now() }, line));
      cart.save(lines);
      return lines;
    },
    setQty(id, qty) {
      const lines = cart.lines().map(l => l.id === id ? Object.assign(l, { qty }) : l).filter(l => l.qty > 0);
      cart.save(lines);
      return lines;
    },
    count: () => cart.lines().reduce((n, l) => n + l.qty, 0),
    total: () => cart.lines().reduce((n, l) => n + l.qty * l.unitPrice, 0),
    clear: () => set('cart', [])
  };

  // ---- Vouchers ----
  // Returns { ok, amount, freeDelivery, message } for a code against a subtotal.
  function checkVoucher(code, subtotal) {
    const v = (window.BB_DATA.vouchers || []).find(x => x.code === String(code || '').trim().toUpperCase());
    if (!v) return { ok: false, message: 'That voucher code does not exist. Check the spelling and try again.' };
    if (!v.active) return { ok: false, message: `${v.code} has already expired.` };
    if (subtotal < v.minSpend) return { ok: false, message: `${v.code} needs a minimum order of ${peso(v.minSpend)}. Add ${peso(v.minSpend - subtotal)} more.` };
    let amount = 0;
    if (v.kind === 'percent') amount = Math.min(round2(subtotal * v.value / 100), v.max || Infinity);
    if (v.kind === 'fixed') amount = v.value;
    return { ok: true, code: v.code, label: v.label, amount, freeDelivery: v.kind === 'delivery' };
  }

  // ---- Loyalty (sample members live in data.js; earned points are added here) ----
  const loyalty = {
    member(mobile) {
      const base = (window.BB_DATA.loyalty.members || {})[mobile];
      const extra = get('loyalty', {})[mobile];
      if (!base && !extra) return null;
      return {
        name: (base && base.name) || (extra && extra.name) || '',
        points: (base ? base.points : 0) + (extra ? extra.points : 0)
      };
    },
    add(mobile, name, points) {
      const all = get('loyalty', {});
      const rec = all[mobile] || { name: name || '', points: 0 };
      rec.points += points;
      if (name && !rec.name) rec.name = name;
      all[mobile] = rec;
      set('loyalty', all);
    },
    earnFor: (amount) => Math.floor(amount / window.BB_DATA.loyalty.pesoPerPoint)
  };

  // ---- Orders ----
  const orders = {
    list: () => get('orders', []),
    get: (id) => orders.list().find(o => o.id === id) || null,
    // opts.mine = false for counter (POS) orders, so they don't show in this browser's "My orders"
    create(order, opts) {
      const all = orders.list();
      const now = new Date().toISOString();
      order.id = order.id || 'o' + Date.now();
      order.orderNo = nextNumber('BB');
      order.createdAt = now;
      order.statusLog = [{ status: order.status, at: now }];
      all.push(order);
      set('orders', all);
      if (!opts || opts.mine !== false) {
        const mine = get('myOrders', []);
        mine.push(order.id);
        set('myOrders', mine);
      }
      // Cash-on-delivery goes straight to the kitchen, so its ingredients are used now
      if (orders.isCod(order)) inventory.deductForOrder(order);
      return orders.get(order.id);
    },
    update(id, patch) {
      const all = orders.list();
      const o = all.find(x => x.id === id);
      if (!o) return null;
      if (patch.status && patch.status !== o.status) o.statusLog.push({ status: patch.status, at: new Date().toISOString() });
      Object.assign(o, patch);
      set('orders', all);
      // Cancelled or voided after ingredients were deducted: put them back
      if ((patch.status === 'cancelled' || patch.status === 'voided') && o.stockDeducted) inventory.returnForOrder(o);
      return orders.get(id);
    },
    mine: () => get('myOrders', []).map(orders.get).filter(Boolean),
    // Still owes money (includes cash-on-delivery orders already in the kitchen)
    unpaid: (o) => !o.paidAt && !['cancelled', 'voided'].includes(o.status),
    // Cash-on-delivery orders go to the kitchen before they are paid
    isCod: (o) => o.type === 'delivery' && o.method === 'CASH'
  };

  // ---- Payments ----
  const METHOD_PREFIX = { GCASH: 'GC', MAYA: 'MY', CASH: 'CS' };
  const payments = {
    list: () => get('payments', []),
    forOrder: (orderId) => payments.list().find(p => p.orderId === orderId) || null,
    // Saves a Paid payment record and moves the order to Paid. No outside service is contacted.
    record(order, method, extra) {
      const now = new Date().toISOString();
      const p = Object.assign({
        id: 'p' + Date.now(),
        orderId: order.id,
        orderNo: order.orderNo,
        method,
        amount: order.total,
        status: 'PAID',
        referenceNo: nextNumber(METHOD_PREFIX[method]),
        paidAt: now,
        receivedBy: null
      }, extra || {});
      const all = payments.list();
      all.push(p);
      set('payments', all);

      const points = order.customer && order.customer.mobile ? loyalty.earnFor(order.total) : 0;
      if (points) loyalty.add(order.customer.mobile, order.customer.name, points);
      // Cash-on-delivery orders may already be in the kitchen or delivered; keep their stage
      const current = orders.get(order.id);
      const patch = { paidAt: now, method, paymentRef: p.referenceNo, pointsEarned: points };
      if (!current || current.status === 'awaiting_payment') patch.status = 'paid';
      orders.update(order.id, patch);
      audit.log('Payment recorded', `${order.orderNo} · ${method} · ${peso(p.amount, true)} · ${p.referenceNo}`);
      // Order confirmed: deduct recipe ingredients (skipped if already done, e.g. COD)
      inventory.deductForOrder(orders.get(order.id));
      return p;
    },
    // Voids a paid order: payment marked VOIDED, loyalty points reversed, order status "voided"
    voidOrder(order, reason) {
      const all = payments.list();
      const p = all.find(x => x.orderId === order.id);
      if (p) { p.status = 'VOIDED'; p.voidedAt = new Date().toISOString(); p.voidReason = reason; set('payments', all); }
      const m = order.customer && order.customer.mobile;
      if (m && order.pointsEarned) loyalty.add(m, '', -order.pointsEarned);
      if (m && order.pointsUsed) loyalty.add(m, '', order.pointsUsed);
      orders.update(order.id, { status: 'voided', cancelReason: reason });
      audit.log('Voided order', `${order.orderNo} · ${peso(order.total, true)} · ${reason}`);
    }
  };

  // ---- Menu availability (kitchen can mark items sold out; overrides data.js) ----
  const menu = {
    overrides: () => get('soldOut', {}),
    // Manual switch from the kitchen wins; otherwise sold out when an ingredient can't cover one serving
    isSoldOut(item) {
      const o = menu.overrides();
      if (item.id in o) return o[item.id];
      return !!item.soldOut || inventory.shortFor(item).length > 0;
    },
    setSoldOut(item, value) {
      const o = menu.overrides();
      o[item.id] = value;
      set('soldOut', o);
      audit.log(value ? 'Marked sold out' : 'Marked available', item.name);
    }
  };

  // ---- Inventory: ingredients, recipes, stock movements, suppliers, purchase orders ----
  const clone = (x) => JSON.parse(JSON.stringify(x));
  const who = () => { const s = staff.current(); return s ? s.name : 'System (auto)'; };

  const inventory = {
    ingredients() {
      let list = get('ingredients', null);
      if (!list) { list = clone(window.BB_DATA.ingredients); set('ingredients', list); }
      return list;
    },
    saveIngredients: (list) => set('ingredients', list),
    ing: (id) => inventory.ingredients().find(i => i.id === id) || null,

    suppliers() {
      let list = get('suppliers', null);
      if (!list) { list = clone(window.BB_DATA.suppliers); set('suppliers', list); }
      return list;
    },
    saveSuppliers: (list) => set('suppliers', list),
    supplier: (id) => inventory.suppliers().find(s => s.id === id) || null,

    purchaseOrders() {
      let list = get('purchaseOrders', null);
      if (!list) { list = clone(window.BB_DATA.samplePOs); set('purchaseOrders', list); }
      return list;
    },
    savePOs: (list) => set('purchaseOrders', list),

    movements: () => get('movements', []),

    // Changes stock and records why. qty is signed: negative uses stock, positive adds it.
    move(ingId, qty, type, ref, note, user) {
      const list = inventory.ingredients();
      const ing = list.find(i => i.id === ingId);
      if (!ing || !qty) return;
      const before = ing.stock;
      ing.stock = round2(ing.stock + qty);
      inventory.saveIngredients(list);
      const all = inventory.movements();
      all.push({ id: 'm' + Date.now() + Math.random().toString(36).slice(2, 6), at: new Date().toISOString(), ing: ingId, qty: round2(qty), type, ref: ref || '', note: note || '', user: user || who(), cost: round2(Math.abs(qty) * ing.cost), before, after: ing.stock });
      set('movements', all);
    },

    // Ingredient usage for one cart/order line: { ingId: qty }
    usageForLine(line) {
      const D = window.BB_DATA;
      const item = D.items.find(i => i.id === line.itemId);
      const use = {};
      const add = (id, q) => { use[id] = (use[id] || 0) + q; };
      if (!item) return use;
      const large = (line.options || []).some(o => o.groupId === 'size' && o.id === 'l');
      (D.recipes[item.id] || []).forEach(([id, q, scales]) => add(id, scales && large ? q * D.largeFactor : q));
      if (D.drinkCats.includes(item.cat)) { add(large ? 'cup16' : 'cup12', 1); add('lid', 1); }
      (line.options || []).forEach(o => {
        const r = D.optionRecipes[o.groupId + ':' + o.id];
        if (!r) return;
        (r.add || []).forEach(([id, q]) => add(id, q));
        if (r.replace && use[r.replace[0]]) { add(r.replace[1], use[r.replace[0]]); use[r.replace[0]] = 0; }
      });
      Object.keys(use).forEach(k => { use[k] = round2(use[k] * line.qty); if (!use[k]) delete use[k]; });
      return use;
    },
    usageForOrder(order) {
      const total = {};
      order.items.forEach(l => {
        const u = inventory.usageForLine(l);
        Object.keys(u).forEach(k => { total[k] = round2((total[k] || 0) + u[k]); });
      });
      return total;
    },
    deductForOrder(order) {
      if (!order || order.stockDeducted) return;
      const use = inventory.usageForOrder(order);
      const user = staff.current() ? staff.current().name : 'System (order)';
      Object.keys(use).forEach(id => inventory.move(id, -use[id], 'SALE', order.orderNo, '', user));
      orders.update(order.id, { stockDeducted: true });
    },
    returnForOrder(order) {
      if (!order || !order.stockDeducted) return;
      const use = inventory.usageForOrder(order);
      Object.keys(use).forEach(id => inventory.move(id, use[id], 'RETURN', order.orderNo, `Order ${order.status}`));
      orders.update(order.id, { stockDeducted: false });
    },

    // Ingredients that can't cover one basic serving of a menu item
    shortFor(item) {
      const use = inventory.usageForLine({ itemId: item.id, qty: 1, options: [] });
      return Object.keys(use).filter(id => { const g = inventory.ing(id); return g && g.stock < use[id]; });
    },
    // Menu items whose recipe uses this ingredient
    usedIn(ingId) {
      const D = window.BB_DATA;
      return D.items.filter(i => (D.recipes[i.id] || []).some(r => r[0] === ingId));
    },
    level(ing) {
      if (ing.stock <= 0) return 'out';
      if (ing.stock <= ing.reorder) return 'low';
      return 'ok';
    },
    // 12400 g -> "12.4 kg", 850 ml -> "850 ml", 12 pc -> "12 pcs"
    fmt(qty, unit) {
      const n = Number(qty);
      if (unit === 'g' && Math.abs(n) >= 1000) return round2(n / 1000).toLocaleString('en-PH') + ' kg';
      if (unit === 'ml' && Math.abs(n) >= 1000) return round2(n / 1000).toLocaleString('en-PH') + ' L';
      if (unit === 'pc') return round2(n).toLocaleString('en-PH') + (Math.abs(n) === 1 ? ' pc' : ' pcs');
      return round2(n).toLocaleString('en-PH') + ' ' + unit;
    }
  };

  // ---- Admin: save catalog changes (menu, recipes, vouchers, users, promo, loyalty settings) ----
  const admin = {
    save(key, value) {
      const D = window.BB_DATA;
      set(D.overrideKeys[key], value);
      if (key === 'loyaltyConfig') Object.assign(D.loyalty, value);
      else D[key] = value;
    }
  };

  // ---- Sales history for the dashboard and reports ----
  // Days before today are filled with generated sample sales (same numbers on every load,
  // never saved) so the reports have something to show. Today and any real orders come from storage.
  const history = {
    _cache: null,
    sample() {
      if (history._cache) return history._cache;
      const D = window.BB_DATA;
      const rnd = (seed) => () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
      const pick = (r, weights) => { let x = r() * weights.reduce((a, b) => a + b[1], 0); for (const w of weights) { x -= w[1]; if (x <= 0) return w[0]; } return weights[0][0]; };
      const popular = { latte: 9, spanish: 9, brownsugar: 8, matcha: 7, tapa: 6, americano: 6, macchiato: 5, wintermelon: 5, javachip: 4, adobo: 4, croissant: 4, okinawa: 4, mocha: 3, seasalt: 3, ube: 3, tocino: 3, fries: 3, choco: 2, strawberry: 2, cookies: 2, matchafrappe: 2, longganisa: 2, spam: 2, ensaymada: 2, pandesal: 2, clubhouse: 2, taro: 2 };
      const itemWeights = D.items.map(i => [i, popular[i.id] || 1]);
      const hours = [[7, 4], [8, 7], [9, 6], [10, 5], [11, 7], [12, 12], [13, 10], [14, 6], [15, 9], [16, 10], [17, 8], [18, 7], [19, 6], [20, 5], [21, 3]];
      const out = [];
      const today = new Date(); today.setHours(0, 0, 0, 0);
      for (let d = 30; d >= 1; d--) {
        const day = new Date(today.getTime() - d * 86400000);
        const r = rnd(Number(ymd(day)));
        const weekend = day.getDay() === 0 || day.getDay() === 6;
        const count = Math.round((weekend ? 172 : 138) * (0.85 + r() * 0.3));
        for (let n = 0; n < count; n++) {
          const at = new Date(day.getTime() + pick(r, hours) * 3600000 + Math.floor(r() * 60) * 60000);
          const lines = [];
          const nLines = r() < 0.55 ? 1 : r() < 0.8 ? 2 : 3;
          for (let k = 0; k < nLines; k++) {
            const item = pick(r, itemWeights);
            const options = [];
            (item.options || []).forEach(g => {
              if (g.type === 'single') {
                const ch = g.id === 'size' ? g.choices[r() < 0.42 ? 1 : 0] : g.choices[Math.floor(r() * g.choices.length)];
                options.push({ groupId: g.id, group: g.name, id: ch.id, name: ch.name, price: ch.price });
              } else if (r() < 0.28) {
                const ch = g.choices[Math.floor(r() * g.choices.length)];
                options.push({ groupId: g.id, group: g.name, id: ch.id, name: ch.name, price: ch.price });
              }
            });
            const unitPrice = item.price + options.reduce((a, o) => a + o.price, 0);
            lines.push({ itemId: item.id, name: item.name, qty: r() < 0.1 ? 2 : 1, unitPrice, options });
          }
          const subtotal = lines.reduce((a, l) => a + l.unitPrice * l.qty, 0);
          const type = pick(r, [['dine-in', 60], ['take-out', 32], ['delivery', 8]]);
          const method = pick(r, [['GCASH', 55], ['CASH', 35], ['MAYA', 10]]);
          let discount = 0, discountType = '';
          const roll = r();
          if (roll < 0.06) { discount = seniorDiscount(subtotal, 1, Math.max(1, nLines)); discountType = 'Senior/PWD'; }
          else if (roll < 0.11 && subtotal >= 150) { discount = 20; discountType = 'Voucher'; }
          const deliveryFee = type === 'delivery' ? D.delivery.fee : 0;
          out.push({ sample: true, orderNo: 'SAMPLE', paidAt: at.toISOString(), createdAt: at.toISOString(), items: lines, subtotal: round2(subtotal), discount: round2(discount), discountType, deliveryFee, total: round2(subtotal - discount + deliveryFee), method, type, source: r() < 0.7 ? 'qr' : 'pos' });
        }
      }
      history._cache = out;
      return out;
    },
    // Paid, not voided orders in [from, to), normalized for reports
    sales(from, to, includeSample) {
      const real = orders.list().filter(o => o.paidAt && o.status !== 'voided').map(o => ({
        sample: false, orderNo: o.orderNo, paidAt: o.paidAt, createdAt: o.createdAt, items: o.items, subtotal: o.subtotal,
        discount: round2((o.voucher ? o.voucher.amount : 0) + (o.senior ? o.senior.amount : 0) + (o.pointsUsed || 0)),
        discountType: o.senior ? 'Senior/PWD' : o.voucher ? 'Voucher' : o.pointsUsed ? 'Points' : '',
        deliveryFee: o.deliveryFee || 0, total: o.total, method: o.method, type: o.type, source: o.source || 'qr'
      }));
      const all = (includeSample === false ? [] : history.sample()).concat(real);
      return all.filter(o => { const t = new Date(o.paidAt); return t >= from && t < to; });
    },
    // Sample wastage (one or two entries a day) for days before today
    sampleWastage() {
      const out = [];
      const perishable = [['milk', 500, 'Spoiled or expired'], ['croissant', 2, 'Spoiled or expired'], ['pearls', 300, 'Spoiled or expired'], ['beans', 36, 'Remade (wrong order)'], ['cream', 200, 'Spoiled or expired'], ['ensaymada', 1, 'Spoiled or expired'], ['oat', 240, 'Spilled or dropped'], ['egg', 2, 'Spilled or dropped']];
      const today = new Date(); today.setHours(0, 0, 0, 0);
      for (let d = 30; d >= 1; d--) {
        const day = new Date(today.getTime() - d * 86400000);
        const k = Number(ymd(day)) % perishable.length;
        [perishable[k], perishable[(k + 3) % perishable.length]].slice(0, d % 3 === 0 ? 2 : 1).forEach(([ing, qty, reason], i) => {
          const g = inventory.ing(ing);
          if (g) out.push({ sample: true, at: new Date(day.getTime() + (20 + i) * 3600000).toISOString(), ing, qty: -qty, type: 'WASTAGE', note: reason, user: 'Sample data', cost: round2(qty * g.cost) });
        });
      }
      return out;
    }
  };

  // ---- Senior citizen / PWD discount ----
  // The eligible share (subtotal × eligible ÷ diners) is made VAT-exempt, then 20% off.
  // seniorDiscount(245, 1, 1) -> 70  (245 ÷ 1.12 = 218.75, less 20% = 175)
  function seniorDiscount(subtotal, eligible, diners) {
    const cfg = window.BB_DATA.seniorPwd;
    const share = subtotal * Math.min(eligible, diners) / diners;
    const exempt = share / (1 + cfg.vat);
    const discounted = exempt * (1 - cfg.percent / 100);
    return round2(share - discounted);
  }

  // Total after every adjustment on the order
  function orderTotal(o) {
    const t = o.subtotal
      - (o.voucher ? o.voucher.amount : 0)
      - (o.senior ? o.senior.amount : 0)
      - (o.pointsUsed || 0)
      + (o.deliveryFee || 0);
    return round2(Math.max(0, t));
  }

  // ---- Staff login (demo only) ----
  const staff = {
    current: () => get('staff', null),
    login(username, password) {
      const u = (window.BB_DATA.users || []).find(x => x.username === username.trim().toLowerCase() && x.password === password && x.active !== false);
      if (!u) return null;
      const s = { id: u.id, name: u.name, username: u.username, role: u.role, since: new Date().toISOString() };
      set('staff', s);
      audit.log('Logged in', `${u.name} (${u.role})`, s);
      return s;
    },
    logout() {
      const s = staff.current();
      if (s) audit.log('Logged out', s.name, s);
      set('staff', null);
    }
  };

  // ---- Audit log ----
  const audit = {
    list: () => get('audit', []),
    log(action, detail, who) {
      const u = who || staff.current() || { name: 'Customer (QR)', role: 'customer' };
      const all = audit.list();
      all.push({ id: 'a' + Date.now() + Math.random().toString(36).slice(2, 5), at: new Date().toISOString(), user: u.name, role: u.role, action, detail });
      set('audit', all);
    }
  };

  // Status wording shown to customers
  const STATUS = {
    awaiting_payment: { label: 'Awaiting payment', chip: 'chip-red' },
    paid: { label: 'Order received', chip: 'chip-gcash' },
    preparing: { label: 'Preparing', chip: 'chip-caramel' },
    ready: { label: 'Ready', chip: 'chip-green' },
    completed: { label: 'Completed', chip: 'chip-green' },
    cancelled: { label: 'Cancelled', chip: 'chip-red' },
    voided: { label: 'Voided', chip: 'chip-red' }
  };

  window.BB = { get, set, reset, peso, round2, ymd, nextNumber, dateTime, session, cart, checkVoucher, loyalty, orders, payments, STATUS, seniorDiscount, orderTotal, staff, audit, menu, inventory, admin, history };
})();
