# Pelotas Tycoon — UX/UI da V0.1

## Objetivo

Definir princípios de experiência e interface para o primeiro APK Android.

A interface deve desaparecer quando não for necessária. O foco visual é o negócio, os clientes e o personagem, não menus permanentes.

## 1. Princípios

- mobile-first;
- controle principal com um dedo;
- pouca interface simultânea;
- leitura rápida;
- feedback visual antes de texto;
- ações importantes próximas às zonas confortáveis do polegar;
- respeito a safe areas e recortes de tela;
- nenhuma mecânica escondida atrás de menus complexos;
- sem dark patterns;
- sem anúncios ou botões de anúncio.

## 2. Orientação

A V0.1 deve priorizar uma orientação única definida durante o protótipo, evitando manter layouts completos para portrait e landscape simultaneamente.

A escolha deve considerar:

- visibilidade do estabelecimento;
- conforto do joystick;
- leitura de filas;
- área útil para HUD;
- referência do gênero.

A orientação definitiva é decisão de protótipo e playtest.

## 3. Tela inicial

Elementos mínimos:

- logo/título Pelotas Tycoon;
- botão Jogar/Continuar;
- Configurações;
- versão do build em área discreta durante testes.

Primeira execução:

- `Jogar` inicia abertura e seleção de negócio.

Save existente:

- `Continuar` carrega o negócio salvo.

## 4. Seleção de negócio

Título:

> **O que você vai construir aqui?**

Cada opção deve mostrar:

- nome;
- ícone;
- preview simples;
- característica operacional curta.

Opções:

- Pizzaria;
- Sorveteria;
- Churrascaria;
- Lancheria;
- Pastelaria;
- Peixaria.

Não apresentar planilhas de atributos na primeira escolha.

## 5. HUD de gameplay

Elementos mínimos:

### Caixa

- valor atual;
- feedback visual ao receber dinheiro.

### Objetivo contextual

- aparece apenas quando necessário;
- some após conclusão.

### Joystick

- região inferior confortável;
- transparência suficiente para não bloquear cenário;
- área de toque maior que a representação visual.

### Configurações/Pausa

- acesso discreto;
- não disputar atenção com gameplay.

## 6. Pedido do cliente

O pedido deve ser compreensível por:

- ícone/imagem do produto;
- nome curto;
- balão contextual.

O jogador não deve depender de ler textos longos.

## 7. Paciência

Feedback progressivo:

- estado normal;
- alerta intermediário;
- estado crítico.

Combinar expressão/reação visual com indicador simples.

Evitar barra permanente sobre todos os NPCs quando não houver necessidade.

## 8. Estações interativas

Ao entrar na área:

- destaque sutil;
- indicador de progresso quando existir produção;
- feedback de transferência de item.

Evitar botão `Produzir` na V0.1.

## 9. Upgrades

A compra deve ser física/contextual quando possível.

Área de upgrade:

- custo claramente legível;
- nome curto;
- estado bloqueado/disponível;
- progresso de pagamento se a mecânica consumir dinheiro gradualmente.

Após compra:

- transformação visual;
- som;
- partícula curta;
- benefício resumido.

## 10. Primeiro funcionário

A contratação precisa ser um marco.

A interface deve deixar claro:

- custo;
- função que será automatizada;
- confirmação visual de que o funcionário começou a trabalhar.

Não abrir tela complexa de RH na V0.1.

## 11. Mapa de Pelotas

A primeira abertura do mapa acontece como recompensa narrativa.

Deve mostrar:

- Laranjal ativo;
- regiões futuras;
- bloqueios legíveis;
- sensação de escala da jornada.

A V0.1 pode usar um mapa estilizado simples sem navegação geográfica real.

## 12. Configurações

V0.1:

- volume de música;
- volume de efeitos;
- vibração/haptics quando implementado;
- qualidade gráfica se necessária;
- resetar progresso em build de teste;
- sair/voltar.

Reset deve exigir confirmação para evitar perda acidental.

## 13. Acessibilidade mínima

- contraste suficiente;
- textos legíveis em telas pequenas;
- não comunicar estados apenas por cor;
- áreas de toque confortáveis;
- opções de áudio separadas;
- evitar flashes intensos;
- feedback visual para eventos que possuem som.

## 14. Localização

Arquitetura de textos deve evitar strings espalhadas no código.

Mesmo que a V0.1 seja somente pt-BR, preparar chaves de localização permite futuras versões em:

- espanhol;
- inglês.

A cidade e nomes próprios permanecem conforme identidade local.

## 15. Sem monetização na V0.1

A primeira versão de teste não deve possuir:

- loja premium;
- pop-ups de compra;
- moeda premium;
- anúncios;
- ofertas temporizadas.

Primeiro validar diversão e retenção básica do loop.

## 16. Critério de aceite

Um usuário que nunca viu o projeto deve conseguir:

- iniciar;
- escolher o negócio;
- mover-se;
- entender o pedido;
- preparar;
- entregar;
- coletar dinheiro;
- comprar upgrade;
- contratar funcionário;
- fechar e continuar;

sem instrução presencial do desenvolvedor.