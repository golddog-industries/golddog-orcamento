# Vitrine de seminovos e usados · GoldDog Shop

Página: `https://orcamento.golddogshop.com.br/usados/` (prévia com fichas de exemplo: `?previa=1`).
Dono: Anita (Marketing) com a equipe Site. Gabi (WhatsApp 6122) lê a mesma lista.

## Como funciona

- `estoque.json` é a **fonte única e pública**: a página e a Gabi leem este arquivo. Trocar um status aqui muda a página e a resposta da Gabi ao mesmo tempo.
- Dados internos (dono do equipamento, contato do parceiro, custo, comissão, preço mínimo, observações) **nunca** entram aqui. Ficam na planilha interna `vendas/usados/USADOS_INTERNO.csv` dos arquivos do projeto.
- Itens com `"exemplo": true` só aparecem na prévia e a Gabi ignora. Apagar os exemplos quando entrar o primeiro item real.

## Cadastrar um equipamento (5 minutos)

1. O Sr. Anderson, a Aline ou o parceiro manda **fotos reais** (mínimo 3: frente, lateral, detalhe do desgaste) + os dados da ficha abaixo, por áudio ou texto.
2. A equipe Site trata as fotos (corte, peso abaixo de 300 KB, logo conforme o padrão de fotos) e salva em `fotos/USD-0004-1.jpg`, `-2.jpg`…
3. Acrescenta o item em `estoque.json` com o próximo código `USD-000N` e a linha na planilha interna.
4. Commit na branch, PR, merge. Em 1 a 2 minutos a página está no ar e a Gabi já enxerga.

## Campos de cada item

| Campo | Exemplo | Regra |
|---|---|---|
| `codigo` | `USD-0004` | Sequencial, nunca reaproveitar |
| `status` | `disponivel` / `reservado` / `vendido` | Vendido continua 30 dias na página (prova de giro) e depois sai |
| `origem` | `golddog` / `parceiro` | Parceiro mostra o aviso "negociado pela GoldDog Shop" |
| `condicao` | `seminovo` / `usado` / `revisado` | |
| `categoria` | `trommel` / `concentradora` / `finalizadora` / `motor-bomba` / `outros` | Usado no filtro |
| `titulo` | `Trommel planta de lavagem GDT500` | Dizer "concentradora", nunca "calha" |
| `marca`, `modelo` | `GoldDog`, `GDT500` | Marca de terceiro aparece só como dado do item |
| `ano` | `2024` | Sem ano certo: deixar vazio |
| `uso` | `Cerca de 8 meses de operação` | Como o dono informou |
| `local` | `CD Matupá/MT` ou `Cidade/UF (no local do parceiro)` | |
| `preco` | `98000` ou `null` | `null` mostra "Sob consulta". Nunca inventar |
| `preco_obs` | | Texto curto abaixo do preço (opcional) |
| `estado` | | Estado contado sem rodeio: o que está bom e o que precisa trocar |
| `acompanha` | `["Motor", "Bomba"]` | |
| `revisao` | `Revisado pela equipe antes da venda` | Só escrever o que de fato foi feito |
| `garantia` | `null` | PENDENTE decisão do Sr. Anderson; `null` mostra "condições informadas no atendimento" |
| `fotos` | `["fotos/USD-0004-1.jpg"]` | Só fotos reais da unidade. Nunca foto gerada por IA nem foto de catálogo no lugar da unidade |
| `video` | link do YouTube/Drive | Opcional |

## Regras de texto

- A Shop só **vende**: nada de "fabricação", "fábrica", "fabricante".
- Nada de promessa de recuperação em usado. Estado e uso, só o que foi informado.
- Pagamento (Sr. Anderson, 21/11): à vista, ou 50% de entrada e o restante na emissão da nota fiscal; parcelamento em até 12x; financiamento sujeito a aprovação; equipamento maior pode fechar direto com o Sr. Anderson.
