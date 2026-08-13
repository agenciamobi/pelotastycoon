# Pelotas Tycoon — Roadmap V0.1

## Objetivo da V0.1

Entregar rapidamente uma versão jogável pela web, ambientada na Praia do Laranjal, validar o core loop com jogadores reais e manter a mesma base pronta para Android via Capacitor.

## Fase 0 — Pré-produção

Concluída em `PRE-PRODUCTION v1.0`. A visão, história, GDD, core loop, negócios, economia, NPCs, Laranjal, monetização e referências permanecem válidos, exceto decisões técnicas substituídas formalmente pela arquitetura web-first.

## Fase 1 — Foundation Web

- Criar projeto Vite + React + TypeScript.
- Integrar Phaser 4.
- Criar cena Laranjal.
- Configurar layout mobile-first e responsivo.
- Configurar save local.
- Configurar Capacitor com `com.agenciamobi.pelotastycoon`.
- Garantir build estático publicável.
- Não integrar SDK de publicidade.

**Saída:** URL abre e apresenta um primeiro graybox jogável.

## Fase 2 — Vertical slice mínimo

Usar formas e placeholders sempre que necessário.

- Personagem com movimento por toque/clique.
- Área inicial do Laranjal.
- Lagoa, areia, calçadão, rua e ponto comercial simplificados.
- Trapiche como landmark visual inicial.
- Compra do primeiro ponto.
- Cliente chegando.
- Fila.
- Atendimento.
- Pagamento.
- Saldo.
- Save local.

**Saída:** primeiro loop econômico completo no navegador.

## Fase 3 — Motor data-driven

- BusinessDefinition.
- ProductDefinition.
- StationDefinition.
- DialogueSet.
- UpgradeDefinition.
- Seleção de negócio.
- Adaptação automática de produtos, estações e falas.
- Preços-base definidos nos dados.

**Teste obrigatório:** trocar o negócio ativo sem alterar código do core loop.

## Fase 4 — Progressão

- Pelo menos três upgrades.
- Primeiro funcionário automático.
- Capacidade/velocidade configuráveis.
- Satisfação/paciência básica.
- Crescimento visual do estabelecimento.

Não implementar reputação global na V0.1.

## Fase 5 — Save local robusto

- SaveData versionado.
- Persistência do negócio escolhido.
- Persistência do dinheiro.
- Persistência dos upgrades.
- Retomada após fechar navegador/app.
- Reset de progresso para testes.
- Preparação de migration path para IndexedDB/cloud save futuro.

## Fase 6 — Laranjal cartoon 2.5D

- tiles e composição isométrica;
- água/Lagoa dos Patos;
- areia;
- calçadão arborizado;
- vegetação;
- ponto comercial modular;
- rua/estacionamento e continuidade urbana simplificada;
- Trapiche atual do Laranjal como landmark reconhecível;
- céu, iluminação e ambientação sonora;
- personagens cartoon modulares;
- pedestres ambientais separados dos clientes.

## Fase 7 — Game feel

- animações;
- feedback de produção;
- sons de caixa/venda;
- partículas de upgrade;
- reações de cliente;
- transições de UI;
- identidade visual cartoon definitiva.

## Fase 8 — Android

- adicionar plataforma Android ao Capacitor;
- sincronizar o build web;
- revisar safe areas;
- revisar back button e ciclo de vida;
- profiling em aparelho real;
- revisar memória/texturas;
- gerar APK/AAB de teste.

## Fase 9 — V0.1 pública de teste

Checklist:

- [ ] URL pública abre corretamente.
- [ ] Layout funciona em mobile e desktop.
- [ ] Laranjal carrega.
- [ ] Jogador se movimenta por toque/clique.
- [ ] Primeiro ponto comercial pode ser adquirido.
- [ ] Clientes chegam e formam fila.
- [ ] Atendimento gera receita.
- [ ] Pelo menos três upgrades funcionam.
- [ ] Pelo menos um funcionário funciona.
- [ ] Paciência/abandono funciona.
- [ ] Save local funciona.
- [ ] Reset de teste funciona.
- [ ] Build Android instala em aparelho real.
- [ ] Performance aceitável.

## Fora da V0.1

- Supabase.
- Login.
- Cloud save.
- Ranking.
- Amigos.
- Visitas online.
- Compras in-app.
- Publicidade e SDK de ads.
- Precificação manual.
- Reputação global.
- Outras regiões completas.
- Multiplayer em tempo real.
- Serviço de mesa complexo.
