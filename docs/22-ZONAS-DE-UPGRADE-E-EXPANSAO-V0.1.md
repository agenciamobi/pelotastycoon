# Pelotas Tycoon — Zonas de Upgrade e Expansão V0.1

## Objetivo

Definir como o primeiro ponto comercial cresce visual e funcionalmente dentro do mesmo cenário.

## Princípio

O jogador deve **ver o negócio crescer**. Upgrades importantes não podem existir apenas como números em menus.

## Estado inicial

O ponto começa deliberadamente simples:

- fachada básica;
- 1 source;
- 1 processor;
- 1 balcão;
- capacidade limitada;
- nenhum funcionário;
- poucos produtos/clientes.

## Sistema de Upgrade Zones

Áreas físicas exibem um custo e recebem pagamento do jogador por proximidade/permanência.

Exemplo conceitual:

```text
┌──────────────┐
│  MELHORAR    │
│    120       │
└──────────────┘
```

Ao completar o custo:

1. feedback sonoro;
2. partículas simples;
3. objeto/equipamento aparece ou evolui;
4. capacidade/velocidade é atualizada;
5. zona desaparece ou passa ao próximo nível.

## Regras das zonas

- fora da rota operacional principal;
- suficientemente grandes para mobile;
- custo legível;
- não ativar por passagem muito rápida acidental;
- jamais esconder o caminho dos NPCs;
- permitir desativação durante cutscenes/tutorial inicial.

## Sequência de crescimento V0.1

A ordem abaixo é baseline de produção, sujeita a playtest:

### Marco 0 — Abrir o negócio

- tipo de negócio escolhido;
- estação básica disponível;
- primeiro produto habilitado.

### Marco 1 — Capacidade

Upgrade simples no processor ou armazenamento.

Objetivo: ensinar que dinheiro retorna para o negócio.

### Marco 2 — Balcão

Aumento de capacidade de produtos/atendimento.

Objetivo: reduzir gargalo visível.

### Marco 3 — Segundo produto

Libera variedade e demonstra adaptação temática do negócio.

### Marco 4 — Segundo equipamento ou melhoria forte

Aumenta throughput.

### Marco 5 — Primeiro funcionário

Momento narrativo importante: transição de operador para gestor.

### Marco 6 — Fachada / expansão visual

O estabelecimento deve parecer claramente mais desenvolvido do que no início.

### Marco 7 — Consolidação

Atinge meta final do capítulo e prepara revelação do mapa de Pelotas.

## Expansão física

A expansão acontece no mesmo lote por ativação de módulos.

```text
INÍCIO
┌────────────┐
│ negócio    │
│ compacto   │
└────────────┘

MEIO
┌──────────────────┐
│ negócio + módulo │
└──────────────────┘

FINAL V0.1
┌────────────────────────┐
│ estabelecimento sólido │
│ + equipe + equipamentos│
└────────────────────────┘
```

## Modularidade por negócio

O layout funcional é compartilhado, mas o visual dos módulos muda:

- pizzaria: forno/bancadas/placas temáticas;
- sorveteria: freezer/expositor;
- churrascaria: churrasqueira/preparo;
- lancheria: chapa/bancada;
- pastelaria: fritadeira/preparo;
- peixaria: exposição/preparo refrigerado.

Nenhum upgrade central deve depender de código específico de um desses nomes.

## Tipos de upgrade

### Produção

- velocidade;
- capacidade;
- quantidade simultânea.

### Atendimento

- capacidade do balcão;
- fila suportada;
- velocidade de entrega futura.

### Automação

- primeiro funcionário;
- melhoria do funcionário em versões posteriores.

### Visual

- fachada;
- placa;
- organização interna;
- decoração básica ligada à progressão.

### Demanda

Na V0.1, upgrades de demanda devem ser usados com cautela. Aumentar clientes sem capacidade operacional pode gerar frustração. Preferir demanda como consequência de marcos consolidados.

## Transformação visual obrigatória

A comparação `início x fim` deve ser perceptível em screenshot sem HUD.

Critério:

> Uma pessoa deve conseguir identificar que o estabelecimento evoluiu sem precisar observar o saldo ou nível.

## Área futura de mesas

O lote pode reservar espaço para mesas, mas serviço de mesa não faz parte da V0.1. A área pode existir apenas como reserva visual ou expansão futura.

## Conclusão

As Upgrade Zones transformam progressão econômica em transformação física. O jogador começa com um ponto modesto e termina a V0.1 com um comércio reconhecivelmente mais estruturado, criando a sensação de conquista necessária antes da revelação do restante de Pelotas.