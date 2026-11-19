/*
  Prova social sem nomes · loja golddogshop.com.br (plano Robotcop, ideia 4)
  Teo (Tecnologia) 19/11/2026. DESLIGADO até o Lucas (LGPD) e o Sr. Anderson aprovarem.
  Mostra só um número agregado e real, vindo do n8n (fluxo "Site · prova social da semana", pXIQgYHXvBkCZx7C):
  contatos únicos dos últimos 7 dias, sem testes; um agendamento a cada 6 h grava SÓ o número e o site lê só ele (LGPD, Lucas 19/11). Nunca nome, cidade nem telefone.
  Abaixo de 5 não aparece nada. Guarda o número no navegador por 6 h, para não gastar execução a cada visita.
  Teste sem afetar a loja: ?ps_teste=1 (mostra mesmo desligado) ou ?ps_teste=23 (simula o número).
*/
(function () {
  'use strict';
  var CONFIG = {
    LIGADO: false,
    URL: 'https://salaexecutiva.app.n8n.cloud/webhook/prova-social-semana', // trocar pelo servidor novo depois da migração
    TEXTO: function (n) { return n + ' pessoas chamaram a GoldDog nos últimos 7 dias'; },
    CACHE_H: 6
  };
  var q = new URLSearchParams(location.search).get('ps_teste');
  if (!CONFIG.LIGADO && !q) return;
  if (!/\/produtos\//.test(location.pathname) && !q) return;

  var css = '.gdps{display:flex;align-items:center;gap:8px;margin:10px 0;padding:8px 12px;border-radius:10px;background:#fff8e1;border:1px solid #F3B914;color:#1c1c1c;font-size:14px;font-weight:600;animation:gdps-in .5s ease-out both}' +
    '.gdps b{color:#0b0b0b;font-weight:900}.gdps i{width:8px;height:8px;border-radius:50%;background:#2fb36b;box-shadow:0 0 0 0 rgba(47,179,107,.6);animation:gdps-pulse 1.8s infinite}' +
    '@keyframes gdps-in{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}@keyframes gdps-pulse{70%{box-shadow:0 0 0 8px rgba(47,179,107,0)}100%{box-shadow:0 0 0 0 rgba(47,179,107,0)}}' +
    '@media (prefers-reduced-motion:reduce){.gdps,.gdps i{animation:none}}';

  function mostrar(n) {
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    var el = document.createElement('div'); el.className = 'gdps'; el.setAttribute('role', 'status');
    el.innerHTML = '<i aria-hidden="true"></i><span>' + CONFIG.TEXTO('<b>' + Number(n) + '</b>') + '</span>';
    var alvo = document.querySelector('.js-product-form, #product_form, form[action*="/comprar"], .js-addtocart');
    if (alvo && alvo.parentNode) alvo.parentNode.insertBefore(el, alvo.nextSibling);
  }
  if (q && /^\d+$/.test(q)) return mostrar(q);

  var K = 'gdps_v1';
  try { var c = JSON.parse(localStorage.getItem(K) || 'null'); if (c && Date.now() - c.t < CONFIG.CACHE_H * 36e5) { if (c.m) mostrar(c.n); return; } } catch (e) {}
  fetch(CONFIG.URL, { mode: 'cors' }).then(function (r) { return r.ok ? r.json() : null; }).then(function (d) {
    if (!d) return;
    try { localStorage.setItem(K, JSON.stringify({ t: Date.now(), n: d.total, m: !!d.mostrar })); } catch (e) {}
    if (d.mostrar) mostrar(d.total);
  }).catch(function () {});
})();
