/* Brew & Bite Café — helpers shared by the customer screens */
(function () {
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // "Iced · Large (16 oz) · Oat milk, Extra espresso shot"
  function optionText(line) {
    const singles = line.options.filter(o => o.groupId !== 'addons' && o.groupId !== 'side').map(o => o.groupId === 'sugar' ? o.name + ' sugar' : o.name);
    const multis = line.options.filter(o => o.groupId === 'addons' || o.groupId === 'side').map(o => o.name);
    return [...singles, multis.join(', ')].filter(Boolean).join(' · ');
  }

  function sessionLabel(s) {
    return s.type === 'dine-in' ? `TABLE ${s.table} · DINE-IN` : 'TAKE-OUT';
  }

  function orderTypeLabel(o) {
    if (o.type === 'dine-in') return `Dine-in · Table ${o.table}`;
    if (o.type === 'delivery') return 'Delivery';
    return 'Take-out';
  }

  // Screens after the menu need a scanned QR session; otherwise send people to the menu's scan prompt
  function requireSession() {
    const s = BB.session.get();
    if (!s) { location.replace('menu.html'); return null; }
    const pill = document.getElementById('sessionPill');
    if (pill) pill.textContent = sessionLabel(s);
    return s;
  }

  let toastTimer;
  function toast(msg) {
    let el = document.querySelector('.toast-pop');
    if (!el) { el = document.createElement('div'); el.className = 'toast-pop'; el.setAttribute('role', 'status'); document.body.appendChild(el); }
    el.textContent = msg;
    el.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { el.hidden = true; }, 2400);
  }

  // Item rows used in cart summaries and receipts
  function lineRows(lines) {
    return lines.map(l => `
      <div class="li">
        <span class="li-qty">${l.qty}×</span>
        <span class="li-main"><b>${esc(l.name)}</b>${optionText(l) ? `<small>${esc(optionText(l))}</small>` : ''}${l.notes ? `<small class="li-note">Note: ${esc(l.notes)}</small>` : ''}</span>
        <span class="li-amt num">${BB.peso(l.unitPrice * l.qty, true)}</span>
      </div>`).join('');
  }

  window.BBC = { esc, optionText, sessionLabel, orderTypeLabel, requireSession, toast, lineRows };
})();
