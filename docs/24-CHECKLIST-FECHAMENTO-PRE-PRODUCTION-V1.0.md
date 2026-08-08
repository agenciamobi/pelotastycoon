# Pelotas Tycoon — Checklist de Fechamento PRE-PRODUCTION v1.0

## Status

**APROVADO**

A revisão cruzada final está registrada em `26-REVISAO-CRUZADA-FINAL-PRE-PRODUCTION-V1.0.md`.

## Objetivo

Definir os critérios mínimos para encerrar a pré-produção e iniciar o projeto Unity sem decisões estruturais pendentes.

## Produto

- [x] Working title: **Pelotas Tycoon**.
- [x] Plataforma inicial: Android.
- [x] Engine: Unity 6.3 LTS.
- [x] Linguagem: C#.
- [x] Render pipeline: URP.
- [x] V0.1 offline com save local.
- [x] Portrait como baseline.
- [x] Package id: `com.agenciamobi.pelotastycoon`.
- [x] Android 16/API 36 como target baseline de publicação.
- [x] Zero anúncios/zero SDK de ads.
- [x] Sem monetização na V0.1.
- [x] Modelo futuro: free-to-play sem publicidade + compras opcionais.

## Cenário

- [x] Praia do Laranjal como primeira região.
- [x] Orla como palco principal.
- [x] Lagoa dos Patos como âncora visual.
- [x] Calçadão arborizado como marco estrutural.
- [x] Ponto comercial pequeno e estruturado.
- [x] Vida cotidiana independente do comércio.
- [x] Mar de Dentro como referência de expansão comercial futura.
- [x] Marcos visuais reais documentados sem incorporar automaticamente fotos de terceiros como assets.

## Gameplay

- [x] Joystick de um dedo.
- [x] Interação automática por proximidade.
- [x] Atendimento de balcão nos seis negócios.
- [x] Engine data-driven.
- [x] `AmbientPedestrian` separado de `Customer`.
- [x] Primeiro funcionário na V0.1.
- [x] Progressão física por Upgrade Zones.
- [x] Preços fixos/data-driven na V0.1.
- [x] Precificação manual fora da V0.1.
- [x] Reputação global fora da V0.1.

## Negócios

- [x] Pizzaria.
- [x] Sorveteria.
- [x] Churrascaria.
- [x] Lancheria.
- [x] Pastelaria.
- [x] Peixaria.
- [x] Ordem dos primeiros produtos alinhada entre roteiro e balanceamento.

## Economia

- [x] Baseline de tempos/preços criado.
- [x] Valores explicitamente provisórios.
- [x] Primeiro upgrade planejado para poucos minutos.
- [x] Primeiro funcionário ainda na primeira sessão.
- [x] Potencial de progressão semelhante entre as seis escolhas como meta de balanceamento.

## Narrativa

- [x] Protagonista sem biografia fixa.
- [x] Eixo: recomeço → iniciativa → trabalho → aprendizado → crescimento.
- [x] Primeira venda definida como marco.
- [x] Primeiro funcionário definido como transição narrativa para gestão.
- [x] Revelação do mapa de Pelotas definida como recompensa do arco.

## Monetização

- [x] Zero interstitial.
- [x] Zero rewarded ad.
- [x] Zero banner.
- [x] Zero SDK de publicidade.
- [x] Compras futuras opcionais.
- [x] Sem pay-to-win competitivo.
- [x] Sem loot boxes pagas/gacha pago como modelo base.

## Arquitetura

- [x] Unity 6.3 LTS.
- [x] Patch exato será fixado no primeiro `ProjectVersion.txt`.
- [x] ScriptableObjects/data-driven como ponto de partida.
- [x] SaveData versionado.
- [x] NavMesh/AI Navigation planejado.
- [x] Object pooling planejado.
- [x] Git LFS antes de assets binários relevantes.
- [x] Nenhum segredo/keystore no repositório.
- [x] Supabase explicitamente fora da V0.1.

## Itens deliberadamente deixados para o graybox

Estes itens **não bloqueiam** a implementação:

- patch exato disponível dentro da família Unity 6.3 LTS;
- `minSdk` definitivo;
- altura/ângulo exato da câmera;
- tamanho do lote em unidades Unity;
- velocidade do personagem;
- raio das triggers;
- espaçamento entre estações;
- largura da fila;
- velocidade dos NPCs;
- limite de NPCs por aparelho;
- função final do primeiro funcionário;
- intensidade de haptics;
- tempos/preços definitivos;
- densidade visual final.

## Gate A — Core Loop

Não iniciar produção artística relevante enquanto não for possível repetir satisfatoriamente:

```text
pegar → produzir → entregar → receber → coletar → repetir
```

## Gate B — Business Data

Antes de criar seis conjuntos completos de assets, comprovar que trocar `BusinessDefinition` altera sem mudança de lógica central:

- produtos;
- estações;
- tempos;
- valores;
- frases;
- ícones/placeholders.

Teste mínimo: Pizzaria e Sorveteria.

## Gate C — Android

O graybox precisa chegar ao Android cedo.

Validar:

- instalação APK;
- portrait;
- joystick/touch;
- safe areas;
- target Android configurado;
- performance;
- retomada do app;
- save local básico.

## Gate D — Laranjal

Depois do core loop aprovado, inserir representação simplificada:

- água;
- areia;
- calçadão arborizado;
- árvores;
- rua/estacionamento;
- fundo urbano;
- pedestres ambientais.

Teste:

> Sem uma placa explicando, o conjunto já começa a transmitir a orla do Laranjal?

## Gate E — Progressão

Adicionar:

- Upgrade Zones;
- segundo produto;
- melhoria de produção;
- primeiro funcionário;
- transformação visual do ponto;
- marco final do capítulo.

## Definition of Ready

A pré-produção é considerada pronta porque:

- [x] documentos estão coerentes entre si após revisão cruzada;
- [x] nenhum requisito crítico da V0.1 permanece contraditório;
- [x] itens futuros permanecem fora do escopo;
- [x] canon do Laranjal está consolidado;
- [x] números econômicos são parâmetros de playtest;
- [x] primeiro milestone técnico é graybox, não arte;
- [x] política zero ads está inequívoca;
- [x] stack Android/Unity possui baseline definido.

## Marco aprovado

**`PRE-PRODUCTION v1.0`**

A partir deste marco:

- novas ideias não entram automaticamente na V0.1;
- mudanças estruturais exigem atualização de canon/GDD;
- desenvolvimento segue os gates definidos;
- o próximo estágio é `FOUNDATION v0.1`.

## Próximo passo

1. criar projeto Unity 6.3 LTS;
2. fixar patch exato do editor;
3. configurar URP;
4. configurar portrait;
5. configurar Android/target API;
6. usar `com.agenciamobi.pelotastycoon`;
7. criar estrutura de pastas;
8. configurar Git LFS;
9. gerar APK vazio;
10. implementar graybox do core loop.
