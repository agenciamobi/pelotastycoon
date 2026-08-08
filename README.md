# Pelotas Tycoon

Jogo tycoon 3D ambientado em Pelotas/RS. O jogador começa com seu primeiro negócio na Praia do Laranjal, trabalha na operação, automatiza processos, administra clientes e funcionários e constrói sua trajetória empresarial pela cidade.

## Status

**PRE-PRODUCTION v1.0 — revisão final aprovada para início da implementação.**

A V0.1 entra agora na fase de fundação Unity e graybox, mantendo o escopo documentado em `/docs`.

## V0.1

A primeira versão de teste será focada em um único ponto comercial na Praia do Laranjal e permitirá escolher entre:

- Pizzaria
- Sorveteria
- Churrascaria
- Lancheria
- Pastelaria
- Peixaria

Os seis negócios compartilharão o mesmo motor de gameplay, adaptando produtos, equipamentos, falas, tempos, preços e identidade visual por configuração.

## Princípios

- Pelotas é parte do gameplay, não apenas cenário.
- Começar pequeno e crescer faz parte da narrativa.
- Mobile-first, portrait e controle simples.
- Gestão com consequência e automação gradual.
- Zero anúncios: sem interstitial, rewarded ad ou SDK de publicidade.
- Compras futuras são opcionais e não compram superioridade competitiva.
- Sem pay-to-win competitivo.
- Multiplayer social futuro priorizando arquitetura assíncrona.

## Tecnologia planejada

- Unity 6.3 LTS
- C#
- URP
- Android
- Portrait como baseline da V0.1
- Android 16 / API 36 como baseline de target para publicação futura
- Save local na V0.1
- Supabase em fases online futuras

A versão exata de patch do Unity será fixada pelo `ProjectVersion.txt` no primeiro commit do projeto Unity.

## Modelo comercial futuro

A direção comercial é **free-to-play sem publicidade**, com compras opcionais dentro do jogo voltadas principalmente a personalização, cosméticos e conteúdo visual. A V0.1 não terá monetização.

## Documentação

A documentação oficial está em [`/docs`](docs/README.md).

## Projeto

Desenvolvido pela MOBI — Marketing Inteligente, Pelotas/RS.
