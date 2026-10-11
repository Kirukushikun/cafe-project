/* Brew & Bite Café — small SVG charts for the admin screens (no library) */
(function () {
  const NS = 'http://www.w3.org/2000/svg';
  const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // "Nice" axis max and ticks
  function niceMax(v) {
    if (v <= 0) return 1;
    const p = Math.pow(10, Math.floor(Math.log10(v)));
    const n = v / p;
    return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10) * p;
  }

  function tooltip(host) {
    let tip = host.querySelector('.chart-tip');
    if (!tip) { tip = document.createElement('div'); tip.className = 'chart-tip'; tip.hidden = true; host.appendChild(tip); }
    return tip;
  }

  /* Vertical bar chart.
     data: [{ label, value, tip }]  opts: { format(v), height, highlight: index, axisLabel } */
  function bars(host, data, opts) {
    opts = opts || {};
    const fmt = opts.format || (v => v);
    const W = Math.max(host.clientWidth || 600, 280), H = opts.height || 220;
    const pad = { t: 12, r: 8, b: 26, l: 56 };
    const iw = W - pad.l - pad.r, ih = H - pad.t - pad.b;
    const max = niceMax(Math.max(0, ...data.map(d => d.value)));
    const step = iw / Math.max(1, data.length);
    const bw = Math.max(3, Math.min(28, step * 0.62));
    const labelEvery = Math.ceil(data.length / Math.max(1, Math.floor(iw / 44)));

    let svg = `<svg viewBox="0 0 ${W} ${H}" width="100%" height="${H}" role="img" aria-label="${esc(opts.axisLabel || 'Bar chart')}">`;
    for (let i = 0; i <= 4; i++) {
      const v = max * i / 4, y = pad.t + ih - ih * i / 4;
      svg += `<line x1="${pad.l}" x2="${W - pad.r}" y1="${y}" y2="${y}" class="grid"/>`;
      svg += `<text x="${pad.l - 8}" y="${y + 4}" text-anchor="end" class="axis">${esc(fmt(v, true))}</text>`;
    }
    data.forEach((d, i) => {
      const h = max ? ih * d.value / max : 0;
      const x = pad.l + step * i + (step - bw) / 2, y = pad.t + ih - h;
      const r = Math.min(4, bw / 2, h);
      // Rounded top, square base
      const path = h > 0 ? `M${x},${pad.t + ih} V${y + r} Q${x},${y} ${x + r},${y} H${x + bw - r} Q${x + bw},${y} ${x + bw},${y + r} V${pad.t + ih} Z` : '';
      svg += `<g class="bar${opts.highlight === i ? ' hl' : ''}" data-i="${i}">
        <rect x="${pad.l + step * i}" y="${pad.t}" width="${step}" height="${ih}" class="hit"/>
        ${path ? `<path d="${path}"/>` : ''}
      </g>`;
      // Label every Nth bar plus the last one, skipping a regular label that would crowd the last
      const last = data.length - 1;
      if (i === last || (i % labelEvery === 0 && last - i >= labelEvery)) svg += `<text x="${pad.l + step * i + step / 2}" y="${H - 8}" text-anchor="middle" class="axis">${esc(d.label)}</text>`;
    });
    svg += `<line x1="${pad.l}" x2="${W - pad.r}" y1="${pad.t + ih}" y2="${pad.t + ih}" class="base"/></svg>`;
    host.classList.add('chart');
    host.innerHTML = svg;
    const tip = tooltip(host);

    host.querySelectorAll('.bar').forEach(g => {
      const show = (e) => {
        const d = data[g.dataset.i];
        host.querySelectorAll('.bar').forEach(b => b.classList.toggle('on', b === g));
        tip.innerHTML = d.tip || `<b>${esc(d.label)}</b><span>${esc(fmt(d.value))}</span>`;
        tip.hidden = false;
        const box = host.getBoundingClientRect();
        const bx = g.querySelector('.hit').getBoundingClientRect();
        let left = bx.left - box.left + bx.width / 2 - tip.offsetWidth / 2;
        left = Math.max(0, Math.min(left, box.width - tip.offsetWidth));
        tip.style.left = left + 'px';
        tip.style.top = '0px';
      };
      g.addEventListener('mouseenter', show);
      g.addEventListener('click', show);
    });
    host.addEventListener('mouseleave', () => { tip.hidden = true; host.querySelectorAll('.bar').forEach(b => b.classList.remove('on')); });
  }

  /* 100% share bar with labeled legend. parts: [{ label, value, color }] */
  function share(host, parts, fmt) {
    fmt = fmt || (v => v);
    const total = parts.reduce((n, p) => n + p.value, 0) || 1;
    host.innerHTML = `
      <div class="share-bar" role="img" aria-label="${esc(parts.map(p => `${p.label} ${Math.round(p.value / total * 100)}%`).join(', '))}">
        ${parts.filter(p => p.value > 0).map(p => `<i style="flex:${p.value};background:${p.color}" title="${esc(p.label)}: ${esc(fmt(p.value))}"></i>`).join('')}
      </div>
      <div class="share-legend">
        ${parts.map(p => `<span><i style="background:${p.color}"></i>${esc(p.label)} <b>${Math.round(p.value / total * 100)}%</b> <small>${esc(fmt(p.value))}</small></span>`).join('')}
      </div>`;
  }

  window.BBChart = { bars, share };
})();
