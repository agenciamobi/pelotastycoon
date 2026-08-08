# Pelotas Tycoon — Fluxo Espacial do Jogador e NPCs V0.1

## Objetivo

Definir como jogador, clientes e funcionário circulam pelo primeiro ponto comercial sem conflitos, bloqueios ou caminhos confusos.

## Princípio central

O core loop precisa ser compreendido visualmente. O jogador deve conseguir operar o negócio sem tutorial textual constante.

## Fluxo do jogador

```text
SPAWN / INÍCIO
   ↓
SOURCE
   ↓
PROCESSOR
   ↓
COUNTER
   ↓
DINHEIRO / UPGRADE
   ↺
```

### Regras

- percurso curto;
- poucas curvas fechadas;
- estações visíveis entre si;
- espaço para carregar itens sem colisão frustrante;
- nenhuma estação operacional deve exigir atravessar a fila;
- áreas de upgrade ficam fora da rota principal para evitar compras acidentais.

## Fluxo dos clientes

```text
SPAWN CALÇADÃO
      ↓
CAMINHADA AMBIENTE
      ↓
DECISÃO DE ENTRAR
      ↓
FILA
      ↓
PEDIDO
      ↓
ESPERA
      ↓
RECEBE
      ↓
PAGA
      ↓
SAÍDA
      ↓
DESPAWN / CONTINUA CALÇADÃO
```

## Spawn

Na V0.1 haverá pelo menos dois conceitos de NPC:

1. **pedestre ambiente**: compõe vida urbana e não compra;
2. **cliente**: entra no fluxo comercial.

Isso evita que todo personagem da orla pareça existir exclusivamente para a loja do jogador.

## Fila

A fila deve:

- crescer para fora sem invadir a área operacional;
- ter pontos de espera predefinidos;
- permitir leitura clara do tamanho;
- comportar inicialmente poucos clientes;
- poder crescer após upgrades de demanda.

### Estrutura sugerida

```text
BALCÃO
  ↑
[1]
  ↑
[2]
  ↑
[3]
  ↑
[4]
  ↑
CALÇADÃO
```

Se necessário, a fila pode assumir curva suave em versões posteriores, mas a V0.1 prioriza simplicidade.

## Pedido

Ao chegar à primeira posição:

1. cliente define produto;
2. balão/ícone exibe pedido;
3. paciência passa a ser relevante;
4. produto correto no balcão conclui atendimento.

## Saída

Após pagar, o cliente deve sair sem cruzar a fila de entrada. Preferencialmente, o path de saída usa uma lateral do estabelecimento e retorna ao fluxo do calçadão.

## Funcionário automático

O primeiro funcionário representa automação, portanto seu caminho deve ser imediatamente compreensível.

### Função inicial sugerida

```text
SOURCE → PROCESSOR → COUNTER
```

ou uma versão reduzida definida durante playtest.

### Regras

- não bloquear o personagem;
- velocidade ligeiramente previsível;
- caminho independente da fila;
- priorizar tarefas de acordo com estado das estações;
- usar pathfinding simples e controlado.

## Separação de zonas

O cenário terá quatro categorias lógicas:

### `PublicZone`
Calçadão, fila, balcão externo.

### `StaffZone`
Produção, source, armazenamento.

### `UpgradeZone`
Áreas de compra/desbloqueio.

### `AmbientZone`
Praia, rua e áreas cênicas.

## NavMesh / navegação

Na implementação Unity:

- clientes usam navegação limitada a caminhos públicos;
- funcionário usa área operacional;
- jogador usa controle direto e não depende de NavMesh para movimentação;
- obstáculos móveis devem ser minimizados na V0.1;
- NPCs devem ser compatíveis com pooling.

## Colisões

Evitar colisão física rígida entre jogador e NPCs quando isso gerar travamentos. Podemos usar:

- avoidance suave;
- colliders menores;
- layers específicas;
- ou permitir pequena sobreposição controlada entre personagens.

A decisão final deve priorizar fluidez mobile.

## Capacidade inicial

Parâmetro provisório para primeiro playtest:

- 1 cliente sendo atendido;
- até 3 aguardando na fila;
- 2 a 6 pedestres ambientais visíveis em ciclos;
- 1 funcionário após desbloqueio.

Os números são parâmetros de teste, não canon econômico definitivo.

## Feedback espacial

O jogador deve reconhecer estados sem abrir menus:

- item pronto visível na estação;
- cliente com pedido acima da cabeça;
- paciência indicada visualmente;
- dinheiro no ponto de pagamento;
- upgrade zone com custo;
- equipamento bloqueado presente como marca/ghost opcional.

## Critério de sucesso

O fluxo espacial está aprovado quando uma pessoa que nunca viu o jogo consegue, com poucas instruções ou nenhuma, compreender:

1. onde pegar insumos;
2. onde produzir;
3. onde entregar;
4. onde estão os clientes;
5. onde coletar dinheiro;
6. onde evoluir o estabelecimento.