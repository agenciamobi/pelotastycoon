# Documentação — Pelotas Tycoon

Esta pasta contém a documentação oficial do projeto.

## Ordem de leitura

1. [00 — Visão do Projeto](00-VISAO-DO-PROJETO.md)
2. [01 — História e Enredo](01-HISTORIA-E-ENREDO.md)
3. [02 — Game Design Document](02-GAME-DESIGN-DOCUMENT.md)
4. [03 — Loop de Gameplay](03-LOOP-DE-GAMEPLAY.md)
5. [04 — Negócios e Produtos](04-NEGOCIOS-E-PRODUTOS.md)
6. [05 — Economia e Progressão](05-ECONOMIA-E-PROGRESSAO.md)
7. [06 — Clientes e NPCs](06-CLIENTES-E-NPCS.md)
8. [07 — Laranjal: Mapa e Ambiente](07-LARANJAL-MAPA-E-AMBIENTE.md)
9. [08 — Monetização](08-MONETIZACAO.md)
10. [09 — Arquitetura Técnica](09-ARQUITETURA-TECNICA.md)
11. [10 — Roadmap V0.1](10-ROADMAP-V0.1.md)
12. [11 — Canon e Regras](11-CANON-E-REGRAS.md)
13. [12 — Backlog de Ideias](12-BACKLOG-DE-IDEIAS.md)
14. [13 — Roteiro Jogável do Capítulo 1](13-ROTEIRO-JOGAVEL-CAPITULO-1.md)
15. [14 — Bíblia Narrativa e Personagens](14-BIBLIA-NARRATIVA-E-PERSONAGENS.md)
16. [15 — Diálogos Adaptativos V0.1](15-DIALOGOS-ADAPTATIVOS-V0.1.md)
17. [16 — UX/UI V0.1](16-UX-UI-V0.1.md)
18. [17 — Direção de Arte V0.1](17-DIRECAO-DE-ARTE-V0.1.md)
19. [18 — Áudio e Ambientação V0.1](18-AUDIO-E-AMBIENTACAO-V0.1.md)
20. [19 — Planta do Cenário Laranjal V0.1](19-PLANTA-DO-CENARIO-LARANJAL-V0.1.md)
21. [20 — Referências Reais do Laranjal e Mar de Dentro](20-REFERENCIAS-REAIS-LARANJAL-E-MAR-DE-DENTRO.md)
22. [21 — Fluxo Espacial do Jogador e NPCs V0.1](21-FLUXO-ESPACIAL-JOGADOR-E-NPCS-V0.1.md)
23. [22 — Zonas de Upgrade e Expansão V0.1](22-ZONAS-DE-UPGRADE-E-EXPANSAO-V0.1.md)
24. [23 — Balanceamento Inicial dos Seis Negócios V0.1](23-BALANCEAMENTO-INICIAL-DOS-SEIS-NEGOCIOS-V0.1.md)
25. [24 — Checklist de Fechamento PRE-PRODUCTION v1.0](24-CHECKLIST-FECHAMENTO-PRE-PRODUCTION-V1.0.md)
26. [25 — Marcos Visuais da Orla do Laranjal](25-MARCOS-VISUAIS-DA-ORLA-DO-LARANJAL.md)
27. [26 — Revisão Cruzada Final PRE-PRODUCTION v1.0](26-REVISAO-CRUZADA-FINAL-PRE-PRODUCTION-V1.0.md)

## Governança

- Canon/GDD: decisões oficiais e requisitos aprovados.
- Roteiro jogável: tradução da narrativa para a experiência real da primeira sessão.
- UX/UI, arte e áudio: direcionamento de produção da experiência web/Android.
- Referências reais: lastro visual e contextual de Pelotas e Laranjal.
- Balanceamento: valores provisórios para playtest; não economia definitiva.
- Backlog: ideias exploratórias sem compromisso de implementação.
- Mudanças de escopo devem atualizar os documentos relacionados.

## Marco anterior

`PRE-PRODUCTION v1.0` — concluída.

## Marco atual

**`FOUNDATION WEB v0.1` — EM IMPLEMENTAÇÃO.**

A arquitetura foi migrada de Unity/Android-first para Phaser + TypeScript + React + Vite, mantendo Android via Capacitor. A prioridade agora é uma URL jogável do Laranjal e a validação do core loop antes da produção artística pesada.
