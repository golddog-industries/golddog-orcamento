/*
  Medição por origem · loja golddogshop.com.br (plano Robotcop, ideia 7; painel da Lara)
  Teo (Tecnologia) 19/11/2026. DESLIGADO até o Márcio (site), o Tony (texto do WhatsApp) e a Lara aprovarem.
  1) Links da loja para as nossas páginas (lista /black/, formulário de orçamento, propostas) ganham UTM:
     utm_source=loja · utm_medium=<ponto do site> · utm_campaign=<campanha> · utm_content=<produto>.
  2) Botões de WhatsApp (wa.me / api.whatsapp.com): UTM não funciona no WhatsApp, então o texto que já vem
     escrito ganha um código curto no começo ("SITE GDT100-MAX: ..."), que a Gabi reconhece pela tabela
     Códigos ativos (linha SITE, comeca_com) e grava a origem no Leads.
  Padrão completo: loja/MEDICAO_UTM.md. Teste: ?med_teste=1 (marca os links só para quem abrir assim).
*/
(function () {
  'use strict';
  var CONFIG = { LIGADO: false, CAMPANHA: 'sempre', CAMPANHA_BLACK: 'black2026', FIM_BLACK: '2026-11-27T00:00:00-03:00', CODIGO_WA: 'SITE' };
  var teste = new URLSearchParams(location.search).get('med_teste');
  if (!CONFIG.LIGADO && !teste) return;
  var handle = (location.pathname.match(/\/produtos\/([^\/?#]+)/) || [])[1] || '';
  var campanha = Date.now() < new Date(CONFIG.FIM_BLACK).getTime() ? CONFIG.CAMPANHA_BLACK : CONFIG.CAMPANHA;
  function ponto(a) {
    if (a.closest('.gdbk-cd')) return 'faixa_black';
    if (a.closest('.js-product-form, #product_form')) return 'produto_botao';
    if (/kit/i.test(a.textContent + ' ' + (a.closest('[class*="kit"]') ? 'kit' : ''))) return 'kit';
    if (a.closest('header, .js-head-main, nav')) return 'menu';
    if (a.closest('footer')) return 'rodape';
    return handle ? 'produto' : 'pagina';
  }
  function marca(a) {
    if (a.dataset.gdmed) return; a.dataset.gdmed = '1';
    var h = a.getAttribute('href') || '';
    try {
      var u = new URL(h, location.href);
      if (/golddog-industries\.github\.io$/.test(u.hostname)) {
        if (u.searchParams.has('utm_source')) return;
        u.searchParams.set('utm_source', 'loja'); u.searchParams.set('utm_medium', ponto(a));
        u.searchParams.set('utm_campaign', campanha); if (handle) u.searchParams.set('utm_content', handle);
        a.setAttribute('href', u.toString());
      } else if (/(^|\.)wa\.me$|api\.whatsapp\.com$/.test(u.hostname)) {
        var t = u.searchParams.get('text') || '';
        if (t.indexOf(CONFIG.CODIGO_WA) === 0) return;
        var cod = CONFIG.CODIGO_WA + (handle ? ' ' + handle.toUpperCase().slice(0, 30) : '') + ':';
        u.searchParams.set('text', (cod + ' ' + t).trim());
        a.setAttribute('href', u.toString());
      }
    } catch (e) {}
  }
  function tudo() { document.querySelectorAll('a[href]').forEach(marca); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', tudo); else tudo();
  setTimeout(tudo, 2500); // pega também o que o tema e os outros scripts colocam depois
})();
