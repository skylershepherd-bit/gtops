(function() {
  const FB_URL = 'https://gt-ops-ce4fd-default-rtdb.firebaseio.com/coverage.json';

  const COLORS = {
    slow:     { bg: '#f0fff4', border: '#38a169', text: '#22543d', dot: '#38a169' },
    moderate: { bg: '#fffbeb', border: '#d69e2e', text: '#744210', dot: '#d69e2e' },
    busy:     { bg: '#fff5f5', border: '#e53e3e', text: '#742a2a', dot: '#e53e3e' },
    full:     { bg: '#fff5f5', border: '#9b2c2c', text: '#63171b', dot: '#9b2c2c' },
    closed:   { bg: '#f7fafc', border: '#718096', text: '#2d3748', dot: '#718096' },
  };

  function render(data) {
    const s = data.status || 'slow';
    const c = COLORS[s] || COLORS.slow;
    const wait = data.waitText || 'No wait';
    const label = data.label || 'Slow';
    const icon = data.icon || '🟢';

    const existing = document.getElementById('gt-coverage-widget');
    if (existing) existing.remove();

    const widget = document.createElement('div');
    widget.id = 'gt-coverage-widget';
    widget.style.cssText = `
      display:inline-flex;align-items:center;gap:10px;
      background:${c.bg};border:1.5px solid ${c.border};
      border-radius:10px;padding:10px 16px;
      font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
      font-size:14px;color:${c.text};
      box-shadow:0 1px 3px rgba(0,0,0,0.08);
    `;

    widget.innerHTML = `
      <span style="font-size:20px;line-height:1">${icon}</span>
      <div>
        <div style="font-weight:700;font-size:14px">${label}</div>
        <div style="font-size:12px;opacity:0.75;margin-top:1px">${wait}</div>
      </div>
    `;

    const target = document.getElementById('gt-coverage') || document.currentScript?.parentElement || document.body;
    target.appendChild(widget);
  }

  function fetchStatus() {
    fetch(FB_URL)
      .then(r => r.json())
      .then(d => { if (d) render(d); })
      .catch(() => {});
  }

  fetchStatus();
  setInterval(fetchStatus, 30000); // refresh every 30 seconds
})();
