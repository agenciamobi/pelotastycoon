# Pelotas Tycoon — Revisão Cruzada Final PRE-PRODUCTION v1.0

## Status

**APROVADA**

Data de fechamento: agosto de 2026.

Esta revisão verifica consistência entre visão, narrativa, GDD, economia, negócios, NPCs, UX/UI, direção de arte, arquitetura, monetização, cenário, balanceamento e roadmap antes do primeiro commit Unity.

## Resultado executivo

A pré-produção está suficientemente consistente para iniciar implementação.

Não restaram bloqueios conceituais ou arquiteturais que justifiquem postergar o graybox.

As decisões que ainda dependem de sensação prática foram deliberadamente mantidas para playtest e não são falhas de documentação.

## Achados corrigidos durante a revisão

### 1. Política de publicidade

**Problema encontrado:**

Documentos anteriores usavam expressões como `zero anúncios invasivos` e proibiam rewarded ads apenas como requisito de progressão. Isso deixava uma brecha incompatível com a direção comercial definida para o produto.

**Correção:**

Canon consolidado como:

- zero interstitial;
- zero rewarded ads;
- zero banner;
- zero vídeo publicitário;
- zero SDK de ads como modelo de receita.

Modelo futuro:

**free-to-play sem publicidade + compras opcionais dentro do jogo**.

Alterar essa regra exige revisão formal de canon.

### 2. Reputação na V0.1

**Problema encontrado:**

A narrativa usava `boa reputação` e o roteiro citava reputação mínima, mas nenhum sistema de reputação estava especificado no GDD/roadmap da primeira versão.

**Correção:**

A V0.1 não possui reputação global.

Consolidação usa:

- progresso;
- upgrades;
- funcionário;
- vendas/atendimentos;
- satisfação operacional;
- fluxo sustentável.

Reputação fica para a evolução gerencial/social futura.

### 3. Precificação

**Problema encontrado:**

Preço aparece como dimensão importante da visão futura, mas não estava explícito se o jogador alteraria preços na V0.1.

**Correção:**

Na V0.1:

- preços são data-driven;
- definidos por produto/negócio;
- não ajustados manualmente pelo jogador.

Precificação gerencial é sistema futuro.

### 4. Ordem dos produtos no roteiro

**Problema encontrado:**

O roteiro não estava completamente alinhado ao baseline de balanceamento:

- Lancheria: roteiro iniciava com xis, balanceamento com hambúrguer;
- Churrascaria: ordem do segundo produto divergia;
- Peixaria: primeiro pedido divergia do produto inicial definido.

**Correção:**

Roteiro e balanceamento agora usam:

- Pizzaria: queijo → calabresa;
- Sorveteria: chocolate → morango;
- Churrascaria: carne → frango;
- Lancheria: hambúrguer → cachorro-quente;
- Pastelaria: carne → queijo;
- Peixaria: filé de pescado → pescado inteiro.

### 5. Stack Unity

**Problema encontrado:**

A documentação dizia genericamente `Unity 6 LTS`.

**Correção:**

Baseline de produção:

- Unity 6.3 LTS;
- patch exato fixado pelo `ProjectVersion.txt` no primeiro commit Unity;
- URP;
- C#.

### 6. Baseline Android

**Problema encontrado:**

Target Android ainda não estava explícito.

**Correção:**

- package/application id: `com.agenciamobi.pelotastycoon`;
- portrait como baseline;
- Android 16/API 36 como target baseline de publicação;
- `minSdk` definido após testes de aparelho no graybox;
- APK para testes internos;
- AAB para futura publicação na Google Play.

### 7. Vida independente do comércio

**Problema encontrado:**

O core loop original podia sugerir que todo NPC da orla fosse cliente.

**Correção:**

Dois comportamentos separados:

- `AmbientPedestrian`;
- `Customer`.

Eles podem reutilizar arte/animações/pooling, mas possuem lógica distinta.

## Consistências confirmadas

### Escopo

V0.1 permanece:

