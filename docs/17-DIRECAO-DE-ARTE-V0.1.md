# Pelotas Tycoon — Direção de Arte da V0.1

## Objetivo

Definir uma linguagem visual própria, colorida e acessível, capaz de representar Pelotas de forma reconhecível sem depender de fotorealismo ou produção 3D pesada.

## 1. Direção geral

- 2.5D/cartoon estilizado;
- composição isométrica/3/4 como direção principal do mapa;
- cores vivas e acolhedoras;
- formas simples e reconhecíveis;
- proporções levemente exageradas quando ajudarem a legibilidade;
- leitura clara em tela pequena;
- cenário inspirado em referências reais de Pelotas sem cópia fotogramétrica;
- mobile-first, funcionando também no desktop.

Referência conceitual:

**tycoon casual isométrico colorido + identidade litorânea brasileira + Pelotas reconhecível**.

A meta é alcançar o nível de clareza e acabamento dos melhores tycoons casuais mobile sem reproduzir identidade, layout, marcas, objetos proprietários ou composição específica de outro jogo.

## 2. Linguagem de câmera

A câmera operacional deve parecer uma miniatura urbana viva vista em 3/4:

- sensação isométrica consistente;
- visão suficiente do entorno para contextualizar o Laranjal;
- objetos com topo e laterais visíveis;
- sombras suaves abaixo de personagens, carros e equipamentos;
- depth sorting por eixo Y para reforçar sobreposição natural;
- zoom fixo ou muito limitado na V0.1;
- evitar perspectiva fotográfica profunda que prejudique leitura de toque.

A tela portrait deve usar a profundidade vertical como vantagem: horizonte/orla na parte superior, fluxo urbano no meio e operação do negócio na área inferior.

## 3. O que deve comunicar Laranjal

A V0.1 deve transmitir a região por conjunto de elementos:

- Lagoa dos Patos;
- faixa de areia/orla;
- calçadão;
- vegetação;
- Trapiche atual pós-enchente de 2024, sem a segunda casinha da configuração antiga;
- postes e mobiliário urbano estilizados;
- circulação de pedestres;
- bicicletas como ambientação;
- avenida com veículos estilizados;
- horizonte amplo;
- luz de verão/fim de tarde;
- sinalização contextual de Praia do Laranjal/Pelotas.

O Trapiche funciona como landmark visual mesmo quando não participa da mecânica imediata.

## 4. Marcos de Pelotas para expansão visual

A identidade do jogo pode incorporar progressivamente interpretações cartoon de pontos reconhecíveis já definidos no projeto, entre eles:

- Chafariz das Nereidas;
- quindim e tradição doceira de Pelotas;
- topo/cúpula do Grande Hotel;
- torre e relógio do Mercado Central;
- Museu da Baronesa;
- Trapiche do Laranjal.

Esses elementos não precisam aparecer todos na V0.1 do mapa do Laranjal; formam um vocabulário visual para identidade, telas, mapa da cidade e regiões futuras.

## 5. Paleta e acabamento

A arte deve evitar aparência de graybox mesmo quando for procedural.

Regras:

- saturação moderada/alta;
- contraste forte entre chão, estações, personagens e UI;
- sombras macias, curtas e consistentes;
- bordas claras em objetos interativos quando necessário;
- luz e sombra usadas para sugerir volume, não realismo físico;
- materiais simples: madeira, vidro, metal, concreto e tecido representados por blocos de cor e poucos highlights;
- nenhuma textura pesada obrigatória para transmitir qualidade.

## 6. Não buscar fotorealismo

Evitar:

- texturas 4K desnecessárias no gameplay;
- filtros pesados;
- reprodução arquitetônica milimétrica;
- excesso de objetos pequenos;
- efeitos sem valor de gameplay;
- assets que aumentem o download sem benefício perceptível.

Prioridade:

**reconhecimento + performance + cor + personalidade**.

## 7. Estabelecimento

O mesmo volume-base pode receber kits diferentes por negócio. Cada kit altera fachada, placa, paleta, estações, balcão, props e produtos visuais.

