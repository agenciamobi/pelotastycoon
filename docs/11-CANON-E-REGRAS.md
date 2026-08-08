# Pelotas Tycoon — Canon e Regras do Universo

## Objetivo

Este documento separa decisões oficiais do projeto de ideias ainda exploratórias. Qualquer alteração de canon deve ser deliberada e registrada.

## Canon atual

### Universo

- O jogo começa em Pelotas/RS.
- A primeira região jogável é a Praia do Laranjal.
- O jogador inicia com um pequeno ponto comercial.
- O protagonista representa o próprio jogador e não possui biografia fixa.
- A cidade influencia gameplay, economia, demanda e ambientação.

### Laranjal V0.1

- A **orla do Laranjal** é o palco principal da primeira versão.
- A **Lagoa dos Patos** é a âncora visual da área inicial.
- O cenário reúne faixa de areia, calçadão, arborização, rua paralela e continuidade urbana.
- O primeiro estabelecimento é um **pequeno ponto comercial estruturado**, mais próximo de uma loja compacta de bairro/orla do que de um quiosque improvisado.
- O ponto fica voltado para o fluxo do calçadão e para a paisagem da Lagoa.
- A representação busca reconhecimento e coerência, não reprodução cartográfica 1:1.
- O **Centro Comercial Mar de Dentro** é referência canônica para expansão comercial futura do Laranjal, especialmente varejo e serviços.
- Marcas e fachadas reais não serão reproduzidas literalmente sem validação/autorização quando necessária.

### Negócios iniciais

- Pizzaria
- Sorveteria
- Churrascaria
- Lancheria
- Pastelaria
- Peixaria

### Gameplay

- Controle mobile de um dedo.
- Interações operacionais por proximidade.
- O jogador começa executando tarefas manualmente.
- A automação é conquistada por progressão.
- Clientes possuem pelo menos estado de espera/paciência.
- O primeiro negócio usa atendimento de balcão em todas as categorias na V0.1.
- Jogador, clientes e funcionário usam fluxos espaciais separados sempre que necessário para manter legibilidade.
- O negócio cresce fisicamente no mesmo lote por upgrades modulares.

### Progressão

- Começar pequeno é parte fundamental da experiência.
- O jogador evolui de operador para gestor.
- A primeira região termina apresentando a expansão futura por Pelotas.
- A progressão deve ser visualmente perceptível no estabelecimento.
- O primeiro funcionário é um marco narrativo e mecânico da transição para gestão.
- A V0.1 deve ser concluível sem grind artificial prolongado.

### Monetização

- O jogo não será financiado por anúncios invasivos.
- A V0.1 não terá monetização.
- Compras futuras serão opcionais.
- Pay-to-win em rankings competitivos é proibido pelo design atual.
- Compras futuras devem priorizar personalização, cosméticos e conteúdo visual, sem compra direta de superioridade competitiva.

### Representação local

- Pelotas e Laranjal devem ser tratados com respeito e reconhecimento, não como caricatura.
- Regionalismos podem aparecer pontualmente.
- O Laranjal não deve ser reduzido a praia: bairro, comércio e vida cotidiana fazem parte do universo.
- Marcas privadas, eventos e identidades de terceiros exigem validação antes de uso oficial.
- Dados regionais específicos não devem ser inventados.

### Tecnologia

- Unity 6 LTS.
- C#.
- Android como primeira plataforma.
- URP.
- Save local na V0.1.
- Supabase é a preferência inicial para backend futuro, mas não integra a V0.1.
- Arquitetura data-driven para produtos, estações, negócios, diálogos e balanceamento.

## Regras de design

1. Não adicionar sistemas que prejudiquem o core loop antes que ele esteja divertido.
2. Não criar seis códigos de gameplay para seis negócios.
3. Não introduzir multiplayer em tempo real sem necessidade comprovada.
4. Não transformar monetização em requisito de progressão.
5. Não usar arte para esconder um loop ruim.
6. Não aumentar escopo da V0.1 sem remover ou adiar algo equivalente.
7. Não usar dados regionais específicos sem validação quando houver risco de inventar informação.
8. Toda funcionalidade online competitiva futura deve considerar anti-cheat desde o design.
9. A V0.1 deve privilegiar legibilidade, game feel e performance Android acima de fidelidade visual excessiva.
10. Toda grande evolução econômica deve produzir alguma consequência perceptível no mundo ou na operação.

## Alteração de canon

Ao mudar uma decisão oficial:

1. atualizar este documento;
2. atualizar os documentos impactados;
3. registrar a motivação no commit/PR;
4. mover conceitos descartados para backlog ou histórico quando útil.