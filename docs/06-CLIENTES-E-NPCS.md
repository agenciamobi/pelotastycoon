# Pelotas Tycoon — Clientes e NPCs

## Objetivo

Os NPCs devem fazer o mundo parecer vivo e, ao mesmo tempo, comunicar ao jogador o estado da operação.

## Papéis de NPC da V0.1

As referências reais da orla confirmam que o cenário precisa ter pessoas circulando sem que todas sejam clientes.

### `AmbientPedestrian`

NPC de ambientação.

Pode:

- caminhar pelo calçadão;
- correr;
- atravessar trechos do cenário;
- permanecer brevemente em pontos de idle;
- passar em frente ao comércio sem entrar.

Seu objetivo principal é dar escala e vida à orla.

### `Customer`

NPC econômico que participa do core loop.

Pode:

- surgir a partir do fluxo da orla;
- decidir entrar no estabelecimento;
- formar fila;
- pedir;
- esperar;
- receber produto;
- pagar;
- sair ou abandonar.

### Regra de implementação

`AmbientPedestrian` e `Customer` podem compartilhar:

- modelos;
- roupas;
- animações;
- pooling;
- partes do sistema de navegação.

Mas não devem ser tratados como o mesmo comportamento lógico.

Isso evita que a orla pareça artificialmente composta apenas por consumidores do jogador.

## Cliente da V0.1

Estados mínimos:

- ENTERING
- QUEUEING
- ORDERING
- WAITING
- RECEIVING
- PAYING
- LEAVING
- ABANDONING

## Atributos mínimos

- `customerId`
- `orderId`
- `patience`
- `satisfaction`
- `currentState`
- `spentAmount`

## Paciência

A paciência diminui enquanto o cliente espera além do tempo aceitável.

Feedback simplificado:

- satisfeito;
- neutro/aguardando;
- irritado.

Ao chegar a zero, o cliente abandona o atendimento e não gera receita.

## Satisfação

Na V0.1, satisfação pode ser derivada principalmente do tempo de atendimento. No futuro poderá considerar:

- preço;
- qualidade;
- limpeza;
- ambiente;
- disponibilidade de mesas;
- atendimento;
- variedade;
- experiências anteriores.

## Falas

As falas devem ser contextuais e curtas. Categorias:

- greeting;
- order;
- waiting;
- happy;
- angry;
- goodbye.

Templates devem suportar produto e negócio.

Exemplos:

- `Quero {product}, por favor.`
- `Meu {product} ainda não ficou pronto?`
- `Gostei bastante daqui.`
- `Demorou demais.`

## Diversidade visual

Os NPCs devem variar em aparência sem depender inicialmente de dezenas de modelos únicos. A diversidade pode vir de:

- cabelo;
- roupa;
- cor de roupa;
- acessórios;
- escala sutil;
- combinação de peças.

## Comportamentos ambientais observados nas referências

A orla real sugere comportamentos futuros como:

- caminhada casual;
- corrida;
- passeio com cachorro;
- grupos/famílias;
- permanência em bancos;
- circulação rumo à praia;
- prática esportiva na areia.

### Regra de escopo

Na V0.1, apenas caminhada/idle ambiental simples é necessária.

Cachorros, esporte, grupos sincronizados e comportamentos especializados são opcionais ou futuros.

## Arquétipos futuros

- Morador
- Turista
- Estudante
- Família
- Ciclista
- Pescador
- Trabalhador
- Visitante de evento

Arquétipos podem afetar orçamento, paciência, demanda e horários, mas ficam fora da V0.1.

## Pensamentos estilo tycoon clássico

Futuramente o jogador poderá consultar pensamentos e agregados de feedback, por exemplo:

- "A fila está demorando."
- "Não encontrei lugar para sentar."
- "O preço está alto."
- "Gostei do atendimento."

O objetivo é transformar reclamações dos NPCs em informação de gestão, e não apenas decoração narrativa.

## Regra de performance

Clientes e pedestres ambientais devem ser compatíveis com object pooling e pathfinding controlado. Não criar/destruir grandes quantidades de GameObjects continuamente durante o loop principal.

### Prioridades de otimização

- pool compartilhado de personagens quando possível;
- limites separados para clientes e pedestres;
- LOD/culling para NPCs distantes;
- atualização de IA reduzida fora da área relevante;
- evitar NavMesh/path recalculation desnecessário.

## Critério de ambientação

Ao observar a orla durante alguns segundos, o jogador deve perceber que existe vida independente do seu comércio.

O negócio faz parte do Laranjal; o Laranjal não existe apenas para servir o negócio.