- somente Praia do Laranjal;
- um ponto comercial;
- seis negócios;
- atendimento de balcão;
- offline;
- save local;
- sem backend;
- sem monetização;
- sem outras regiões jogáveis;
- sem serviço de mesa;
- sem multiplayer.

### Motor de negócio

Mantido:

`Source → Processor → Output → Counter → Customer`

Nenhum dos seis negócios exige código central exclusivo.

### Narrativa

Mantido:

**recomeço → iniciativa → trabalho → aprendizado → crescimento**

O protagonista continua sem biografia fixa.

### Laranjal

Mantido:

- Lagoa dos Patos;
- areia;
- calçadão arborizado;
- vida cotidiana;
- continuidade urbana;
- pequeno comércio estruturado;
- marco `Laranjal` interpretado de forma própria quando viável;
- Mar de Dentro como referência de expansão futura.

### Monetização futura

Mantido:

- compras opcionais;
- cosméticos/personalização como prioridade;
- sem pay-to-win;
- sem anúncios.

### Multiplayer futuro

Mantido:

- prioridade para modelo assíncrono;
- visitas a negócios reconstruídos localmente;
- Supabase como preferência inicial de backend futuro;
- servidor autoritativo para operações competitivas/econômicas relevantes quando essa fase existir.

## Decisões que NÃO bloqueiam o Unity

Devem ser validadas no graybox:

- patch exato do Unity 6.3 LTS disponível no momento da criação;
- `minSdk` definitivo;
- ângulo/altura exatos da câmera;
- velocidade do jogador;
- tamanho do lote;
- distância entre estações;
- raio de triggers;
- largura da fila;
- velocidade de NPCs;
- limite de NPCs ambientais/clientes por aparelho;
- função definitiva do primeiro funcionário;
- intensidade de haptics;
- valores econômicos definitivos;
- detalhes de iluminação e densidade de cenário.

## Riscos conhecidos

### Performance de NPCs

Mitigar com:

- pooling;
- limites separados;
- culling/LOD;
- redução de atualização de IA distante;
- pathfinding controlado.

### Escopo de arte

Não modelar toda a orla antes de aprovar o core loop.

### Assets licenciados

Como o repositório é público, assets de terceiros não podem ser redistribuídos no Git sem licença compatível.

### Economia

Os números atuais são baseline de playtest, não economia final.

### Identidade local

Reproduções específicas de obras, marcas, esculturas ou fachadas privadas exigem análise de direitos/autorização quando aplicável.

## Gate de aprovação

A `PRE-PRODUCTION v1.0` está aprovada porque:

- o core loop está definido;
- o escopo está limitado;
- as seis categorias usam uma arquitetura comum;
- narrativa e gameplay estão alinhados;
- monetização está explicitamente definida;
- orientação e stack estão definidas;
- o cenário inicial está suficientemente documentado;
- o roadmap possui gates progressivos;
- decisões sensoriais foram corretamente deixadas para prototipagem;
- nenhuma ideia futura é requisito para o primeiro APK.

## Próximo marco

### `FOUNDATION v0.1`

Objetivo imediato:

1. criar projeto Unity 6.3 LTS;
2. fixar patch do editor;
3. configurar URP/Android/portrait;
4. usar `com.agenciamobi.pelotastycoon`;
5. configurar target Android 16/API 36;
6. estruturar pastas;
7. configurar Git LFS antes de assets binários relevantes;
8. gerar APK vazio;
9. iniciar graybox do core loop.

## Primeiro gameplay obrigatório

Antes de arte relevante:

```text
mover
  ↓
pegar insumo
  ↓
produzir
  ↓
levar ao balcão
  ↓
cliente recebe
  ↓
pagamento aparece
  ↓
coletar
  ↓
repetir
```

Se esse loop não for agradável com placeholders, a prioridade é corrigir o gameplay — não produzir mais arte.

## Decisão final

**PRE-PRODUCTION v1.0: APROVADA PARA MERGE E INÍCIO DA IMPLEMENTAÇÃO UNITY.**
