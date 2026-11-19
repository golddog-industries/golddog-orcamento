/*
  Black GoldDog 2026 · loja golddogshop.com.br (Nuvemshop)
  Teo (Tecnologia), 19/11/2026. Ideias 1 e 2 do plano Robotcop (site/ideias-robotcop/).
  1) Contagem regressiva até 26/11 00h (Brasília) nas páginas de produto da campanha.
     Mesmo cálculo da página /black/: o fim é uma data fixa, então NÃO zera ao recarregar.
  2) Etiquetas animadas "BLACK" e "-X%" nas fotos. Ficam DESLIGADAS até 26/11:
     só aparecem com ETIQUETAS_LIGADAS = true E dentro do dia 26/11 (Brasília).
     O "-X%" sai do preço promocional real da loja (preço antigo x preço atual), nunca de número escrito aqui.
  Arte e animação das etiquetas: Carol (Design). Quem confere o texto no site: Márcio.
  Desligar tudo: CONFIG.LIGADO = false.
*/
(function () {
  'use strict';
  var CONFIG = {
    LIGADO: true,
    // Produtos da campanha: id da Nuvemshop (número) ou handle da URL (/produtos/<handle>/). Vazio = nenhum.
    PRODUTOS: [],
    INICIO_CONTAGEM: '2026-11-19T00:00:00-03:00',
    FIM: '2026-11-26T00:00:00-03:00',
    // Etiquetas: só no dia da Black, e só depois de ligar aqui junto com os descontos.
    ETIQUETAS_LIGADAS: false,
    DIA_BLACK_INICIO: '2026-11-26T00:00:00-03:00',
    DIA_BLACK_FIM: '2026-11-27T00:00:00-03:00',
    TEXTO_CONTAGEM: 'Black GoldDog: só dia 26/11',
    TEXTO_DIA: 'É HOJE: Black GoldDog, só hoje',
    AMARELO: '#F3B914'
  };
  if (!CONFIG.LIGADO) return;
  var agora = function () { return Date.now(); };
  var t = function (s) { return new Date(s).getTime(); };
  var qs = new URLSearchParams(location.search);
  // Teste sem afetar a loja: ?bf_teste=1 mostra tudo; ?bf_teste=etiquetas simula o dia 26/11.
  var teste = qs.get('bf_teste');

  function produtoAtual() {
    try { if (window.LS && LS.product && LS.product.id) return { id: String(LS.product.id), handle: location.pathname.split('/').filter(Boolean).pop() }; } catch (e) {}
    var m = location.pathname.match(/\/produtos\/([^\/]+)/);
    return m ? { id: '', handle: m[1] } : null;
  }
  function daCampanha(id, handle) {
    if (teste) return true;
    return CONFIG.PRODUTOS.some(function (p) { p = String(p); return p === String(id) || p === String(handle); });
  }

  var css = '' +
    '.gdbf-cd{display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:14px 0;padding:12px 14px;border-radius:10px;background:#0b0b0b;color:#fff;font-family:inherit;animation:gdbf-in .5s ease-out both}' +
    '.gdbf-cd b{color:' + CONFIG.AMARELO + ';font-weight:800;letter-spacing:.02em}' +
    '.gdbf-cd .gdbf-n{display:flex;gap:6px}' +
    '.gdbf-cd .gdbf-n span{min-width:46px;text-align:center;padding:6px 4px;border-radius:8px;background:#1c1c1c;font-weight:800;font-size:18px;line-height:1.1;font-variant-numeric:tabular-nums}' +
    '.gdbf-cd .gdbf-n small{display:block;font-size:10px;font-weight:600;color:#a8a8a8;text-transform:uppercase}' +
    '.gdbf-wrap{position:relative}' +
    '.gdbf-tag{position:absolute;z-index:5;left:10px;top:10px;display:flex;flex-direction:column;gap:6px;pointer-events:none}' +
    '.gdbf-tag i{font-style:normal;display:inline-block;padding:5px 10px;border-radius:6px;font-weight:900;font-size:14px;letter-spacing:.06em;text-transform:uppercase;box-shadow:0 2px 8px rgba(0,0,0,.35);animation:gdbf-pop .45s cubic-bezier(.2,1.6,.4,1) both, gdbf-pulse 2.4s ease-in-out .6s infinite}' +
    '.gdbf-tag .gdbf-black{background:#0b0b0b;color:' + CONFIG.AMARELO + ';border:1px solid ' + CONFIG.AMARELO + '}' +
    '.gdbf-tag .gdbf-off{background:' + CONFIG.AMARELO + ';color:#0b0b0b;animation-delay:.12s,.8s}' +
    '@keyframes gdbf-in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}' +
    '@keyframes gdbf-pop{0%{transform:scale(0) rotate(-3deg)}80%{transform:scale(1.15) rotate(-3deg)}100%{transform:scale(1) rotate(-3deg)}}' +
    '@keyframes gdbf-pulse{0%,100%{transform:scale(1) rotate(-3deg)}50%{transform:scale(1.06) rotate(-3deg)}}' +
    '@media (prefers-reduced-motion:reduce){.gdbf-cd,.gdbf-tag i{animation:none!important}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var p2 = function (n) { return String(n).padStart(2, '0'); };

  function contagem(prod) {
    var ini = t(CONFIG.INICIO_CONTAGEM), fim = t(CONFIG.FIM), dia1 = t(CONFIG.DIA_BLACK_INICIO), dia2 = t(CONFIG.DIA_BLACK_FIM);
    var n = agora();
    if (!teste && (n < ini || n >= dia2)) return;
    if (!daCampanha(prod.id, prod.handle)) return;
    var alvo = document.querySelector('.js-product-form, #product_form, form[action*="/comprar"], .js-addtocart') ;
    var nome = document.querySelector('.js-product-name, h1');
    var box = document.createElement('div'); box.className = 'gdbf-cd'; box.setAttribute('role', 'timer');
    if (n >= dia1 && n < dia2) { box.innerHTML = '<b>' + CONFIG.TEXTO_DIA + '</b>'; }
    else {
      box.innerHTML = '<b>' + CONFIG.TEXTO_CONTAGEM + '</b><div class="gdbf-n" aria-label="Tempo que falta">' +
        '<span><em data-u="d">0</em><small>dias</small></span><span><em data-u="h">00</em><small>horas</small></span>' +
        '<span><em data-u="m">00</em><small>min</small></span><span><em data-u="s">00</em><small>seg</small></span></div>';
      var e = {}; ['d', 'h', 'm', 's'].forEach(function (k) { e[k] = box.querySelector('[data-u="' + k + '"]'); });
      var tick = function () {
        var s = Math.max(0, fim - agora()) / 1000;
        e.d.textContent = Math.floor(s / 86400); s %= 86400;
        e.h.textContent = p2(Math.floor(s / 3600)); s %= 3600;
        e.m.textContent = p2(Math.floor(s / 60));
        e.s.textContent = p2(Math.floor(s % 60));
      };
      tick(); setInterval(tick, 1000);
    }
    if (alvo && alvo.parentNode) alvo.parentNode.insertBefore(box, alvo);
    else if (nome && nome.parentNode) nome.parentNode.insertBefore(box, nome.nextSibling);
  }

  function etiquetasLigadas() {
    if (teste === 'etiquetas' || teste === '1') return true;
    var n = agora();
    return CONFIG.ETIQUETAS_LIGADAS && n >= t(CONFIG.DIA_BLACK_INICIO) && n < t(CONFIG.DIA_BLACK_FIM);
  }
  function numero(txt) {
    if (!txt) return 0;
    var m = String(txt).replace(/\s/g, '').match(/[\d.]+,\d{2}|[\d.]+/);
    if (!m) return 0;
    return parseFloat(m[0].replace(/\./g, '').replace(',', '.')) || 0;
  }
  function desconto(raiz) {
    var antigo = raiz.querySelector('.js-compare-price-display, .price-compare, [data-compare-price]');
    var atual = raiz.querySelector('.js-price-display, .price, [data-product-price]');
    var a = antigo ? numero(antigo.getAttribute('data-compare-price') || antigo.textContent) : 0;
    var b = atual ? numero(atual.getAttribute('data-product-price') || atual.textContent) : 0;
    if (!a || !b || b >= a) return 0;
    var pct = Math.floor((1 - b / a) * 100);
    return pct >= 1 ? pct : 0;
  }
  function etiqueta(foto, pct) {
    if (!foto || foto.querySelector('.gdbf-tag')) return;
    foto.classList.add('gdbf-wrap');
    var d = document.createElement('div'); d.className = 'gdbf-tag'; d.setAttribute('aria-hidden', 'true');
    d.innerHTML = '<i class="gdbf-black">Black</i>' + (pct ? '<i class="gdbf-off">-' + pct + '%</i>' : '');
    foto.appendChild(d);
  }
  function etiquetas(prod) {
    if (!etiquetasLigadas()) return;
    // Página do produto: na foto principal.
    if (prod && daCampanha(prod.id, prod.handle)) {
      var info = document.querySelector('.js-product-container, #single-product, main') || document;
      etiqueta(document.querySelector('.js-swiper-product, .js-product-image-container, .product-image-container, .js-product-slide'), desconto(info));
    }
    // Vitrines e categorias: em cada produto da campanha.
    document.querySelectorAll('.js-item-product, [data-product-id]').forEach(function (it) {
      var id = it.getAttribute('data-product-id') || '';
      var a = it.querySelector('a[href*="/produtos/"]');
      var h = a ? (a.getAttribute('href').match(/\/produtos\/([^\/?#]+)/) || [])[1] : '';
      if (!daCampanha(id, h)) return;
      etiqueta(it.querySelector('.js-item-image-container, .item-image, .js-item-image') || it, desconto(it));
    });
  }

  function iniciar() {
    var prod = produtoAtual();
    if (prod) contagem(prod);
    etiquetas(prod);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar); else iniciar();
})();
