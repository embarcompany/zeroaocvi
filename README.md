# Do Zero ao CVI — Embarpet

Repositório do ambiente digital do curso **Do Zero ao CVI**, da Embarpet. Ele reúne duas experiências complementares:

- uma **landing page** de apresentação do curso;
- a **apostila digital interativa**, com módulos, ferramentas práticas, progresso, anotações e exportações em PDF.

O curso comercial é hospedado na Hotmart. Este projeto é a camada pública de apresentação e o material didático digital.

## Rotas públicas

As rotas são relativas: funcionam tanto no domínio temporário da Vercel como em `cursos.embarpet.com.br`, sem URLs de domínio fixadas no código.

| URL | O que exibe | Implementação |
| --- | --- | --- |
| `/` | Redireciona temporariamente para `/zeroaocvi` (HTTP 307) | `next.config.ts` |
| `/zeroaocvi` | Landing page do curso | `public/zeroaocvi/index.html`, servida por rewrite |
| `/zeroaocvi/apostila` | Apostila digital interativa | `app/zeroaocvi/apostila/page.tsx` → `app/page.tsx` |
| `/assets/*` | Assets da landing page | rewrite para `public/zeroaocvi/assets/*` |

> A raiz usa redirecionamento temporário deliberadamente (`permanent: false`). Não altere para 301 enquanto a arquitetura de URLs ou o domínio ainda estiverem sendo ajustados.

## O que a apostila entrega

- Seis módulos de leitura com navegação lateral por módulo e subtópico.
- Tema claro/escuro, texto ampliado e redução de movimento.
- Perfis de leitura, progresso geral, microchecks e conclusão manual de módulo.
- Marca-texto, sublinhado, itálico, tachado e anotações vinculadas a trechos de texto.
- Três ferramentas práticas: checklist de embarque, cronograma sanitário/checklist técnico e quadro-resumo de CVI por destino.
- Exportação das ferramentas em PDF A4 via `jsPDF`.
- Dados de estudo persistidos no navegador do usuário por `localStorage`; não há banco de dados ativo no fluxo atual.

## Arquitetura do projeto

```text
zeroaocvi-production/
├── app/
│   ├── page.tsx                       # Aplicação principal da apostila (cliente)
│   ├── globals.css                    # Estilos globais e componentes editoriais
│   ├── layout.tsx                     # Metadados, idioma e favicon da Embarpet
│   ├── styles/reader-foundation.css   # Base do leitor
│   ├── lib/pdf.ts                     # Geradores de PDF das ferramentas
│   ├── components/module-header.tsx   # Componente auxiliar de cabeçalho
│   └── zeroaocvi/apostila/page.tsx    # Entrada da rota da apostila
├── public/
│   ├── course-content.json            # Fonte de conteúdo dos módulos
│   ├── images/                        # Logos e imagens da apostila
│   └── zeroaocvi/                     # Landing page estática e seus assets
├── docs/
│   ├── redesign-baseline.md           # Fluxos que não podem regredir
│   └── strategy-audit/brand/          # Auditoria da identidade visual Embarpet
├── tests/rendered-html.test.mjs       # Testes mínimos de conteúdo e ganchos do leitor
├── next.config.ts                     # Redirects e rewrites das rotas públicas
├── vercel.json                        # Build de produção para Vercel
└── package.json                       # Scripts e dependências
```

### Fonte de verdade de cada camada

| Necessidade | Arquivo ou diretório a editar |
| --- | --- |
| Texto, tabelas e blocos dos módulos | `public/course-content.json` |
| Comportamentos da apostila, navegação, ferramentas e persistência | `app/page.tsx` |
| Aparência, responsividade e temas | `app/globals.css` e `app/styles/reader-foundation.css` |
| Layout/geração dos PDFs | `app/lib/pdf.ts` |
| Landing page do curso | `public/zeroaocvi/index.html` |
| Fotos, logos e ilustrações da apostila | `public/images/` |
| Imagens, logos e bandeiras da landing page | `public/zeroaocvi/assets/` |
| Rotas `/`, `/zeroaocvi` e `/assets/*` | `next.config.ts` |
| Diretrizes de marca auditadas | `docs/strategy-audit/brand/` |

## Conteúdo e recursos didáticos

O conteúdo estruturado fica em `public/course-content.json`. A interface o carrega no navegador e aplica componentes editoriais para tabelas, fluxos, cards de atenção, mitos/verdades, checklists e encerramentos de módulo.

As ferramentas disponíveis são:

| Ferramenta | Finalidade | PDF |
| --- | --- | --- |
| Checklist de embarque do pet | Conferência de itens e pontos de atenção antes da viagem | Inclui campos do processo e pontos de atenção |
| Cronograma sanitário e checklist técnico | Registro de datas sanitárias e conferência técnica | Mantém campos vazios para preenchimento manual quando necessário |
| Quadro-resumo de emissão de CVI por destino | Consulta e registro de requisitos por destino | Mantém a tabela e campos vazios no PDF |

