# Pelotas Tycoon — Loop de Gameplay

## Objetivo

Definir o comportamento central do jogo de forma independente de arte, negócio ou cenário.

## Loop primário

1. Um cliente é gerado na área externa.
2. O cliente navega até o estabelecimento.
3. Entra na fila.
4. Define um pedido compatível com o tipo de negócio.
5. Aguarda atendimento.
6. O jogador coleta/obtém insumos.
7. O jogador leva os insumos até a estação de processamento.
8. A estação produz o item.
9. O jogador transporta o item pronto até o balcão.
10. O pedido é entregue.
11. O cliente paga.
12. O dinheiro é apresentado visualmente.
13. O jogador coleta o dinheiro.
14. O saldo aumenta.
15. O saldo é utilizado para desbloquear melhorias.
16. Melhorias aumentam capacidade, velocidade, automação ou atração.
17. O ciclo recomeça com maior eficiência e/ou demanda.

## Loop secundário

**Ganhar → melhorar → automatizar → atender mais → ganhar melhor → expandir.**

## Loop gerencial futuro

**Observar gargalo → tomar decisão → medir consequência → otimizar operação.**

Exemplos de gargalos futuros:

- fila longa;
- produção lenta;
- capacidade insuficiente;
- preço inadequado;
- cliente insatisfeito;
- falta de funcionário;
- falta de estoque;
- limpeza;
- marketing maior que a capacidade operacional.

## Regras de interação da V0.1

- A movimentação é controlada por joystick virtual.
- Interações ocorrem por proximidade.
- O jogador não precisa apertar um botão para cada ação operacional.
- A ação deve começar rapidamente ao entrar na zona correta.
- O feedback da interação precisa ser visual e sonoro.
- O jogador deve sempre entender o próximo passo sem depender de texto longo.

## Estados do item

- RAW / insumo
- PROCESSING / em processamento
- READY / pronto
- CARRIED / transportado
- AVAILABLE / disponível no balcão
- SOLD / vendido

## Estados da estação

- LOCKED
- AVAILABLE
- WAITING_INPUT
- PROCESSING
- READY
- UPGRADING

## Estados do cliente

- ENTERING
- QUEUEING
- ORDERING
- WAITING
- RECEIVING
- PAYING
- LEAVING
- ABANDONING

## Progressão de sensação

### Início

O jogador sente que faz tudo sozinho.

### Meio

O jogador percebe gargalos e começa a melhorar equipamentos.

### Automação

O primeiro funcionário reduz trabalho manual.

### Consolidação

O jogador passa a circular, otimizar e observar em vez de executar absolutamente todas as tarefas.

## Critério de diversão do protótipo

Antes de arte final, o loop deve ser agradável mesmo com placeholders. Se produzir, entregar, receber e melhorar não for satisfatório usando geometria simples, a arte não deve ser usada para mascarar o problema.
