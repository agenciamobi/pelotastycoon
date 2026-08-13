# Pelotas Tycoon

Jogo tycoon 2.5D/cartoon ambientado em Pelotas/RS. O jogador começa com seu primeiro negócio na Praia do Laranjal, trabalha na operação, automatiza processos, administra clientes e funcionários e constrói sua trajetória empresarial pela cidade.

## Status

**FOUNDATION WEB v0.1 — em implementação.**

A estratégia técnica foi alterada em agosto de 2026 para priorizar uma versão jogável no navegador rapidamente, mantendo o Android como plataforma oficial por meio da mesma base de código.

O primeiro vertical slice usa a Praia do Laranjal e valida o core loop antes da produção artística pesada.

## V0.1

A primeira versão jogável é focada em um único ponto comercial na Praia do Laranjal. O motor continuará preparado para as seis categorias definidas na pré-produção:

- Pizzaria
- Sorveteria
- Churrascaria
- Lancheria
- Pastelaria
- Peixaria

Os negócios compartilham o mesmo motor de gameplay, adaptando produtos, equipamentos, falas, tempos, preços e identidade visual por configuração.

## Princípios

- Pelotas é parte do gameplay, não apenas cenário.
- Começar pequeno e crescer faz parte da narrativa.
- Web-first sem abandonar Android.
- Mobile-first e responsivo.
- Arte 2.5D/cartoon colorida, reconhecível e acessível.
- Gestão com consequência e automação gradual.
- Zero anúncios.
- Compras futuras opcionais e sem pay-to-win competitivo.
- Multiplayer social futuro prioritariamente assíncrono.

## Stack

- Phaser 4
- TypeScript
- React
- Vite
- Capacitor
- Web/PWA como primeira superfície testável
- Android pela mesma base de código
- Save local na V0.1
- Supabase em fases online futuras

## Rodando localmente

```bash
npm install
npm run dev
```

Build de produção:

```bash
npm run build
```

Preparação Android, após adicionar a plataforma nativa:

```bash
npx cap add android
npm run cap:sync
```

## Meta do primeiro vertical slice

1. Abrir o jogo pelo navegador.
2. Entrar no Laranjal.
3. Mover o personagem por toque/clique.
4. Comprar o primeiro ponto comercial.
5. Receber clientes.
6. Atender e gerar receita.
7. Persistir o progresso localmente.

## Documentação

A documentação oficial está em [`/docs`](docs/README.md).

## Projeto

Desenvolvido pela MOBI — Marketing Inteligente, Pelotas/RS.
