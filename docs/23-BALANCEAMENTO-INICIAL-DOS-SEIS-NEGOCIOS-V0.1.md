# Pelotas Tycoon — Balanceamento Inicial dos Seis Negócios V0.1

## Objetivo

Definir parâmetros iniciais de playtest para que os seis negócios usem o mesmo motor, mas transmitam ritmos diferentes.

> Estes valores são **baseline de protótipo**. Não constituem economia definitiva e devem ser ajustados após testes em Android real.

## Metas de ritmo da primeira sessão

- escolher o negócio: até 30 segundos após a abertura;
- primeira produção/venda: idealmente em até 60–90 segundos;
- primeiro upgrade: aproximadamente 2–4 minutos;
- segundo produto: aproximadamente 5–8 minutos;
- primeiro funcionário: aproximadamente 8–15 minutos;
- consolidação do ponto V0.1: aproximadamente 20–35 minutos no primeiro playthrough.

Não usar espera artificial de dezenas de minutos para produzir itens na V0.1.

## Unidade econômica

Durante prototipagem usamos **moedas de jogo**, sem compromisso com escala monetária real brasileira.

A moeda exibida pode ser representada por símbolo neutro até decidirmos a linguagem econômica final.

## Dimensões de balanceamento

Cada negócio varia principalmente por:

- tempo de produção;
- valor de venda;
- intervalo de demanda;
- capacidade inicial;
- margem de erro antes de formar fila;
- retorno dos upgrades.

## Tabela-base

| Negócio | Produto inicial | Produção base | Venda base | Intervalo médio de chegada | Identidade |
|---|---|---:|---:|---:|---|
| Sorveteria | Sorvete de chocolate | 2,5 s | 7 | 6–8 s | rápido, alto giro |
| Pastelaria | Pastel de carne | 4,0 s | 10 | 7–9 s | ritmo ágil e fila frequente |
| Lancheria | Hambúrguer | 5,0 s | 14 | 8–10 s | equilibrado |
| Peixaria | Filé de pescado | 5,5 s | 16 | 9–11 s | ritmo médio, ticket maior |
| Pizzaria | Pizza de queijo | 7,0 s | 20 | 10–12 s | produção lenta, maior recompensa |
| Churrascaria | Porção de carne | 8,0 s | 24 | 11–13 s | maior ticket, cadência mais lenta |

Os intervalos de chegada devem sofrer variação aleatória pequena para evitar aparência mecânica.

## Produtos V0.1

### Pizzaria

1. Pizza de queijo
2. Pizza de calabresa
3. Pizza de frango

### Sorveteria

1. Sorvete de chocolate
2. Sorvete de morango
3. Sorvete de creme

### Churrascaria

1. Porção de carne
2. Porção de frango
3. Porção de linguiça

### Lancheria

1. Hambúrguer
2. Cachorro-quente
3. Xis

### Pastelaria

1. Pastel de carne
2. Pastel de queijo
3. Pastel de frango

### Peixaria

Na V0.1 usamos nomes genéricos até validar espécies/representação regional:

1. Filé de pescado
2. Pescado inteiro
3. Porção de pescado

O jogo não deve atribuir espécie local sem validação documental.

## Desbloqueio de produtos

Baseline comum:

- Produto 1: início;
- Produto 2: marco intermediário;
- Produto 3: após melhoria de produção/balcão.

A ordem exata pode ser ajustada por negócio, mas o motor permanece data-driven.

## Paciência dos clientes

Baseline inicial:

- estado confortável: primeiros 8 segundos;
- atenção/espera: 8–16 segundos;
- irritação: 16–24 segundos;
- abandono: por volta de 24 segundos.

Negócios de produção mais lenta podem receber tolerância ligeiramente maior para não punir a escolha do jogador.

## Capacidade inicial

Baseline:

- processor: 1 unidade por ciclo;
- transporte do jogador: 2 unidades;
- balcão: 3 unidades prontas;
- fila: 1 atendido + até 3 esperando.

## Upgrades-base

### Upgrade 1 — Capacidade do jogador/processo

Custo de referência: **35 moedas**.

Objetivo: ser comprado após poucas vendas.

### Upgrade 2 — Balcão

Custo de referência: **80 moedas**.

Benefício: aumenta estoque visível/pronto.

### Upgrade 3 — Segundo produto

Custo de referência: **140 moedas**.

### Upgrade 4 — Produção

Custo de referência: **250 moedas**.

Benefício possível:

- `productionTime × 0,80`; ou
- +1 de capacidade, conforme playtest.

### Upgrade 5 — Primeiro funcionário

Custo de referência: **500 moedas**.

Esse deve ser um marco perceptível, não um upgrade descartável.

### Upgrade 6 — Expansão/fachada

Custo de referência: **850 moedas**.

### Marco final V0.1

Meta de patrimônio/progresso equivalente aproximado: **1.200–1.500 moedas geradas/investidas**, calibrado para encerrar o capítulo dentro da janela de 20–35 minutos.

## Diferenciação sem vantagem estrutural

A escolha inicial deve mudar estilo, não criar uma opção objetivamente superior.

### Sorveteria

- produção rápida;
- receita por venda baixa;
- maior fluxo;
- exige movimento constante.

### Pastelaria

- rápida/média;
- boa frequência;
- pressão moderada de fila.

### Lancheria

- referência de equilíbrio;
- usada como baseline comparativo.

### Peixaria

- demanda ligeiramente menor;
- ticket médio/alto;
- identidade própria para evolução futura ligada à pesca/Z3.

### Pizzaria

- ciclos mais lentos;
- ticket maior;
- estoque pré-produzido ganha importância.

### Churrascaria

- menor frequência;
- maior valor por venda;
- planejamento de produção mais importante.

## Regra de justiça

Ao medir um período equivalente de jogo bem executado, os seis negócios devem ter potencial de progressão semelhante.

Diferenças desejadas:

- sensação;
- ritmo;
- pressão;
- estratégia operacional.

Diferença indesejada:

- um negócio avançar 2× mais rápido sem contrapartida.

## Primeiro funcionário

Na V0.1, o funcionário deve reduzir uma tarefa repetitiva relevante. O playtest definirá entre:

1. `source → processor`;
2. `processor → counter`;
3. ciclo completo simplificado.

Preferência inicial: **processor → counter**, porque mantém o jogador produzindo, mas já transmite automação claramente.

## Métricas de playtest

Registrar manualmente ou por debug:

- tempo até primeira venda;
- tempo até primeiro upgrade;
- tempo até primeira fila completa;
- clientes abandonados;
- receita por minuto;
- tempo ocioso do processor;
- tempo ocioso do jogador;
- tempo até funcionário;
- tempo de conclusão do capítulo.

## Critério de aprovação

O balanceamento-base está adequado quando:

- nenhuma escolha parece punição;
- existe pressão sem caos constante;
- upgrades são frequentes no início e mais significativos depois;
- o funcionário muda perceptivelmente a operação;
- a progressão termina antes de se tornar repetitiva;
- os seis negócios permanecem reconhecivelmente diferentes usando a mesma engine.