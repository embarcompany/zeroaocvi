# Baseline do redesign editorial

Referência: `main` antes das próximas fases de redesign.

## Fluxos que não podem regredir

- Perfis locais e persistência em `localStorage`.
- Tema claro/escuro, fonte ampliada e redução de movimento.
- Microchecks, conclusão manual de módulo e progresso geral.
- Navegação lateral, acordeões, âncoras e ações anterior/próximo.
- Ferramentas: checklist, cronograma e quadro de CVI, incluindo exportação em PDF.
- Marca-texto, sublinhado, itálico, tachado e anotações em qualquer bloco de leitura.
- Navegação para o trecho correto a partir de “Minhas anotações”.

## Comandos de verificação

```powershell
npm.cmd run build
npm.cmd run test
npm.cmd run lint
```

## Estado conhecido

- O build deve passar.
- O teste valida a presença dos seis módulos e dos ganchos essenciais do leitor.
- O lint possui pendências pré-existentes no arquivo monolítico `app/page.tsx`; qualquer erro novo deve ser tratado como regressão.
