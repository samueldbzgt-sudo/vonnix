/* Funil local VONNIX. Não carrega APIs, pixels ou configuração remota. */
(() => {
  'use strict';
  const C = window.VONNIX_CONFIG;
  if (!C) return;
  const $ = selector => document.querySelector(selector);
  const all = selector => [...document.querySelectorAll(selector)];
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const text = (selector, value) => all(selector).forEach(el => { el.textContent = value ?? ''; });
  const html = (selector, value) => { const el = $(selector); if (el) el.innerHTML = value; };
  const money = value => Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const icon = (name, cls = 'w-5 h-5') => '<svg aria-hidden="true" viewBox="0 0 24 24" class="ic ' + cls + '">' + (window.VONNIX_ICONS?.[name] || '') + '</svg>';
  const asset = id => C.assets[id];
  function localAssetPath(id) {
    const value = asset(id)?.path;
    if (typeof value !== 'string' || !value || /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(value) || value.includes('..') || value.startsWith('/')) return '';
    return value;
  }
  function image(id, attributes = '') {
    const item = asset(id), src = localAssetPath(id);
    if (!item || !src) return '';
    return '<img src="' + escape(src) + '" data-asset="' + escape(id) + '" alt="' + escape(item.alt) + '" width="' + item.width + '" height="' + item.height + '" decoding="async" ' + attributes + '>';
  }
  function validHttps(value) {
    try { const url = new URL(value); return url.protocol === 'https:' && !url.username && !url.password && !url.port && !/[\u0000-\u0020]/.test(value) ? url : null; }
    catch { return null; }
  }
  function publicationBlockers() {
    const flags = { commercialApproved: 'Ofertas e pagamentos', policiesApproved: 'Políticas oficiais', productSpecsApproved: 'Especificações do fornecedor', assetRightsApproved: 'Autorização dos recursos', businessIdentityApproved: 'Identificação da empresa' };
    const blockers = Object.entries(flags).filter(([key]) => C.publication[key] !== true).map(([, label]) => label);
    if (!validHttps(C.publication.canonicalUrl)) blockers.push('URL definitiva do funil');
    if (!C.business?.legalName || !C.business?.cnpj || !C.business?.address) blockers.push('Dados empresariais confirmados');
    Object.entries(C.assets).forEach(([id, item]) => {
      if (item.active && item.needsReplacement && (item.path === item.originalPath || item.approved !== true)) blockers.push('Nova arte ' + id);
    });
    Object.keys(C.policies).forEach(key => {
      const policy = C.policies[key];
      if (!policy.paragraphs.length && !validOfficialUrl(policy.officialUrl)) blockers.push('Conteúdo da política: ' + key);
    });
    return blockers;
  }
  function checkoutUrl(key) {
    const url = validHttps(C.checkout.urls[key]);
    if (!url || !C.checkout.allowedHosts.includes(url.hostname) || /nexbag/i.test(url.hostname + url.pathname)) return null;
    return url;
  }
  function validOfficialUrl(value) {
    const url = validHttps(value), official = new URL(C.brand.domain).hostname;
    return url && (url.hostname === official || url.hostname === 'www.' + official) ? url : null;
  }
  function updateBuyButtons() {
    const ready = !!checkoutUrl(selectedKit?.key);
    all('.buy').forEach(button => {
      button.disabled = !ready; button.setAttribute('aria-disabled', String(!ready));
      button.title = ready ? '' : 'Compras temporariamente indisponíveis. Fale com a VONNIX.';
    });
  }

  text('[data-marca], [data-marca-inline]', C.brand.name);
  text('#storeBadgeText', C.brand.storeBadge || 'SITE OFICIAL');
  text('[data-email]', C.brand.email);
  text('[data-year]', new Date().getFullYear());
  all('a[href^="mailto:"]').forEach(link => { link.href = 'mailto:' + C.brand.email; });
  all('[data-brand-logo]').forEach(img => {
    const id = img.dataset.brandLogo === 'dark' ? C.brand.logoDark : C.brand.logoLight;
    img.src = localAssetPath(id); img.alt = C.brand.name;
  });
  all('[data-asset]').forEach(img => { const item = asset(img.dataset.asset); if (item) { img.src = localAssetPath(img.dataset.asset); img.alt = item.alt; } });
  const footerLogo = $('footer .brand-logo');
  if (footerLogo) { const p = document.createElement('p'); p.dataset.footerSlogan = ''; p.textContent = C.brand.slogan; footerLogo.parentElement.after(p); }
  if (C.publication.businessIdentityApproved === true && C.business.legalName && C.business.cnpj && C.business.address) {
    html('#empresaBox', '<p class="font-semibold text-ink">' + escape(C.business.legalName) + '</p><p>CNPJ: ' + escape(C.business.cnpj) + '</p><p>' + escape(C.business.address) + '</p>' + (C.business.phone ? '<p>' + escape(C.business.phone) + '</p>' : '') + '<p class="mt-2">© ' + new Date().getFullYear() + ' ' + escape(C.brand.name) + '. Todos os direitos reservados.</p>');
  }

  const P = C.product;
  text('#tituloH1', P.tituloH1);
  const tickerItems = [{ icone: 'truck', texto: P.barraFrete }, ...P.beneficios.map(b => ({ icone: b.icone, texto: b.titulo.toUpperCase() })), { icone: 'sparkle', texto: P.barraDesconto }].filter(item => item.texto);
  const tickerGroup = tickerItems.map(item => '<span class="product-ticker-item">' + icon(item.icone) + '<span>' + escape(item.texto) + '</span></span>').join('');
  html('#productTickerTrack', '<div class="product-ticker-group">' + tickerGroup + '</div><div class="product-ticker-group" aria-hidden="true">' + tickerGroup + '</div>');
  const badge = $('#badgeDesc');
  if (badge) { badge.textContent = P.badgeDesconto; badge.hidden = !P.badgeDesconto; }
  text('[data-cta1]', P.ctaPrincipal); text('[data-cta2]', P.ctaOferta); text('[data-cta3]', P.ctaProva); text('[data-cta4]', P.ctaSticky);
  text('#descTitulo', P.descricaoTitulo); text('#descTexto', P.descricaoTexto);
  html('#beneficiosGrid', P.beneficios.map(b => '<div class="benefit-glow border border-line rounded-2xl p-3.5"><span class="w-10 h-10 rounded-xl bg-brand text-white flex items-center justify-center shadow-sm">' + icon(b.icone) + '</span><p class="font-extrabold text-sm mt-3 leading-tight">' + escape(b.titulo) + '</p><p class="text-xs leading-relaxed text-muted mt-1">' + escape(b.desc) + '</p></div>').join(''));
  html('#passosBox', P.passos.map((p, i) => '<div class="flex gap-3"><div class="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center font-bold shrink-0">' + (i + 1) + '</div><div><p class="font-bold text-sm">' + escape(p.titulo) + '</p><p class="text-sm text-muted">' + escape(p.desc) + '</p></div></div>').join(''));
  html('#infoBox', P.infograficos.map(id => image(id, 'loading="lazy" class="w-full rounded-2xl"')).join('') + '<p class="text-sm text-muted text-center px-4">As imagens mostram um conjunto com 15 sacos e uma bomba. Você recebe 1, 2 ou 3 conjuntos, conforme o kit escolhido.</p>');
  html('#detalhesBox', P.detalhes.map((d, i) => '<details' + (i === 0 ? ' open' : '') + '><summary class="flex justify-between items-center px-4 py-3 font-semibold text-sm">' + escape(d.t) + '<span class="chev transition" aria-hidden="true">⌄</span></summary><div class="px-4 pb-4 text-sm text-muted">' + escape(d.c) + '</div></details>').join(''));
  text('#compTitulo', P.comparacao.titulo); text('#compSub', P.comparacao.sub); text('#compColA', P.comparacao.colA); text('#compColB', P.comparacao.colB);
  const yes = '<svg aria-label="Incluído" role="img" viewBox="0 0 20 20" class="w-5 h-5 inline-block align-middle"><circle cx="10" cy="10" r="10" fill="#DCFCE7"/><path d="M5.8 10.4l2.6 2.6L14 7.2" fill="none" stroke="#16A34A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const no = '<svg aria-label="Ausente" role="img" viewBox="0 0 20 20" class="w-5 h-5 inline-block align-middle"><circle cx="10" cy="10" r="10" fill="#FEE2E2"/><path d="M7 7l6 6M13 7l-6 6" stroke="#DC2626" stroke-width="2" stroke-linecap="round"/></svg>';
  html('#compareBody', P.comparacao.linhas.map(label => '<tr class="border-t border-line"><td class="px-3 py-2.5">' + escape(label) + '</td><td class="text-center px-2 py-2.5">' + yes + '</td><td class="text-center px-2 py-2.5">' + no + '</td></tr>').join(''));
  html('#casosBox', P.casos.map(c => '<div class="bg-white border border-line rounded-xl p-3 flex items-center gap-2.5"><span class="text-brand shrink-0">' + icon(c.icone) + '</span><span>' + escape(c.texto) + '</span></div>').join(''));
  html('#faqBox', P.faq.map(f => '<details><summary class="flex justify-between items-center px-4 py-3 font-semibold text-sm">' + escape(f.q) + '<span class="chev transition" aria-hidden="true">⌄</span></summary><div class="px-4 pb-4 text-sm text-muted">' + escape(f.a) + '</div></details>').join(''));

  let selectedKit = C.offers.items.find(k => k.key === C.offers.defaultKey) || C.offers.items[0];
  function renderPrice() {
    if (!selectedKit || !$('#precoBox')) return;
    const k = selectedKit, discount = k.compare > k.price ? Math.round((1 - k.price / k.compare) * 100) : 0;
    const installments = C.offers.installments + 'x de ' + money(k.price * C.offers.cardMultiplier / C.offers.installments) + ' no cartão';
    const discountHtml = discount ? '<span class="bg-accent font-bold text-xs px-2 py-1 rounded-full mb-0.5">' + discount + '% OFF</span>' : '';
    html('#precoBox', '<span class="text-muted line-through text-sm">' + money(k.compare) + '</span><div class="flex items-end gap-2 mt-0.5"><span class="text-[34px] leading-none font-semibold">' + money(k.price) + '</span>' + discountHtml + '</div><p class="text-sm mt-1"><span class="text-brand font-semibold">' + escape(C.offers.pixLabel) + '</span> <span class="text-muted">· ou ' + installments + '</span></p>');
    html('#precoOferta', '<span class="inline-flex items-center gap-2 flex-wrap"><s class="text-muted text-sm">' + money(k.compare) + '</s>' + discountHtml + '</span><b class="block text-ink text-2xl mt-1">' + money(k.price) + '</b><span class="block mt-1">ou ' + installments + '</span>');
    text('#stickyDe', money(k.compare)); text('#stickyDesconto', discount ? discount + '% OFF' : ''); text('#stickyPor', money(k.price)); text('#stickyParcelas', installments);
    const specs = P.specs.map(([label, value]) => [label, label === 'Quantidade' ? k.bags + ' sacos a vácuo' : label === 'Tamanhos' ? 5 * k.sets + ' pequenos + ' + 5 * k.sets + ' médios + ' + 5 * k.sets + ' grandes' : label === 'Bomba' ? k.pumps + (k.pumps === 1 ? ' bomba' : ' bombas') + ' sem fio, recarregável via USB-C' : value]);
    html('#specsBox', specs.map(([label, value]) => '<div class="flex justify-between gap-4 py-2.5"><dt class="text-muted">' + escape(label) + '</dt><dd class="font-semibold text-right">' + escape(value) + '</dd></div>').join(''));
    all('[data-kit]').forEach(button => { const on = button.dataset.kit === k.key; button.setAttribute('aria-pressed', String(on)); button.querySelector('.kit-action').textContent = on ? 'SELECIONADO' : 'ESCOLHER'; });
    updateBuyButtons();
  }
  html('#variacaoBox', '<div class="kit-picker"><h2>Escolha seu kit</h2><div class="kit-options">' + C.offers.items.map(k => '<button class="kit-option" type="button" data-kit="' + escape(k.key) + '" aria-pressed="' + (k.key === selectedKit.key) + '"><span class="kit-badge">' + escape(k.label) + '</span><span class="kit-photo">' + image(k.image) + '</span><strong class="kit-name">' + k.bags + ' sacos</strong><span class="kit-unit">' + k.pumps + (k.pumps === 1 ? ' bomba' : ' bombas') + '</span><del>' + money(k.compare) + '</del><strong class="kit-total">' + money(k.price) + '</strong><span class="kit-action">' + (k.key === selectedKit.key ? 'SELECIONADO' : 'ESCOLHER') + '</span></button>').join('') + '</div></div>');
  all('[data-kit]').forEach(button => button.addEventListener('click', () => { selectedKit = C.offers.items.find(k => k.key === button.dataset.kit); renderPrice(); }));
  renderPrice();

  function initGallery() {
    const main = $('#mainImg'), thumbs = $('#thumbs'), dots = $('#dots');
    if (!main || !thumbs || !dots) return;
    const gallery = P.galeria.filter(localAssetPath); let current = 0;
    if (!gallery.length) return;
    main.parentElement.setAttribute('role', 'region'); main.parentElement.setAttribute('aria-label', 'Imagens do produto');
    main.tabIndex = 0; main.style.touchAction = 'pan-y';
    thumbs.innerHTML = gallery.map((id, i) => '<button type="button" class="gallery-thumb" data-thumb="' + i + '" aria-label="Ver imagem ' + (i + 1) + ': ' + escape(asset(id).alt) + '" aria-pressed="false">' + image(id, 'loading="lazy"') + '</button>').join('');
    dots.innerHTML = gallery.map((_, i) => '<button type="button" aria-label="Imagem ' + (i + 1) + '" class="w-2 h-2 rounded-full bg-line"></button>').join('');
    const render = () => {
      main.innerHTML = image(gallery[current], 'class="w-full h-full object-contain" fetchpriority="high"');
      [...dots.children].forEach((dot, i) => { dot.className = 'w-2 h-2 rounded-full ' + (i === current ? 'bg-brand' : 'bg-line'); dot.setAttribute('aria-current', String(i === current)); });
      [...thumbs.children].forEach((thumb, i) => thumb.setAttribute('aria-pressed', String(i === current)));
    };
    const go = index => { current = (index + gallery.length) % gallery.length; render(); };
    [...thumbs.children].forEach((thumb, i) => thumb.addEventListener('click', () => go(i)));
    [...dots.children].forEach((dot, i) => dot.addEventListener('click', () => go(i)));
    $('[data-gal="prev"]').addEventListener('click', () => go(current - 1));
    $('[data-gal="next"]').addEventListener('click', () => go(current + 1));
    main.addEventListener('keydown', event => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); go(current + (event.key === 'ArrowRight' ? 1 : -1)); } });
    let start;
    main.addEventListener('pointerdown', event => { start = [event.clientX, event.clientY]; });
    main.addEventListener('pointerup', event => { if (!start) return; const dx = event.clientX - start[0], dy = event.clientY - start[1]; start = null; if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) go(current + (dx < 0 ? 1 : -1)); });
    main.addEventListener('pointercancel', () => { start = null; });
    render();
  }
  initGallery();

  function initDrawer() {
    const drawer = $('#drawer'), button = $('#menuBtn'); if (!drawer || !button) return;
    const panel = drawer.querySelector('[role="dialog"]'); let previous;
    const background = all('body > header, body > main, body > footer, #stickyBar');
    const close = () => { drawer.classList.add('hidden'); document.body.classList.remove('drawer-open'); button.setAttribute('aria-expanded', 'false'); background.forEach(el => { el.inert = false; }); previous?.focus(); };
    button.addEventListener('click', () => { previous = button; drawer.classList.remove('hidden'); document.body.classList.add('drawer-open'); button.setAttribute('aria-expanded', 'true'); background.forEach(el => { el.inert = true; }); panel.querySelector('button').focus(); });
    drawer.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', close));
    drawer.addEventListener('keydown', event => {
      if (event.key === 'Escape') { event.preventDefault(); close(); }
      if (event.key !== 'Tab') return;
      const focusable = [...panel.querySelectorAll('a[href],button:not(:disabled),input')].filter(el => !el.hidden && el.getClientRects().length);
      const first = focusable[0], last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });
  }
  initDrawer();

  let busy = false;
  window.iniciarCheckout = window.comprarProduto = async () => {
    const url = checkoutUrl(selectedKit?.key);
    if (busy) return { blocked: true };
    if (!url) {
      updateBuyButtons();
      text('#checkoutStatus', 'As compras estão temporariamente indisponíveis. Fale com a VONNIX pelo e-mail ' + C.brand.email + '.');
      return { blocked: true };
    }
    busy = true; all('.buy, [data-kit]').forEach(button => { button.disabled = true; });
    // O destino é explicitamente autorizado por oferta; nenhum parâmetro de rastreamento é repassado.
    window.location.assign(url.href);
    return { blocked: false };
  };
  all('.buy').forEach(button => button.addEventListener('click', window.iniciarCheckout));
  window.addEventListener('pageshow', () => {
    busy = false;
    all('[data-kit]').forEach(button => { button.disabled = false; });
    updateBuyButtons();
  });
  window.VONNIX_PUBLICATION_BLOCKERS = publicationBlockers;

  function initCountdown() {
    const promotion = C.promotion;
    const loop = promotion.mode === 'loop';
    const duration = Number(promotion.durationSeconds) * 1000;
    const anchor = typeof promotion.cycleAnchor === 'string' ? Date.parse(promotion.cycleAnchor) : NaN;
    const validCycle = loop && Number.isFinite(anchor) && Number.isInteger(duration) && duration > 0;
    const value = promotion.endsAt;
    const deadline = typeof value === 'string' && /(?:Z|[+-]\d{2}:\d{2})$/.test(value) ? Date.parse(value) : NaN;
    const locations = all('#offerCountdown, .black-live-clock');
    text('#countdownPrefix', loop ? 'Contagem regressiva:' : 'Oferta termina em');
    text('.black-live-clock p', loop ? '◷ CONTAGEM REGRESSIVA' : '◷ OFERTA EXPIRA EM:');
    if ($('.black-live-clock')) $('.black-live-clock').setAttribute('aria-label', loop ? 'Contagem regressiva em ciclos de ' + Number(promotion.durationSeconds) / 3600 + ' horas' : 'Tempo restante da oferta');
    function tick() {
      const now = Date.now();
      const remaining = loop ? (validCycle ? duration - (Math.max(0, now - anchor) % duration) : NaN) : deadline - now;
      const active = loop ? validCycle : Number.isFinite(deadline) && remaining > 0;
      locations.forEach(el => { el.hidden = !active; });
      if (!active) return;
      const seconds = Math.ceil(remaining / 1000);
      const values = [Math.floor(seconds / 3600), Math.floor(seconds % 3600 / 60), seconds % 60].map(n => String(n).padStart(2, '0'));
      text('#countdown, #countdown2', values.join(':'));
      all('[data-offer-digit]').forEach((el, i) => { el.textContent = values[i]; });
      setTimeout(tick, 1000);
    }
    tick();
  }
  initCountdown();

  function initReviews() {
    if (!$('#avaliacoes')) return;
    const social = C.socialProof;
    if (!social.authorized) return;
    const testimonials = social.testimonials.filter(item => item.name && item.text);
    const photos = social.photos.filter(localAssetPath);
    const hasSummary = Number(social.rating) > 0 && Number(social.rating) <= 5 && Number.isInteger(social.count) && social.count > 0;
    if (hasSummary) {
      const rating = Number(social.rating).toLocaleString('pt-BR');
      const shortRating = Number(social.rating).toFixed(1), count = social.count.toLocaleString('pt-BR');
      text('#notaTxt, #badgeNota', shortRating); text('#qtdTxt', '(' + count + ')');
      $('.product-rating-row').hidden = false; $('#galleryRating').hidden = false;
      $('#galleryRating').setAttribute('aria-label', 'Nota do produto na origem: ' + rating + ' de 5');
      html('#reviewHeadline', '<span class="rating-stars" aria-hidden="true">★★★★★</span><strong>' + shortRating + '</strong><span class="text-muted">— ' + count + ' avaliações</span>');
      if ($('#reviewHeadline')) $('#reviewHeadline').hidden = false;
      const total = social.distribution.reduce((a, b) => a + Math.max(0, Number(b) || 0), 0);
      html('#reviewsSummary', '<div class="flex items-center gap-4"><div class="review-score"><div class="review-score-value">' + rating + '</div><div class="text-gold text-sm mt-1" aria-label="' + rating + ' de 5 estrelas">★★★★★</div><div class="review-score-count">' + count + ' avaliações</div></div><div class="review-distribution space-y-1">' + social.distribution.map((count, i) => '<div class="flex items-center gap-2 text-xs"><span>' + (5 - i) + '★</span><div class="flex-1 h-2 rounded-full bg-line overflow-hidden"><div class="h-full bg-gold" style="width:' + (total ? Math.max(0, Number(count) || 0) / total * 100 : 0) + '%"></div></div></div>').join('') + '</div></div>');
      $('#reviewsSummary').hidden = false;
    }
    if ($('#vendidosTxt')) {
      text('#vendidosTxt', social.sold || '');
      $('#vendidosTxt').hidden = !social.sold;
    }
    if (testimonials.length) {
      html('#depoimentosBox', testimonials.map(item => '<article class="bg-white border border-line rounded-xl p-4"><div class="review-person">' + (item.photo ? image(item.photo, 'class="w-10 h-10 rounded-full object-cover" loading="lazy"') : '') + '<div><p class="review-person-name font-bold text-sm">' + escape(item.name) + (item.verified === true ? '<span class="review-verification">' + icon('check') + escape(social.verificationLabel || 'Verificado') + '</span>' : '') + '</p><p class="text-xs text-muted">' + escape(item.location) + '</p></div></div><p class="text-sm text-muted mt-1">' + escape(item.text) + '</p></article>').join(''));
      $('#depoimentosBox').hidden = false;
    }
    if (photos.length) {
      const track = $('#avaliacoesTrack'); track.innerHTML = photos.map(id => image(id, 'loading="lazy"')).join(''); track.hidden = false;
      track.tabIndex = 0; track.setAttribute('role', 'region'); track.setAttribute('aria-label', 'Fotos das avaliações do produto');
      if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
        let interacting = false, resumeAt = 0, visible = false, last = 0, offset = 0;
        new IntersectionObserver(entries => { visible = entries[0].isIntersecting; }).observe(track);
        const pause = () => { resumeAt = performance.now() + 4000; };
        track.addEventListener('pointerdown', () => { interacting = true; });
        window.addEventListener('pointerup', () => { interacting = false; offset = track.scrollLeft; pause(); });
        track.addEventListener('pointercancel', () => { interacting = false; pause(); });
        track.addEventListener('wheel', pause, { passive: true }); track.addEventListener('focusin', pause);
        function animate(now) {
          const delta = last ? Math.min(now - last, 50) : 0; last = now;
          if (visible && !document.hidden && !interacting && now > resumeAt && track.scrollWidth > track.clientWidth) {
            offset += delta * 0.028; if (offset > track.scrollWidth - track.clientWidth) offset = 0; track.scrollLeft = offset;
          }
          requestAnimationFrame(animate);
        }
        requestAnimationFrame(animate);
      }
    }
    $('#reviewsEmpty').hidden = hasSummary || !!testimonials.length || !!photos.length;
  }
  initReviews();

  const bar = $('#stickyBar');
  if (bar) { const update = () => bar.classList.toggle('translate-y-full', window.scrollY <= 600); window.addEventListener('scroll', update, { passive: true }); update(); }

  let canonical = validHttps(C.publication.canonicalUrl);
  const filename = window.location.pathname.split('/').pop();
  if (canonical && filename && filename !== 'index.html' && filename.endsWith('.html')) canonical = new URL(filename, canonical);
  if (canonical) {
    const link = document.createElement('link'); link.rel = 'canonical'; link.href = canonical.href; document.head.append(link);
    const og = document.createElement('meta'); og.setAttribute('property', 'og:url'); og.content = canonical.href; document.head.append(og);
    all('meta[property="og:image"],meta[name="twitter:image"]').forEach(meta => { meta.content = new URL(localAssetPath(C.brand.logoLight), canonical).href; });
  }
  if (C.publication.indexable === true && publicationBlockers().length === 0 && C.offers.items.every(k => checkoutUrl(k.key))) $('meta[name="robots"]').content = 'index, follow';
  const schema = document.createElement('script'); schema.type = 'application/ld+json';
  schema.textContent = JSON.stringify({ '@context': 'https://schema.org', '@type': 'Organization', name: C.brand.name, url: C.brand.domain, email: C.brand.email, slogan: C.brand.slogan }); document.head.append(schema);

  const policyKey = document.body.dataset.policy;
  if (policyKey && C.policies[policyKey]) {
    const policy = C.policies[policyKey], official = validOfficialUrl(policy.officialUrl);
    if (policy.paragraphs.length) html('#policyContent', policy.paragraphs.map(paragraph => '<p>' + escape(paragraph) + '</p>').join('') + (official ? '<p><a href="' + escape(official.href) + '" rel="noopener">Consultar o texto integral na loja VONNIX</a></p>' : ''));
    else if (official) html('#policyContent', '<p>Consulte o conteúdo oficial da VONNIX.</p><p><a href="' + escape(official.href) + '" rel="noopener">Ler a política na loja VONNIX</a></p>');
  }
  const trackingLink = $('#trackingOfficialLink'), tracking = validOfficialUrl(C.tracking.url);
  if (trackingLink && tracking) { trackingLink.href = tracking.href; trackingLink.hidden = false; }
})();