O estabelecimento deve parecer um pequeno diorama operacional:

- fachada com topo e duas faces legíveis;
- placa grande o suficiente para ser lida em mobile;
- estações posicionadas como objetos físicos, não botões no chão;
- fluxo espacial evidente entre insumos → preparo → balcão → caixa;
- zona de upgrade integrada ao mundo.

## 8. Produtos

Produtos precisam ser reconhecíveis rapidamente no ângulo isométrico.

Regras:

- silhueta clara;
- escala levemente ampliada quando necessário;
- cores diferenciadas;
- poucos detalhes microscópicos;
- ícones 2D coerentes com os objetos do mundo;
- item carregado pelo personagem precisa ser imediatamente identificável.

## 9. Personagens

Personagens cartoon modulares para reduzir custo e aumentar diversidade.

Variações por cabelo, roupa, acessórios, tons de pele e pequenas diferenças de corpo/altura. As animações priorizam caminhada, idle, carregar item, produzir/interagir, receber pedido e reações.

Proporções devem favorecer leitura casual: cabeça e mãos ligeiramente maiores, pernas curtas e silhueta simples.

## 10. Veículos e cidade viva

Veículos são ambientação e escala urbana, não simulação veicular.

- carros compactos e estilizados;
- formas arredondadas;
- cores vivas;
- movimento lento e previsível;
- poucos veículos simultâneos;
- nenhuma colisão complexa na V0.1.

O movimento de fundo serve para comunicar que o negócio faz parte de uma cidade ativa.

## 11. Água, céu e luz

A Lagoa é parte central da identidade visual. Usar animação leve, reflexos estilizados e movimento simples. O céu e a iluminação reforçam atmosfera sem custo excessivo de renderização.

## 12. Feedback e game feel

Efeitos reforçam:

- produção concluída;
- produto coletado;
- pedido entregue;
- dinheiro recebido;
- upgrade comprado;
- cliente satisfeito;
- cliente impaciente/abandono;
- novo produto;
- funcionário contratado;
- marcos concluídos.

O feedback deve durar pouco e desaparecer sozinho. Evitar poluição visual constante.

## 13. UI visual

A UI deve combinar com o mundo cartoon:

- cantos amigáveis;
- tipografia muito legível;
- iconografia simples;
- cores vivas com contraste;
- hierarquia forte;
- áreas de toque confortáveis;
- objetivo contextual temporário;
- identidade própria do Pelotas Tycoon, sem transformar a marca MOBI em skin do jogo.

## 14. Assets e licenças

Assets prontos podem ser usados quando licenciados corretamente. Registrar origem, licença, comprovante quando houver e restrições de redistribuição. O repositório público não deve conter material cuja licença proíba redistribuição.

Referências visuais externas servem para estudar linguagem de câmera, acabamento e legibilidade; não devem ser copiadas literalmente.

## 15. Placeholders

O graybox pode usar formas Phaser, sprites provisórios e arte temporária. Nunca atrasar validação do loop aguardando arte final.

A partir do vertical slice visual, formas Phaser podem continuar sendo utilizadas desde que respeitem volume, perspectiva, sombra, hierarquia e leitura cartoon.

## 16. Meta visual da V0.1

A primeira versão pública não precisa parecer final, mas deve transmitir claramente:

- Laranjal/orla;
- comércio;
- clientes;
- operação;
- dinheiro/progressão;
- charme cartoon;
- sensação isométrica/3D leve;
- identidade local.

A captura de tela deve parecer um jogo casual em desenvolvimento, não uma interface de debug.

## 17. Critério de aceite

Uma captura de tela deve permitir identificar que existe um comércio ativo, clientes, uma área de orla e elementos suficientes para reconhecer que o jogo possui uma identidade própria de Pelotas/Laranjal.

Em mobile, o jogador deve entender sem legenda externa:

1. onde está o personagem;
2. quem está esperando atendimento;
3. qual estação é o próximo destino;
4. onde o produto está sendo preparado;
5. onde entregar;
6. onde receber o pagamento;
7. qual parte é ambientação e qual parte é interativa.