## Persistência local e privacidade

As interações da apostila são pessoais ao navegador e são mantidas em `localStorage`. Isso inclui perfil, preferências de leitura, progresso, checks, marcações e anotações.

- Não existe autenticação de aluno nesta aplicação.
- Não existe sincronização entre dispositivos.
- Limpar os dados do site no navegador remove essas informações locais.
- Antes de criar uma API ou banco de dados, definir com a equipe o modelo de conta, consentimento e política de privacidade.

## Identidade visual

Os documentos auditáveis da identidade Embarpet estão em [`docs/strategy-audit/brand/`](docs/strategy-audit/brand/README.md). Eles separam o que foi extraído da fonte, as inferências para web e os pontos que ainda precisam de validação humana.

Referências principais:

- [Fonte da identidade](docs/strategy-audit/brand/00-fonte-da-idv.md)
- [Tokens extraídos](docs/strategy-audit/brand/01-tokens-extraidos.md)
- [Direção visual para web](docs/strategy-audit/brand/02-direcao-visual-para-o-site.md)
- [Inventário de assets](docs/strategy-audit/brand/03-inventario-de-assets.md)

## Desenvolvimento local

### Pré-requisitos

- Node.js `>= 22.13.0`
- npm

### Comandos

```bash
npm install
npm run dev
```

Abra o endereço exibido pelo Next.js. Para testar as rotas corretas, use:

```text
http://localhost:3000/zeroaocvi
http://localhost:3000/zeroaocvi/apostila
```

Caso a porta 3000 esteja ocupada:

```bash
npm run dev -- --port 3010
```

### Verificações antes de publicar

```bash
npm run build
npm run test
npm run lint
```

`npm run test` executa o build e valida a presença dos seis módulos e dos ganchos essenciais do leitor. Consulte [`docs/redesign-baseline.md`](docs/redesign-baseline.md) antes de mexer em fluxos interativos: ele lista comportamentos que não podem regredir.

## Deploy

O projeto usa Vercel com o comando de build definido em `vercel.json`:

```json
{ "framework": "nextjs", "buildCommand": "npm run build" }
```

O deploy de produção é disparado por push na branch `main` do repositório GitHub `embarcompany/zeroaocvi`.

Checklist de publicação:

1. Execute `npm run build` localmente.
2. Revise `git status` para não subir `.next/`, `node_modules/`, `tmp/` ou arquivos pessoais.
3. Faça commit da mudança com mensagem objetiva.
4. Envie a alteração para `main`.
5. Verifique na Vercel as três rotas: `/`, `/zeroaocvi` e `/zeroaocvi/apostila`.

## Convenções de manutenção

- Não use domínio absoluto para a navegação interna; prefira `/zeroaocvi` e `/zeroaocvi/apostila`.
- Preserve o fluxo da landing page separado do leitor: a primeira é estática em `public/zeroaocvi`, a segunda é React/Next em `app/page.tsx`.
- Ao criar links externos no conteúdo, abra em nova aba com `target="_blank"` e `rel="noreferrer"`.
- Ao incluir conteúdo técnico sobre exigências sanitárias, mantenha a indicação de consulta a fontes oficiais vigentes.
- Para mudanças grandes no leitor, prefira extrair componentes de `app/page.tsx` gradualmente, mantendo os testes e os fluxos existentes.
- Não use arquivos em `tmp/` como fonte de produção; são materiais temporários de inspeção e QA local.

## Diretórios auxiliares e legado

| Diretório/arquivo | Situação atual |
| --- | --- |
| `db/`, `worker/`, `drizzle.config.ts`, `vite.config.ts` | Estrutura herdada do ambiente inicial; não participa do runtime documentado da apostila. Validar antes de remover ou reativar. |
| `Materiais/` | Materiais de referência do projeto; não é a rota pública principal. |
| `build/` e `dist/` | Saídas/artefatos locais; não são a fonte do site Next. |
| `tmp/` | Temporários de renderização, inspeção e QA; não deve ser enviado ao Git. |
| `embarpet-checklist-auditoria-pdf.pdf` | Artefato de auditoria visual mantido no repositório. |

## Pendências que exigem decisão humana

- Definir se a apostila continuará exclusivamente local por navegador ou se terá login/sincronização entre dispositivos.
- Definir a política de atualização e responsável técnico para requisitos sanitários, regras de companhias e destinos.
- Confirmar a configuração final do domínio `cursos.embarpet.com.br` na Vercel.
- Validar quais elementos herdados (`db`, `worker`, Drizzle e Vite) devem permanecer no repositório a longo prazo.

## Suporte e contexto de marca

Visualmente, a Embarpet combina especialização, segurança, acolhimento e movimento internacional. A apostila deve manter o pet e a tranquilidade da família como foco, sem parecer fria, excessivamente corporativa ou infantilizada. Para regras, evidências e limitações, consulte a auditoria de marca em `docs/strategy-audit/brand/`.
