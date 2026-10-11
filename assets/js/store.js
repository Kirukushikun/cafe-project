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
    create(order) {
      const all = orders.list();
      const now = new Date().toISOString();
      order.id = order.id || 'o' + Date.now();
      order.orderNo = nextNumber('BB');
      order.createdAt = now;
      order.statusLog = [{ status: order.status, at: now }];
      all.push(order);
      set('orders', all);
      const mine = get('myOrders', []);
      mine.push(order.id);
      set('myOrders', mine);
      return order;
    },
    update(id, patch) {
      const all = orders.list();
      const o = all.find(x => x.id === id);
      if (!o) return null;
      if (patch.status && patch.status !== o.status) o.statusLog.push({ status: patch.status, at: new Date().toISOString() });
      Object.assign(o, patch);
      set('orders', all);
      return o;
    },
    mine: () => get('myOrders', []).map(orders.get).filter(Boolean)
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
      orders.update(order.id, { status: 'paid', paidAt: now, method, paymentRef: p.referenceNo, pointsEarned: points });
      return p;
    }
  };

  // Status wording shown to customers
  const STATUS = {
    awaiting_payment: { label: 'Awaiting payment', chip: 'chip-red' },
    paid: { label: 'Order received', chip: 'chip-gcash' },
    preparing: { label: 'Preparing', chip: 'chip-caramel' },
    ready: { label: 'Ready', chip: 'chip-green' },
    completed: { label: 'Completed', chip: 'chip-green' },
    cancelled: { label: 'Cancelled', chip: 'chip-red' }
  };

  window.BB = { get, set, reset, peso, round2, ymd, nextNumber, dateTime, session, cart, checkVoucher, loyalty, orders, payments, STATUS };
})();
