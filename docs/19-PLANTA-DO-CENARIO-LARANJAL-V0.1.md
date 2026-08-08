# Pelotas Tycoon — Planta do Cenário Laranjal V0.1

## Objetivo

Definir a composição espacial da primeira área jogável do Pelotas Tycoon com base nas referências reais fornecidas do Laranjal.

## Decisão oficial

A V0.1 será ambientada na **orla do Laranjal**, com forte presença visual de:

- Lagoa dos Patos;
- faixa de areia;
- calçadão/orla;
- rua paralela com trânsito leve;
- árvores e postes;
- fluxo de pedestres;
- pequeno ponto comercial voltado ao público.

As referências do **Centro Comercial Mar de Dentro** integram o canon visual/comercial do Laranjal e orientam expansões futuras, mas **não substituem a orla como cenário principal da V0.1**.

## Princípio de level design

A primeira área não deve tentar reproduzir o Laranjal inteiro em escala cartográfica. O objetivo é criar um **recorte jogável e reconhecível**, condensando os elementos que comunicam imediatamente praia urbana, verão, bairro habitado e comércio local.

A meta é reconhecimento, legibilidade e bom gameplay — não reprodução 1:1.

## Estrutura macro

```text
[LAGOA DOS PATOS]
        ↓
[FAIXA DE AREIA]
        ↓
[CALÇADÃO / ORLA DE PEDESTRES]
        ↓
[SEU PONTO COMERCIAL]
        ↓
[RUA / ESTACIONAMENTO / ÁRVORES]
        ↓
[FUNDO CÊNICO URBANO]
```

A experiência visual principal é a sensação de que o comércio está implantado **na borda viva entre cidade e praia**.

## Faixas da cena

### 1. Praia e Lagoa

Área majoritariamente cênica.

Funções:

- estabelecer identidade;
- ampliar percepção espacial;
- servir à abertura cinematográfica;
- manter água e horizonte perceptíveis durante o gameplay.

Elementos:

- água animada simples;
- horizonte;
- céu aberto;
- faixa larga de areia;
- NPCs decorativos em baixa densidade.

### 2. Calçadão / fluxo público

Principal corredor de circulação dos clientes.

Funções:

- origem e destino dos NPCs;
- leitura de movimento urbano;
- ligação visual entre praia e comércio.

Elementos:

- piso de circulação;
- árvores;
- postes;
- bancos/detalhes urbanos simples;
- pedestres que não necessariamente entram no negócio.

### 3. Faixa do estabelecimento

Área principal de gameplay.

Elementos:

- fachada;
- balcão;
- área de produção;
- armazenamento/insumos;
- pontos de upgrade;
- espaço frontal de fila;
- reserva de área para expansão.

### 4. Faixa urbana de apoio

Área secundária, parcial ou cênica.

Elementos:

- rua paralela;
- veículos estáticos ou de circulação controlada;
- estacionamento leve;
- árvores;
- calçadas;
- edificações simplificadas.

## Implantação do primeiro comércio

O ponto ficará **voltado para o calçadão e para a Lagoa**, com acesso operacional lateral/traseiro voltado à rua.

Essa implantação:

1. reforça o Laranjal em praticamente qualquer enquadramento;
2. funciona para os seis negócios iniciais;
3. conecta clientes diretamente ao fluxo da orla;
4. permite evolução física no mesmo lote.

## Planta-base do lote

```text
                 PRAIA / LAGOA
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

               CALÇADÃO / PEDESTRES
NPC → NPC → NPC → NPC → NPC → NPC → NPC → NPC

                    FILA CLIENTES
                         ↓
          ┌────────────────────────────────┐
          │            BALCÃO              │
          │       pedido / retirada        │
          ├────────────────────────────────┤
          │                                │
          │         ÁREA DO JOGADOR        │
          │                                │
          │  [SOURCE]      [PROCESSOR]     │
          │                                │
          │      [UPGRADE / EXPANSÃO]      │
          └───────────────┬────────────────┘
                          │
                    acesso lateral
                          │
                 rua / estacionamento
```

## Regras de circulação

- `source`, `processor` e `counter` devem formar um percurso curto e legível;
- o jogador não deve atravessar a fila de clientes para executar o core loop;
- clientes não entram na área operacional;
- funcionário automático deve ter caminho próprio sem bloquear o jogador;
- a fila deve permanecer visível pela câmera principal;
- nenhuma estação deve ficar escondida atrás de outra em ângulos comuns.

## Câmera

### Gameplay

- perspectiva 3D casual, levemente elevada;
- acompanhamento suave;
- foco no negócio e personagem;
- Lagoa/praia perceptível em parte relevante dos enquadramentos;
- evitar rotação livre na V0.1 se isso prejudicar legibilidade e controle mobile.

### Abertura

1. horizonte/água;
2. faixa de areia;
3. calçadão com movimento;
4. rua e bairro;
5. aproximação do pequeno ponto comercial;
6. personagem diante do ponto.

## Reservas de expansão no lote

A planta deve prever sem mudança de cena:

- segunda estação de produção;
- ampliação do balcão;
- primeiro funcionário;
- área adicional de estoque;
- melhoria de fachada;
- pequena ampliação frontal;
- futura área de mesas, se aprovada pós-V0.1.

## Regra de reconhecimento

Mesmo usando assets simples, o cenário não pode parecer uma praia genérica. A composição deve reunir água ampla, areia, calçadão, arborização, rua paralela e continuidade urbana de forma coerente com as referências do Laranjal.

## Conclusão

A V0.1 entrega um **micro-recorte jogável da orla do Laranjal**, com um ponto comercial pequeno, legível e expansível, mantendo a Lagoa dos Patos como âncora visual da primeira experiência do jogador.