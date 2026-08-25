# Fonte da IDV - Embarpet

## Escopo e método

**Diretório analisado:** [`C:\Users\usuario\Documents\ChatGPT\Zero ao CVI`](</C:/Users/usuario/Documents/ChatGPT/Zero%20ao%20CVI>). Este diretório é a fonte de IDV identificada porque concentra guia de contexto/produção, tokens CSS, componentes do site e assets identificados como Embarpet. Nenhum arquivo da fonte foi alterado.

| Classificação | Uso nesta auditoria |
| --- | --- |
| **Extraído da IDV** | Texto expresso no guia ou valor existente em código/asset da fonte. |
| **Inferência para aplicação web** | Tradução operacional, sempre identificada como tal. |
| **Ponto a validar** | Não definido na fonte analisada. Não deve virar regra de design system sem aprovação. |

## Resumo da identidade

### Extraído da IDV

A Embarpet pertence ao ecossistema de transporte internacional de animais e deve transmitir autoridade técnica, segurança, responsabilidade, organização, previsibilidade e cuidado com animal e tutor. O visual deve ser **premium, limpo, técnico e humano**, com informação escaneável rapidamente, principalmente em checklists, quadros e formulários. O processo é apresentado como planejamento, interpretação e conferência - não apenas emissão de documento.

**Fonte:** [Materiais/AGENTS.md - Contexto da marca, Sistema visual e Padrões por tipo de material](</C:/Users/usuario/Documents/ChatGPT/Zero%20ao%20CVI/Materiais/AGENTS.md>).

### Personalidade

| Status | Atributos |
| --- | --- |
| Extraído da IDV | Técnica, segura, responsável, organizada, previsível, prática, acolhedora e respeitosa. |
| Inferência para aplicação web | Confiante sem ser fria; premium sem parecer luxo inacessível. |
| Ponto a validar | Arquétipo verbal formal da marca; diferenciação entre comunicação B2B (veterinários) e B2C (tutores). |

### Princípios visuais

**Extraído da IDV:** fundo branco; azul-marinho para títulos e textos principais; azul institucional vivo para ações, faixas e destaques; azul-claro para apoio; verde exclusivamente para confirmação positiva; vermelho exclusivamente para alerta negativo. Usar bordas finas, cantos moderados e sombras discretas. Hierarquia e respiro devem permitir leitura rápida; grids devem ser previsíveis; conteúdos longos devem quebrar naturalmente e não ultrapassar o contêiner.

**Evitar, extraído da IDV:** gradientes dominantes, azul sem contraste, efeitos decorativos aleatórios, bolhas, elementos flutuantes, aparência de template genérico, cartões dentro de cartões sem necessidade e ícones improvisados/emoji.

**Fonte:** [Materiais/AGENTS.md - Sistema visual, Ícones e ilustrações, Layout](</C:/Users/usuario/Documents/ChatGPT/Zero%20ao%20CVI/Materiais/AGENTS.md>).

## Tom de voz

### Extraído da IDV

- Português do Brasil.
- Claro e profissional.
- Didático sem infantilizar.
- Seguro sem prometer resultado.
- Prático e orientado à ação.
- Acolhedor com tutores e respeitoso com médicos-veterinários.
- Frases curtas, títulos informativos e instruções objetivas.
- Explicar siglas na primeira ocorrência.

### Evitar - extraído da IDV

- Promessas de faturamento garantido.
- Afirmações absolutas sobre regras de países.
- Alarmismo.
- Linguagem promocional exagerada.
- Excesso de texto em uma única tela.
- Dados comerciais não confirmados.
- Afirmar que o curso substitui consulta às fontes oficiais.

**Fonte:** [Materiais/AGENTS.md - Tom de voz](</C:/Users/usuario/Documents/ChatGPT/Zero%20ao%20CVI/Materiais/AGENTS.md>).

## Regras inegociáveis

1. **Extraído da IDV:** manter informação técnica verificável; não inventar números, credenciais, depoimentos, faturamento ou países atendidos.
2. **Extraído da IDV:** orientar consulta a MAPA, autoridade veterinária de destino e companhia aérea quando a informação depender de regra vigente.
3. **Extraído da IDV:** priorizar escaneabilidade, hierarquia e respiro sobre decoração.
4. **Extraído da IDV:** usar uma única linguagem de ícones (preferencialmente SVG inline), com consistência de traço, escala e espessura.
5. **Extraído da IDV:** verde comunica confirmação positiva; vermelho, alerta negativo.
6. **Extraído da IDV:** não usar emoji nem caracteres tipográficos como ícones.
7. **Extraído da IDV:** usar grids previsíveis, campos repetidos alinhados e texto sem overflow.
8. **Extraído da IDV:** evitar gradiente dominante e aparência de template genérico.
9. **Extraído da IDV:** preservar acessibilidade por teclado e comportamento responsivo nos materiais digitais.
10. **Ponto a validar:** a fonte não define proporções oficiais de logo, escala tipográfica institucional completa, contraste mínimo mensurado ou biblioteca única de ícones.

## Fontes consultadas

| Fonte | Papel na auditoria |
| --- | --- |
| [Materiais/AGENTS.md](</C:/Users/usuario/Documents/ChatGPT/Zero%20ao%20CVI/Materiais/AGENTS.md>) | Fonte textual primária de posicionamento, tom, regras visuais, ícones, layout e critérios de aceite. |
| [app/globals.css](</C:/Users/usuario/Documents/ChatGPT/Zero%20ao%20CVI/app/globals.css>) | Fonte de valores de cor, família tipográfica, raios, sombra, larguras e breakpoints implementados. |
| [app/page.tsx](</C:/Users/usuario/Documents/ChatGPT/Zero%20ao%20CVI/app/page.tsx>) | Fonte de componentes, ícones Lucide e usos de assets. |
| [public/images](</C:/Users/usuario/Documents/ChatGPT/Zero%20ao%20CVI/public/images>) | Fonte dos logos e imagens editoriais disponíveis. |
| [package.json](</C:/Users/usuario/Documents/ChatGPT/Zero%20ao%20CVI/package.json>) | Confirma `lucide-react` como dependência de iconografia. |

