# Pelotas Tycoon — Clientes e NPCs

## Objetivo

Os NPCs devem fazer o mundo parecer vivo e, ao mesmo tempo, comunicar ao jogador o estado da operação.

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

Clientes devem ser compatíveis com object pooling e pathfinding controlado. Não criar/destruir grandes quantidades de GameObjects continuamente durante o loop principal.
