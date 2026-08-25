# Tokens extraídos

Todos os valores abaixo são rastreáveis para o CSS da IDV. Onde o guia textual e o código divergem em nomenclatura, o valor de código é registrado como token implementado; não como manual normativo adicional.

## Cores

| Token / nome no código | Valor | Função observada | Status | Origem |
| --- | --- | --- | --- | --- |
| `--turq` | `#00D1E2` | Destaques, ações e progresso. | Extraído da IDV | [globals.css](</C:/Users/usuario/Documents/ChatGPT/Zero%20ao%20CVI/app/globals.css>) |
| `--turq-deep` | `#009DAC` | Ícones e ênfase de interface. | Extraído da IDV | [globals.css](</C:/Users/usuario/Documents/ChatGPT/Zero%20ao%20CVI/app/globals.css>) |
| `--teal` | `#05434A` | Títulos, texto principal e áreas institucionais. | Extraído da IDV | [globals.css](</C:/Users/usuario/Documents/ChatGPT/Zero%20ao%20CVI/app/globals.css>) |
| `--teal-soft` | `#0B5B62` | Variação de apoio do verde-petróleo. | Extraído da IDV | [globals.css](</C:/Users/usuario/Documents/ChatGPT/Zero%20ao%20CVI/app/globals.css>) |
| `--lime` | `#C6D783` | Apoio e confirmação/ênfase suave. | Extraído da IDV | [globals.css](</C:/Users/usuario/Documents/ChatGPT/Zero%20ao%20CVI/app/globals.css>) |
| `--ink` | `#193F43` | Texto escuro em tema claro. | Extraído da IDV | [globals.css](</C:/Users/usuario/Documents/ChatGPT/Zero%20ao%20CVI/app/globals.css>) |
| `--muted` | `#5E7F82` | Texto secundário. | Extraído da IDV | [globals.css](</C:/Users/usuario/Documents/ChatGPT/Zero%20ao%20CVI/app/globals.css>) |
| `--line` | `#D8E8E5` | Bordas e divisores. | Extraído da IDV | [globals.css](</C:/Users/usuario/Documents/ChatGPT/Zero%20ao%20CVI/app/globals.css>) |
| `--soft` | `#F4FAF8` | Fundo suave de apoio. | Extraído da IDV | [globals.css](</C:/Users/usuario/Documents/ChatGPT/Zero%20ao%20CVI/app/globals.css>) |
| `--paper` | `#FFFFFF` | Fundo base. | Extraído da IDV | [globals.css](</C:/Users/usuario/Documents/ChatGPT/Zero%20ao%20CVI/app/globals.css>) |
| Verde de confirmação | Valor hexadecimal não definido no guia textual. | Somente para confirmação positiva. | Ponto a validar | [AGENTS.md - Sistema visual](</C:/Users/usuario/Documents/ChatGPT/Zero%20ao%20CVI/Materiais/AGENTS.md>) |
| Vermelho de alerta | Valor hexadecimal não definido no guia textual. | Somente para alerta negativo. | Ponto a validar | [AGENTS.md - Sistema visual](</C:/Users/usuario/Documents/ChatGPT/Zero%20ao%20CVI/Materiais/AGENTS.md>) |
| Paleta CMYK/RGB oficial | Não definido na fonte analisada. | Não definido na fonte analisada. | Pendente | - |

## Tipografia

| Família | Pesos implementados | Uso observado | Status | Origem |
| --- | --- | --- | --- | --- |
| Montserrat | 400, 500, 600, 700, 800 | Interface, títulos, corpo e controles. | Extraído da IDV | [globals.css](</C:/Users/usuario/Documents/ChatGPT/Zero%20ao%20CVI/app/globals.css>) - import Google Fonts |
| Arial, sans-serif | Fallback sem pesos especificados | Fallback da pilha tipográfica. | Extraído da IDV | [globals.css](</C:/Users/usuario/Documents/ChatGPT/Zero%20ao%20CVI/app/globals.css>) |
| Escala tipográfica oficial | Não definida como escala de marca. Há tamanhos pontuais em CSS. | Não definido na fonte analisada. | Pendente | - |
| Entrelinha de marca | Não definida como token único. | Não definido na fonte analisada. | Pendente | - |

## Espaçamento, raios, sombra, grid e breakpoints

| Categoria | Valores / regra observada | Status | Origem |
| --- | --- | --- | --- |
| Espaçamento | `8px`, `12px`, `18px`, `28px`, `44px`, `68px` em tokens de interface. | Extraído da IDV | [globals.css](</C:/Users/usuario/Documents/ChatGPT/Zero%20ao%20CVI/app/globals.css>) |
| Raios | `9px`, `14px`, `20px` nos tokens implementados. | Extraído da IDV | [globals.css](</C:/Users/usuario/Documents/ChatGPT/Zero%20ao%20CVI/app/globals.css>) |
| Sombra | `0 18px 45px rgba(5,67,74,.07)` implementada como `--shadow`; o guia pede sombras discretas. | Extraído da IDV | [globals.css](</C:/Users/usuario/Documents/ChatGPT/Zero%20ao%20CVI/app/globals.css>), [AGENTS.md](</C:/Users/usuario/Documents/ChatGPT/Zero%20ao%20CVI/Materiais/AGENTS.md>) |
| Largura editorial | `--reader-measure: 72ch`; `--content-measure: 900px`. | Extraído da IDV | [globals.css](</C:/Users/usuario/Documents/ChatGPT/Zero%20ao%20CVI/app/globals.css>) |
| Grid desktop | Sidebar de aproximadamente `272px` a `330px`, conteúdo até `830px`; valores usam `clamp`. | Extraído da IDV | [globals.css](</C:/Users/usuario/Documents/ChatGPT/Zero%20ao%20CVI/app/globals.css>) |
| Breakpoints | Regras em `850px`, `700px`, `600px`, `520px` e `480px`. | Extraído da IDV | [globals.css](</C:/Users/usuario/Documents/ChatGPT/Zero%20ao%20CVI/app/globals.css>) |
| Grid institucional para novo site | Inferir uma grade responsiva a partir desses valores, mas não copiar a largura da apostila como regra de marketing. | Inferência para aplicação web | Base acima |

## Ícones e componentes

| Item | Regra / implementação | Status | Origem |
| --- | --- | --- | --- |
| Biblioteca de ícones | `lucide-react` instalada e usada em componentes. | Extraído da IDV | [package.json](</C:/Users/usuario/Documents/ChatGPT/Zero%20ao%20CVI/package.json>), [page.tsx](</C:/Users/usuario/Documents/ChatGPT/Zero%20ao%20CVI/app/page.tsx>) |
| Estilo de ícones | SVG inline; uma única linguagem de traço, escala e espessura; não misturar preenchido/contorno sem motivo. | Extraído da IDV | [AGENTS.md - Ícones e ilustrações](</C:/Users/usuario/Documents/ChatGPT/Zero%20ao%20CVI/Materiais/AGENTS.md>) |
| Status | Verde para concluído; vermelho para atenção negativa. | Extraído da IDV | [AGENTS.md - Ícones e ilustrações](</C:/Users/usuario/Documents/ChatGPT/Zero%20ao%20CVI/Materiais/AGENTS.md>) |
| Cartões | Borda fina, cantos moderados e sombra discreta; evitar cartões aninhados. | Extraído da IDV | [AGENTS.md - Sistema visual e Layout](</C:/Users/usuario/Documents/ChatGPT/Zero%20ao%20CVI/Materiais/AGENTS.md>) |
| Tokens de estados (hover, focus, disabled, error) | Não definidos como sistema completo. | Pendente | - |

