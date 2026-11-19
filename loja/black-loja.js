/*
  Black GoldDog 2026 · loja golddogshop.com.br (Nuvemshop)
  Teo (Tecnologia) 19/11/2026 · ideias 1 e 2 do plano Robotcop. Visual: Carol (Design), kit gdbk
  (equipe-marketing/black-friday-2026/site-contagem-etiquetas/). Regras: Márcio (site).
  1) Contagem em TODAS as páginas /produtos/ (lista de exclusão vazia; produto novo já entra).
     Até 26/11 00h (Brasília) "SÓ DIA 26/11"; no dia 26 vira "É HOJE · ACABA EM" até 23h59; depois some.
     Fim fixo: NÃO zera ao recarregar. Até 26/11: "Será a Black das Blacks na GoldDog", "Descontos inacreditáveis",
     "Itens com até 50%" e o preço atual riscado com "?" (só visual). No dia 26: preço comparativo riscado + promoção real.
  2) Etiquetas BLACK e -X% nas fotos: só com ETIQUETAS_LIGADAS = true E dentro do dia 26/11.
     O -X% sai do preço promocional real da loja; produto sem promoção (ex.: preço sob consulta) fica sem etiqueta.
  Teste sem afetar a loja: ?bf_teste=1 (contagem + etiquetas), ?bf_teste=hoje (simula o dia 26).
  Nada vai ao público sem o OK do Sr. Anderson. Desligar tudo: CONFIG.LIGADO = false.
*/
(function () {
  'use strict';
  var CONFIG = {
    LIGADO: true,
    EXCLUIR: [],                 // ids da Nuvemshop ou handles (/produtos/<handle>/) que NÃO mostram a contagem
    INICIO: '2026-11-19T00:00:00-03:00',
    ABRE: '2026-11-26T00:00:00-03:00',
    FECHA: '2026-11-26T23:59:59-03:00',
    ETIQUETAS_LIGADAS: false,    // ligar em 26/11 junto com os descontos (OK do Sr. Anderson)
    LINK_LISTA: '',              // página /black/ ("Entre na lista"); preencher quando a página estiver no ar
    // Textos do Sr. Anderson (19/11 22:40Z). "Até 50%" é a única menção a tamanho de desconto (nunca o de um produto).
    FRASE: 'Será a <b>Black das Blacks</b> na GoldDog',
    FRASE_CURTA: 'A <b>Black das Blacks</b> na GoldDog',
    FRASE_HOJE: 'Hoje é a <b>Black das Blacks</b> na GoldDog',
    LINHAS: ['Descontos inacreditáveis', 'Itens com até 50%'],
    PRECO_SURPRESA: true          // até 26/11: preço normal riscado + "?" (só visual; carrinho e checkout seguem o preço real da loja)
  };
  if (!CONFIG.LIGADO) return;
  var T = function (s) { return new Date(s).getTime(); };
  var teste = new URLSearchParams(location.search).get('bf_teste');
  var agora = function () { return teste === 'hoje' ? T(CONFIG.ABRE) + 10 * 3600 * 1000 + (Date.now() % 60000) : Date.now(); };
  var ABRE = T(CONFIG.ABRE), FECHA = T(CONFIG.FECHA), INICIO = T(CONFIG.INICIO);
  var CSS = ".gdbk-cd,.gdbk-tag{--gd:#F3B914;--gd2:#FFE08A;--bk:#0b0b0b;font-family:\"Inter Display\",\"Inter\",system-ui,-apple-system,\"Segoe UI\",Arial,sans-serif;box-sizing:border-box}.gdbk-cd *,.gdbk-tag *{box-sizing:border-box}.gdbk-cd{position:relative;overflow:hidden;background:var(--bk);border:3px solid var(--gd);border-radius:14px;padding:14px 16px 16px;margin:14px 0;color:#fff;box-shadow:0 0 0 0 rgba(243,185,20,.0),0 6px 22px rgba(0,0,0,.25);animation:gdbk-glow 3.6s ease-in-out infinite}.gdbk-cd::after{content:\"\";position:absolute;top:-40%;bottom:-40%;width:38px;left:-60px;transform:rotate(18deg);background:linear-gradient(90deg,rgba(255,255,255,0),rgba(255,240,190,.55),rgba(255,255,255,0));animation:gdbk-shine 3.6s ease-in-out infinite;pointer-events:none}.gdbk-cd canvas{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}.gdbk-hd{position:relative;display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:12px}.gdbk-pill{background:var(--gd);color:var(--bk);font-weight:900;letter-spacing:.06em;font-size:15px;line-height:1;padding:7px 10px 6px;border-radius:6px;animation:gdbk-blink 3.6s steps(1) infinite}.gdbk-tt{font-weight:900;font-size:17px;letter-spacing:.02em;text-transform:uppercase;line-height:1.1}.gdbk-tt b{color:var(--gd)}.gdbk-so{margin-left:auto;background:var(--gd);color:var(--bk);font-weight:900;font-size:13px;letter-spacing:.04em;padding:6px 9px;border-radius:5px;text-transform:uppercase;white-space:nowrap}.gdbk-dig{position:relative;display:grid;grid-template-columns:repeat(4,1fr);gap:8px}.gdbk-dig div{background:#161616;border:1px solid rgba(243,185,20,.45);border-radius:9px;text-align:center;padding:8px 2px 6px}.gdbk-dig b{display:block;font-weight:900;font-size:30px;line-height:1;color:var(--gd);font-variant-numeric:tabular-nums;letter-spacing:.01em}.gdbk-dig small{display:block;margin-top:4px;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#d9d9d9}.gdbk-dig b.tick{animation:gdbk-tick .45s ease-out}.gdbk-ft{position:relative;margin-top:10px;font-size:13px;font-weight:600;color:#e8e8e8}.gdbk-ft b{color:var(--gd)}.gdbk-cd.hoje{border-color:var(--gd2)}.gdbk-cd.hoje .gdbk-so{background:#fff;animation:gdbk-pulse 1.2s ease-in-out infinite}@media (max-width:420px){.gdbk-tt{font-size:15px}.gdbk-dig b{font-size:26px}.gdbk-so{margin-left:0}}.gdbk-tags{position:absolute;top:10px;left:10px;z-index:5;display:flex;flex-direction:column;align-items:flex-start;gap:6px;pointer-events:none}.gdbk-tag{position:relative;overflow:hidden;display:inline-flex;align-items:center;font-weight:900;line-height:1;border-radius:7px;text-transform:uppercase}.gdbk-tag.black{background:var(--bk);color:var(--gd);border:2px solid var(--gd);font-size:14px;letter-spacing:.08em;padding:7px 10px 6px;animation:gdbk-glow 3.6s ease-in-out infinite}.gdbk-tag.black::before{content:\"\";width:7px;height:7px;border-radius:50%;background:var(--gd);margin-right:7px;box-shadow:0 0 8px var(--gd);animation:gdbk-pulse 1.2s ease-in-out infinite}.gdbk-tag.off{background:var(--gd);color:var(--bk);font-size:18px;letter-spacing:.01em;padding:7px 10px 6px;animation:gdbk-pop 3.6s ease-in-out infinite}.gdbk-tag::after{content:\"\";position:absolute;top:-30%;bottom:-30%;width:18px;left:-30px;transform:rotate(18deg);background:linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,.7),rgba(255,255,255,0));animation:gdbk-shine 3.6s ease-in-out infinite}.gdbk-tag.off::after{animation-delay:.25s}@media (max-width:767px){.gdbk-tags{top:6px;left:6px;gap:4px}.gdbk-tag.black{font-size:11px;padding:5px 7px 4px}.gdbk-tag.off{font-size:14px;padding:5px 7px 4px}}@keyframes gdbk-shine{0%,55%{left:-60px}85%,100%{left:110%}}@keyframes gdbk-glow{0%,100%{box-shadow:0 0 0 rgba(243,185,20,0),0 6px 22px rgba(0,0,0,.25)}50%{box-shadow:0 0 18px rgba(243,185,20,.55),0 6px 22px rgba(0,0,0,.25)}}@keyframes gdbk-blink{0%,100%{opacity:1}40%{opacity:.35}44%{opacity:1}}@keyframes gdbk-pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.12)}}@keyframes gdbk-pop{0%,70%,100%{transform:scale(1)}78%{transform:scale(1.12) rotate(-3deg)}86%{transform:scale(.98)}}@keyframes gdbk-tick{0%{transform:translateY(-6px);opacity:.3}100%{transform:none;opacity:1}}@media (prefers-reduced-motion:reduce){.gdbk-cd,.gdbk-cd *,.gdbk-tag,.gdbk-tag *,.gdbk-cd::after,.gdbk-tag::after,.gdbk-tag::before{animation:none!important}.gdbk-cd canvas{display:none}}" + '.gdbk-ft a{color:#F3B914;font-weight:800;text-decoration:underline;margin-left:6px}'
    + '.gdbk-tz{position:relative;margin:0 0 12px;text-align:left}.gdbk-tz h3{margin:0;font-weight:900;font-size:21px;line-height:1.15;color:#fff;letter-spacing:.01em}.gdbk-tz h3 b{color:#F3B914}.gdbk-tz p{margin:4px 0 0;font-weight:800;font-size:15px;color:#FFE08A;text-transform:uppercase;letter-spacing:.04em}'
    + '.gdbk-pr{display:flex;align-items:center;gap:12px;margin-top:10px;flex-wrap:wrap}.gdbk-pr s{color:#bdbdbd;font-size:18px;font-weight:700;text-decoration-thickness:2px;text-decoration-color:#F3B914}.gdbk-pr em{font-style:normal;font-weight:900;font-size:40px;line-height:1;color:#0b0b0b;background:#F3B914;border-radius:10px;padding:4px 16px;animation:gdbk-pop 3.6s ease-in-out infinite}.gdbk-pr em.v{font-size:26px;padding:6px 12px}'
    + '.gdbk-tz .c{display:none}@media (max-width:420px){.gdbk-tz h3{font-size:18px}.gdbk-tz .l{display:none}.gdbk-tz .c{display:inline}.gdbk-pr em{font-size:34px}}';
  var st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
  var pad = function (n) { return (n < 10 ? '0' : '') + n; };

  function produtoAtual() {
    var m = location.pathname.match(/\/produtos\/([^\/?#]+)/);
    if (!m) return null;
    var id = ''; try { if (window.LS && LS.product && LS.product.id) id = String(LS.product.id); } catch (e) {}
    return { id: id, handle: m[1] };
  }
  function excluido(p) { return CONFIG.EXCLUIR.some(function (x) { x = String(x); return x === p.id || x === p.handle; }); }

  function contagem(prod) {
    var n = agora();
    if (!teste && (n < INICIO || n > FECHA)) return;
    if (excluido(prod)) return;
    var el = document.createElement('div');
    el.className = 'gdbk-cd'; el.setAttribute('role', 'timer'); el.setAttribute('aria-label', 'Contagem para a Black GoldDog de 26/11');
    el.innerHTML = '<canvas aria-hidden="true"></canvas>' +
      '<div class="gdbk-hd"><span class="gdbk-pill">BLACK</span><span class="gdbk-tt">Lista <b>GoldDog</b></span><span class="gdbk-so" data-so>SÓ DIA 26/11</span></div>' +
      '<div class="gdbk-tz" data-tz></div>' +
      '<div class="gdbk-dig"><div><b data-d>00</b><small>dias</small></div><div><b data-h>00</b><small>horas</small></div>' +
      '<div><b data-m>00</b><small>min</small></div><div><b data-s>00</b><small>seg</small></div></div>' +
      '<div class="gdbk-ft" data-ft></div>';
    var alvo = document.querySelector('.js-product-form, #product_form, form[action*="/comprar"], .js-addtocart');
    var nome = document.querySelector('.js-product-name, h1');
    if (alvo && alvo.parentNode) alvo.parentNode.insertBefore(el, alvo);
    else if (nome && nome.parentNode) nome.parentNode.insertBefore(el, nome.nextSibling);
    else return;
    var last = {}, timer;
    var lista = CONFIG.LINK_LISTA ? '<a href="' + CONFIG.LINK_LISTA + (CONFIG.LINK_LISTA.indexOf('?') < 0 ? '?' : '&') + 'utm_source=loja&utm_medium=faixa_black&utm_campaign=black2026&utm_content=' + encodeURIComponent(prod.handle) + '">Entre na lista</a>' : '';
    var pr = precos();
    function teaser(hoje) {
      var h = (hoje ? '<h3>' + CONFIG.FRASE_HOJE + '</h3>' : '<h3><span class="l">' + CONFIG.FRASE + '</span><span class="c">' + CONFIG.FRASE_CURTA + '</span></h3>') +
        CONFIG.LINHAS.map(function (x) { return '<p>' + x + '</p>'; }).join('');
      if (CONFIG.PRECO_SURPRESA && pr.normal) {
        if (!hoje) h += '<div class="gdbk-pr" aria-label="Preço da Black revelado em 26/11"><s>' + pr.normalTxt + '</s><em>?</em></div>';
        else if (pr.promo && pr.promo < pr.normal) h += '<div class="gdbk-pr"><s>' + pr.normalTxt + '</s><em class="v">' + pr.promoTxt + '</em></div>';
      }
      return h;
    }
    function upd() {
      var now = agora(), hoje = now >= ABRE, t = Math.max(0, (hoje ? FECHA : ABRE) - now);
      var tzh = teaser(hoje), tz = el.querySelector('[data-tz]'); if (tz.getAttribute('data-k') !== String(hoje)) { tz.innerHTML = tzh; tz.setAttribute('data-k', String(hoje)); }
      if (now > FECHA) { el.remove(); clearInterval(timer); return; }
      el.classList.toggle('hoje', hoje);
      el.querySelector('[data-so]').textContent = hoje ? 'É HOJE · ACABA EM' : 'SÓ DIA 26/11';
      var ft = hoje ? 'Desconto em <b>todos os setores</b>, só até 23h59 de hoje.' : 'Desconto em <b>todos os setores</b>, só no dia 26/11.' + lista;
      var f = el.querySelector('[data-ft]'); if (f.innerHTML !== ft) f.innerHTML = ft;
      var v = { d: Math.floor(t / 864e5), h: Math.floor(t / 36e5) % 24, m: Math.floor(t / 6e4) % 60, s: Math.floor(t / 1e3) % 60 };
      for (var k in v) { var b = el.querySelector('[data-' + k + ']'), s = pad(v[k]); if (last[k] !== s) { b.textContent = s; b.classList.remove('tick'); void b.offsetWidth; b.classList.add('tick'); last[k] = s; } }
    }
    upd(); timer = setInterval(upd, 1000);
    // faíscas douradas leves (Carol); pausam fora da tela e com movimento reduzido
    var cv = el.querySelector('canvas');
    if (!cv || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var c = cv.getContext('2d'), P = [], W, H, dpr = Math.min(2, devicePixelRatio || 1), on = true;
    function np(any) { return { x: Math.random() * W, y: any ? Math.random() * H : -4, v: (.15 + Math.random() * .35) * dpr, r: (.5 + Math.random() * 1.3) * dpr, a: Math.random() * 6.28, s: .02 + Math.random() * .05 }; }
    function rs() { W = cv.width = el.clientWidth * dpr; H = cv.height = el.clientHeight * dpr; P = []; for (var i = 0; i < Math.round(W * H / (dpr * dpr) / 2600); i++) P.push(np(true)); }
    function fr() { if (!el.isConnected) return; if (on) { c.clearRect(0, 0, W, H); P.forEach(function (p, i) { p.y += p.v; p.a += p.s; if (p.y > H + 4) P[i] = np(); c.fillStyle = 'rgba(243,200,90,' + (.35 + .45 * Math.abs(Math.sin(p.a))) + ')'; c.beginPath(); c.arc(p.x, p.y, p.r, 0, 6.28); c.fill(); }); } requestAnimationFrame(fr); }
    rs(); addEventListener('resize', rs);
    if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { on = e[0].isIntersecting; }).observe(el);
    fr();
  }

  function etiquetasLigadas() {
    if (teste) return true;
    var n = agora();
    return CONFIG.ETIQUETAS_LIGADAS && n >= ABRE && n <= FECHA;
  }
  function numero(txt) {
    var m = String(txt || '').replace(/\s/g, '').match(/[\d.]+,\d{2}|[\d.]+/);
    return m ? (parseFloat(m[0].replace(/\./g, '').replace(',', '.')) || 0) : 0;
  }
  // Preço do produto principal: antes do dia 26 o preço atual da loja é o "normal".
  // No dia 26, se houver promoção real (preço comparativo maior), mostra o comparativo riscado e o preço promocional.
  function precos() {
    var raiz = document.querySelector('#single-product') || document;
    var a0 = raiz.querySelector('.js-compare-price-display'), b0 = raiz.querySelector('.js-price-display');
    var a = a0 ? numero(a0.textContent) : 0, b = b0 ? numero(b0.textContent) : 0;
    var fmt = function (v) { return 'R$ ' + v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); };
    if (a && b && a > b) return { normal: a, normalTxt: fmt(a), promo: b, promoTxt: fmt(b) };
    return { normal: b, normalTxt: b ? fmt(b) : '', promo: 0, promoTxt: '' };
  }
  function desconto(raiz) {
    var a0 = raiz.querySelector('.js-compare-price-display, .price-compare, [data-compare-price]');
    var b0 = raiz.querySelector('.js-price-display, [data-product-price]');
    if (!a0 || !b0 || a0.offsetParent === null && a0.style.display === 'none') return 0;
    var a = numero(a0.getAttribute('data-compare-price') || a0.textContent), b = numero(b0.getAttribute('data-product-price') || b0.textContent);
    if (!a || !b || b >= a) return 0;
    var pct = Math.floor((1 - b / a) * 100);
    return pct >= 1 ? pct : 0;
  }
  function etiqueta(foto, pct) {
    if (!foto || !pct || foto.querySelector('.gdbk-tags')) return;   // sem promoção real = sem etiqueta
    if (getComputedStyle(foto).position === 'static') foto.style.position = 'relative';
    var d = document.createElement('div'); d.className = 'gdbk-tags'; d.setAttribute('aria-hidden', 'true');
    d.innerHTML = '<span class="gdbk-tag black">Black</span><span class="gdbk-tag off">-' + pct + '%</span>';
    foto.appendChild(d);
  }
  function etiquetas(prod) {
    if (!etiquetasLigadas()) return;
    if (prod && !excluido(prod)) {
      var info = document.querySelector('.js-product-container, #single-product, main') || document;
      etiqueta(document.querySelector('.js-swiper-product, .js-product-image-container, .product-image-container, .js-product-slide'), desconto(info));
    }
    document.querySelectorAll('.js-item-product, [data-product-id]').forEach(function (it) {
      var id = it.getAttribute('data-product-id') || '';
      var a = it.querySelector('a[href*="/produtos/"]');
      var h = a ? ((a.getAttribute('href').match(/\/produtos\/([^\/?#]+)/) || [])[1] || '') : '';
      if (excluido({ id: id, handle: h })) return;
      etiqueta(it.querySelector('.js-item-image-container, .item-image, .js-item-image') || it, desconto(it));
    });
  }

  function iniciar() { var p = produtoAtual(); if (p) contagem(p); etiquetas(p); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar); else iniciar();
})();
