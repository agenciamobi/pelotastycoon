# Pelotas Tycoon — Game Design Document (GDD)

## 1. Conceito

Pelotas Tycoon é um jogo mobile 3D de gestão e progressão. O jogador controla diretamente seu personagem no início, executa tarefas operacionais e gradualmente automatiza o negócio, passando a tomar decisões gerenciais.

A experiência combina:

- controle simples de um dedo;
- operação direta;
- automação gradual;
- gestão de clientes e funcionários;
- expansão física do estabelecimento;
- progressão econômica;
- identidade local;
- sistemas sociais futuros.

## 2. Core loop

1. Cliente chega.
2. Cliente entra na fila.
3. Cliente faz um pedido.
4. Jogador obtém insumo.
5. Jogador processa/prepara o produto.
6. Produto vai ao balcão.
7. Cliente recebe o pedido.
8. Cliente paga.
9. Dinheiro pode ser coletado.
10. Jogador usa o dinheiro em upgrades.
11. Upgrades aumentam capacidade/eficiência.
12. Mais clientes passam a ser atendidos.

## 3. Controle

- Portrait como orientação baseline da V0.1.
- Joystick virtual.
- Um dedo.
- Interações por proximidade/trigger.
- Sem botões separados para pegar, entregar ou produzir na V0.1.

Landscape só substitui portrait se o graybox demonstrar prejuízo claro de gameplay ou visibilidade.

## 4. Motor de negócios

Todos os tipos de comércio usam um fluxo abstrato comum:

**Source → Processor → Output → Counter → Customer**

Exemplos:

- Pizzaria: ingredientes → forno → pizza → balcão → cliente.
- Pastelaria: ingredientes → fritadeira → pastel → balcão → cliente.
- Churrascaria: carne → churrasqueira → porção pronta → balcão → cliente.
- Sorveteria: insumo/freezer → preparo → sorvete → balcão → cliente.
- Lancheria: ingredientes → chapa → lanche → balcão → cliente.
- Peixaria: pescado → preparo → produto → expositor/balcão → cliente.

A V0.1 usa atendimento de balcão para todos os negócios. Serviço de mesa, buffet, delivery e drive-thru ficam fora do primeiro escopo.

## 5. Tipos de negócio iniciais

- Pizzaria
- Sorveteria
- Churrascaria
- Lancheria
- Pastelaria
- Peixaria

A escolha altera:

- nome e categoria;
- produtos;
- equipamentos;
- modelos visuais;
- frases de clientes;
- preços-base;
- custos;
- tempos de produção;
- ritmo de demanda;
- upgrades temáticos.

## 6. Cliente

Estados mínimos:

- ENTERING
- QUEUEING
- ORDERING
- WAITING
- RECEIVING
- PAYING
- LEAVING
- ABANDONING

Atributos mínimos:

- pedido;
- paciência;
- satisfação;
- valor pago;
- estado atual.

Feedback visual simplificado:

- satisfeito;
- esperando;
- irritado.

Se a paciência chegar a zero, o cliente abandona o estabelecimento.

## 7. NPC ambiental

A V0.1 deve separar conceitualmente:

- `AmbientPedestrian`: circula pela orla sem obrigação de comprar;
- `Customer`: entra no fluxo econômico do estabelecimento.

Os dois podem compartilhar modelos, animações, pooling e partes da navegação, mas não o mesmo comportamento lógico.

## 8. Funcionários

A V0.1 deve incluir pelo menos um funcionário automático desbloqueável. Sua função principal é demonstrar a transição do jogador de operador para gestor.

Sistemas avançados de salário, cansaço, experiência, especialização e transferência entre unidades são futuros.

## 9. Upgrades

Os upgrades devem produzir transformação visual e funcional.

Exemplos:

- capacidade de produção;
- velocidade de produção;
- capacidade do balcão;
- segundo equipamento;
- primeiro funcionário;
- expansão física do ponto.

A compra pode ocorrer por áreas físicas no chão ou interface contextual, priorizando feedback visual claro.

## 10. Economia

A V0.1 possui uma moeda de jogo. Valores podem ser abstratos durante prototipagem.

Receitas vêm de vendas. Gastos iniciais se concentram em upgrades. Custos operacionais complexos entram posteriormente.

Os preços da V0.1 são definidos por dados (`ProductDefinition`/configuração equivalente). **O jogador não altera preços manualmente na primeira versão.** Precificação gerencial é sistema futuro.

## 11. Progressão

A primeira região deve transmitir claramente:

**ponto simples → negócio funcional → negócio automatizado → negócio consolidado**.

Ao concluir os marcos do Laranjal, o mapa da cidade é apresentado com regiões futuras bloqueadas.

A V0.1 não exige um sistema global de reputação. Consolidação é medida por progresso, upgrades, funcionário, fluxo atendido e marcos econômicos/satisfação definidos no playtest.

## 12. Game feel

Elementos obrigatórios:

- dinheiro físico/visual coletável;
- feedback sonoro de venda;
- partículas simples em upgrades;
- resposta clara ao entrar em uma estação;
- animação/feedback de produção;
- reações visuais dos clientes;
- progressão física perceptível.

## 13. Save

V0.1: save local.

Dados mínimos:

- tipo de negócio escolhido;
- dinheiro;
- upgrades;
- progresso;
- configurações.

Deve existir opção de resetar progresso durante desenvolvimento.

## 14. Direção visual

- 3D estilizado.
- Low-poly/modular quando adequado.
- Mobile-first.
- Legibilidade acima do realismo.
- Referências reconhecíveis ao Laranjal sem exigir reprodução fotogramétrica.

## 15. Performance

Meta inicial:

- Android intermediário.
- 30 FPS estáveis como mínimo de experiência aceitável.
- Object pooling para NPCs/itens quando necessário.
- Controle de luzes em tempo real, texturas, partículas e pathfinding.

## 16. Monetização futura

- Zero anúncios em qualquer formato.
- Sem integração de SDK de publicidade como modelo de receita.
- Compras opcionais.
- Prioridade para cosméticos, personalização e conteúdo visual.
- Rankings competitivos não devem ser compráveis por vantagem financeira.
- A direção comercial é free-to-play sem ads; a V0.1 não possui monetização.

## 17. Social futuro

Planejado para fases posteriores:

- conta online;
- cloud save;
- perfil empresarial;
- visitas a negócios;
- amigos;
- rankings;
- eventos compartilhados;
- economia regional assíncrona.

## 18. Definition of Done — V0.1

A primeira versão de teste é considerada concluída quando:

- abre no Android;
- funciona sem internet;
- opera em portrait de forma adequada;
- permite escolher o negócio;
- carrega o Laranjal;
- personagem se movimenta por joystick;
- clientes entram e formam fila;
- pedestres ambientais simples circulam sem obrigação de comprar;
- pedido se adapta ao negócio;
- produto pode ser produzido, transportado e entregue;
- cliente paga;
- dinheiro pode ser coletado;
- existem pelo menos três upgrades;
- existe pelo menos um funcionário automático;
- clientes têm paciência;
- o progresso é salvo localmente;
- o jogo pode ser fechado e retomado;
- existe reset de progresso para testes;
- a experiência mantém performance aceitável em Android real.
