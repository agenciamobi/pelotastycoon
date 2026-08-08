# Pelotas Tycoon — Checklist de Fechamento PRE-PRODUCTION v1.0

## Objetivo

Definir os critérios mínimos para encerrar a pré-produção e iniciar o projeto Unity sem decisões estruturais pendentes.

## Status geral

A documentação já define:

- visão do produto;
- história e primeiro capítulo;
- core loop;
- seis negócios iniciais;
- produtos e diálogos adaptativos;
- economia e progressão;
- clientes/NPCs;
- direção visual do Laranjal;
- UX/UI;
- áudio;
- monetização;
- arquitetura técnica;
- roadmap;
- planta espacial;
- fluxo de personagens;
- upgrades/expansão;
- baseline de balanceamento.

## Decisões já congeláveis

### Produto

- working title: **Pelotas Tycoon**;
- plataforma inicial: Android;
- engine: Unity 6 LTS;
- linguagem: C#;
- render pipeline: URP;
- V0.1 offline com save local;
- zero anúncios;
- sem monetização na V0.1.

### Cenário

- Praia do Laranjal como primeira região;
- orla como palco principal;
- Lagoa dos Patos como âncora visual;
- ponto comercial pequeno e estruturado;
- Mar de Dentro como referência de expansão comercial futura.

### Gameplay

- portrait como baseline;
- joystick de um dedo;
- interação automática por proximidade;
- atendimento de balcão nos seis negócios;
- engine data-driven;
- primeiro funcionário na V0.1;
- progressão física por Upgrade Zones.

### Negócios

- pizzaria;
- sorveteria;
- churrascaria;
- lancheria;
- pastelaria;
- peixaria.

## O que deve ser validado no graybox, não na documentação

Estes itens não bloqueiam o início do Unity porque dependem de sensação prática:

- altura/ângulo exato da câmera;
- tamanho real do lote em unidades Unity;
- velocidade do personagem;
- raio das triggers;
- espaçamento entre estações;
- largura da fila;
- velocidade dos NPCs;
- intensidade de haptics;
- tempos/preços definitivos;
- quantidade máxima de NPCs por aparelho.

## Primeira meta Unity

Criar um **graybox funcional**, sem arte final, contendo:

1. cena Laranjal simplificada;
2. chão/lote;
3. personagem placeholder;
4. joystick portrait;
5. câmera;
6. `SourceStation`;
7. `ProcessorStation`;
8. `CounterStation`;
9. cliente placeholder;
10. fila;
11. pedido;
12. pagamento;
13. dinheiro coletável.

## Critério Gate A — Core Loop

Não iniciar produção artística relevante enquanto não for possível repetir de forma satisfatória:

```text
pegar → produzir → entregar → receber → coletar → repetir
```

## Critério Gate B — Business Data

Antes de criar seis conjuntos completos de assets, comprovar que trocar uma `BusinessDefinition` altera sem mudança de lógica central:

- produtos;
- estação temática;
- tempos;
- valores;
- frases;
- ícones/placeholders.

Teste mínimo:

- Pizzaria;
- Sorveteria.

Se as duas funcionarem apenas trocando dados, expandir para as demais.

## Critério Gate C — Android

O graybox precisa chegar ao Android cedo.

Validar:

- instalação APK;
- portrait;
- joystick;
- safe areas;
- touch;
- performance;
- retomada do app;
- save local básico.

Não esperar arte final para testar no aparelho.

## Critério Gate D — Laranjal

Depois do core loop aprovado, inserir representação simplificada:

- água;
- areia;
- calçadão;
- árvores;
- rua;
- fundo urbano.

A pergunta do teste é:

> Sem uma placa explicando, o conjunto já começa a transmitir orla do Laranjal?

## Critério Gate E — Progressão

Adicionar:

- Upgrade Zones;
- segundo produto;
- melhoria de produção;
- primeiro funcionário;
- transformação visual do ponto;
- marco final do capítulo.

## Definition of Ready para iniciar Unity

A pré-produção é considerada pronta quando:

- os documentos 00–24 estão coerentes entre si;
- nenhum requisito crítico da V0.1 está contraditório;
- itens futuros permanecem fora do escopo;
- o canon do Laranjal está consolidado;
- os números econômicos são explicitamente tratados como parâmetros de playtest;
- o primeiro milestone técnico é o graybox, não a arte.

## Decisão de governança

Após aprovação, criar o marco lógico:

**`PRE-PRODUCTION v1.0`**

A partir daí:

- novas ideias não entram automaticamente na V0.1;
- mudanças estruturais exigem atualização de canon/GDD;
- desenvolvimento passa a seguir os gates definidos neste documento.

## Próximo passo após congelamento

1. criar projeto Unity base;
2. definir versão exata do editor;
3. criar estrutura de pastas;
4. configurar Android/URP/input;
5. gerar primeiro commit Unity;
6. implementar graybox do core loop;
7. produzir primeiro APK interno.