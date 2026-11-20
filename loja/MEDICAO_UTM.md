# Medição por origem (UTM e códigos) · loja GoldDog Shop
Teo, 19/11/2026. Para o painel da Lara (vendas por origem). Tudo começa DESLIGADO.

## Links para as nossas páginas (lista /black/, orçamento, propostas)
| Ponto do site | utm_medium | utm_campaign | utm_content |
|---|---|---|---|
| Faixa da Black (contagem) | faixa_black | black2026 | handle do produto |
| Botão na página do produto | produto_botao | black2026 até 26/11, depois `sempre` | handle |
| Kits / leve junto | kit | idem | handle |
| Menu / rodapé | menu / rodape | idem | (vazio) |
Sempre `utm_source=loja`. Exemplo: `.../black/?utm_source=loja&utm_medium=faixa_black&utm_campaign=black2026&utm_content=gdt100-max`.

## Botões de WhatsApp
O WhatsApp não lê UTM. O texto pronto do botão ganha o código no começo, com o nome curto do produto: `SITE GDT100 MAX: <texto que já existia>`.
Aprovado pelo Tony (Vendas) 19/11. Linha a criar na tabela Códigos ativos, NO SERVIDOR NOVO do n8n, depois da migração (avisar o Tony):
- codigo `SITE`, match `comeca_com`
- instrução: "Cliente veio de um botão de WhatsApp do site; o produto vem depois de SITE e antes dos dois-pontos. Grave lead_origin = SITE e o produto. Não repita o código para o cliente e não pergunte a origem (já veio). Responda ao texto depois dos dois-pontos."
- Se o cliente apagar o código, a pergunta de origem continua valendo (regra atual da Gabi).

## Arquivos
- `loja/black-loja.js`: a faixa da Black já põe UTM no link "Entre na lista".
- `loja/medicao.js`: marca os outros links (desligado; teste com `?med_teste=1`).
