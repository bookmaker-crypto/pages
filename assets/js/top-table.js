
(() => {
  'use strict';
  const DATA_URL = "https://777cdnfiles.site/data/aa2bf16e72387e51.php";
  const container = document.getElementById('affiliate-table');
  if (!container) return;
  const safeColor = value => typeof value === 'string' && /^#[0-9a-f]{6}$/i.test(value) ? value : '#eef0ea';
  const make = (tag, cls, text) => {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    if (text !== undefined) el.textContent = text;
    return el;
  };
  const render = rows => {
    container.replaceChildren();
    rows.forEach((item, index) => {
      const card = make('div', 'offer-card');
      const logoBox = make('div', 'logo-box');
      logoBox.style.backgroundColor = safeColor(item.background_color);
      const logo = document.createElement('img');
      logo.src = String(item.logo_url || '');
      logo.alt = item.brand ? 'Logo ' + String(item.brand) : 'Logo';
      logo.loading = index < 3 ? 'eager' : 'lazy';
      logo.decoding = 'async';
      logoBox.appendChild(logo);
      card.appendChild(logoBox);
      card.appendChild(make('div', 'brand', String(item.brand || '')));
      const rawRating = Number(item.rating);
      const ratingValue = Number.isFinite(rawRating) ? Math.max(0, Math.min(10, rawRating)) : 0;
      const rating = make('div', 'rating');
      const stars = make('span', 'stars');
      stars.style.setProperty('--fill', (ratingValue * 10) + '%');
      stars.setAttribute('aria-label', ratingValue.toFixed(1) + ' sur 10');
      rating.appendChild(stars);
      rating.appendChild(make('span', '', ratingValue.toFixed(1) + '/10'));
      card.appendChild(rating);
      const bonus = make('div', 'bonus-col');
      bonus.appendChild(make('div', 'bonus-label', 'Bonus de bienvenue'));
      bonus.appendChild(make('div', 'bonus-text', String(item.welcome_bonus || '')));
      card.appendChild(bonus);
      const ctaCol = make('div', 'cta-col');
      const cta = make('a', 'cta', 'Jouer');
      cta.href = String(item.cta_url || '#');
      cta.target = '_blank';
      cta.rel = 'nofollow sponsored noopener';
      ctaCol.appendChild(cta);
      card.appendChild(ctaCol);
      container.appendChild(card);
    });
  };
  fetch(DATA_URL, {method:'GET',mode:'cors',credentials:'omit'})
    .then(r => { if (!r.ok) throw new Error('HTTP '+r.status); return r.json(); })
    .then(data => { if (!Array.isArray(data)) throw new Error('Format inattendu'); render(data); })
    .catch(() => container.replaceChildren(make('div','affiliate-error','Le comparatif est temporairement indisponible. Veuillez réessayer plus tard.')));
})();
