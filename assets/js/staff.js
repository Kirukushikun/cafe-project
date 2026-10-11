/* Brew & Bite Café — shared shell for staff screens (login guard, sidebar, clock) */
(function () {
  // Every staff screen; "built" ones are clickable, the rest show as planned.
  const NAV = [
    { group: 'Cashier', roles: ['cashier', 'admin'], links: [
      { id: 'pos', label: 'Point of sale', href: '../cashier/pos.html', built: true },
      { id: 'orders', label: 'Orders', href: '../cashier/orders.html', built: true, badge: 'awaiting' }
    ]},
    { group: 'Kitchen', roles: ['kitchen', 'admin'], links: [
      { id: 'kitchen', label: 'Kitchen display', href: '../kitchen/display.html' }
    ]},
    { group: 'Inventory', roles: ['inventory', 'admin'], links: [
      { id: 'ingredients', label: 'Ingredients', href: '../inventory/ingredients.html' },
      { id: 'alerts', label: 'Low-stock alerts', href: '../inventory/alerts.html' },
      { id: 'suppliers', label: 'Suppliers', href: '../inventory/suppliers.html' },
      { id: 'po', label: 'Purchase orders', href: '../inventory/purchase-orders.html' },
      { id: 'wastage', label: 'Wastage', href: '../inventory/wastage.html' }
    ]},
    { group: 'Admin', roles: ['admin'], links: [
      { id: 'dashboard', label: 'Dashboard', href: '../admin/dashboard.html' },
      { id: 'menu', label: 'Menu', href: '../admin/menu.html' },
      { id: 'reports', label: 'Reports', href: '../admin/reports.html' },
      { id: 'users', label: 'Users', href: '../admin/users.html' },
      { id: 'audit', label: 'Audit logs', href: '../admin/audit.html' }
    ]}
  ];

  const ROLE_NAME = { admin: 'Owner / Admin', cashier: 'Cashier', kitchen: 'Kitchen', inventory: 'Stock clerk' };

  // Redirects to login unless the logged-in user has one of the roles (admin may open everything).
  // Then draws the sidebar with `active` highlighted.
  function init(roles, active) {
    const user = BB.staff.current();
    const here = location.pathname.split('/').slice(-2).join('/');
    if (!user) { location.replace('../login.html?next=' + encodeURIComponent(here)); return null; }
    if (user.role !== 'admin' && !roles.includes(user.role)) {
      document.body.innerHTML = `<div style="padding:48px 24px;text-align:center;display:grid;gap:12px;justify-items:center">
        <h1 style="font-family:var(--display)">You don’t have access to this screen</h1>
        <p class="muted">You’re logged in as ${BBC.esc(user.name)} (${ROLE_NAME[user.role]}).</p>
        <a class="btn btn-primary" href="../login.html">Log in as someone else</a></div>`;
      return null;
    }
    renderSide(user, active);
    startClock();
    return user;
  }

  function renderSide(user, active) {
    const side = document.getElementById('side');
    if (!side) return;
    const groups = NAV.filter(g => g.roles.includes(user.role));
    side.innerHTML = `
      <a class="brand" href="../index.html"><span class="brand-mark">B&amp;B</span><span class="brand-name">Brew &amp; Bite</span></a>
      ${groups.map(g => `
        <nav class="side-group" aria-label="${g.group}">
          <h4>${g.group}</h4>
          ${g.links.map(l => `<a class="nav${l.id === active ? ' on' : ''}${l.built ? '' : ' planned'}" href="${l.href}" ${l.built ? '' : 'title="Not built yet"'}>
            <span>${l.label}</span>${l.badge ? '<span class="count" data-badge="' + l.badge + '" hidden></span>' : ''}</a>`).join('')}
        </nav>`).join('')}
      <div class="side-user">
        <span><b>${BBC.esc(user.name)}</b><small>${ROLE_NAME[user.role]}</small></span>
        <button type="button" id="logout">Log out</button>
      </div>`;
    document.getElementById('logout').addEventListener('click', () => {
      BB.staff.logout();
      location.href = '../login.html';
    });
    updateBadges();
    setInterval(updateBadges, 3000);
  }

  function updateBadges() {
    const n = BB.orders.list().filter(o => o.status === 'awaiting_payment').length;
    document.querySelectorAll('[data-badge="awaiting"]').forEach(b => { b.hidden = n === 0; b.textContent = n; });
  }

  function startClock() {
    const el = document.getElementById('clock');
    if (!el) return;
    const tick = () => { el.textContent = new Date().toLocaleString('en-PH', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }); };
    tick();
    setInterval(tick, 15000);
  }

  // "8 min ago"
  function ago(iso) {
    const m = Math.floor((Date.now() - new Date(iso)) / 60000);
    if (m < 1) return 'just now';
    if (m < 60) return m + ' min ago';
    const h = Math.floor(m / 60);
    return h + ' hr ' + (m % 60) + ' min ago';
  }

  // Calls fn whenever saved orders change (another tab, or every few seconds)
  function onOrdersChange(fn) {
    let last = '';
    const check = () => {
      let raw = '';
      try { raw = localStorage.getItem('bb_orders') || ''; } catch (e) { /* storage blocked */ }
      if (raw !== last) { last = raw; fn(); }
    };
    window.addEventListener('storage', check);
    setInterval(check, 3000);
    check();
  }

  window.BBS = { init, ago, onOrdersChange, ROLE_NAME };
})();
