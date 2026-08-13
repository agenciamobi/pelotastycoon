# Pelotas Tycoon

Jogo tycoon 2.5D/cartoon ambientado em Pelotas/RS. O jogador começa com seu primeiro negócio na Praia do Laranjal, trabalha na operação, automatiza processos, administra clientes e funcionários e constrói sua trajetória empresarial pela cidade.

## Status

**FOUNDATION WEB v0.1 — vertical slice do core loop em implementação.**

A estratégia técnica foi alterada em agosto de 2026 para priorizar uma versão jogável no navegador rapidamente, mantendo o Android como plataforma oficial por meio da mesma base de código.

O primeiro vertical slice usa a Praia do Laranjal e valida o core loop antes da produção artística pesada.

## V0.1

A primeira versão jogável é focada em um único ponto comercial na Praia do Laranjal. O jogador escolhe entre:

- Pizzaria
- Sorveteria
- Churrascaria
- Lancheria
- Pastelaria
- Peixaria

Os negócios compartilham o mesmo motor de gameplay. Cada definição altera produto inicial, tempo de produção, valor de venda, intervalo de demanda e identidade visual sem duplicar o core loop.

## Fluxo jogável atual

1. Abrir ou continuar uma partida no navegador.
2. Escolher o primeiro tipo de negócio.
3. Entrar no ponto comercial no Laranjal.
4. Mover o personagem por toque/clique ou teclado.
5. Receber um pedido de cliente.
6. Buscar insumos.
7. Levar os insumos à estação de preparo.
8. Aguardar a produção.
9. Levar o produto pronto ao balcão.
10. Recolher o pagamento no caixa.
11. Acumular moedas e comprar a primeira melhoria.
12. Persistir o progresso localmente.

O tutorial é contextual: ações operacionais acontecem por proximidade, sem botão de produzir/entregar para cada etapa.

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
- Save local versionado na V0.1
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

## Documentação

A documentação oficial está em [`/docs`](docs/README.md).

## Projeto

Desenvolvido pela MOBI — Marketing Inteligente, Pelotas/RS.
