# Pelotas Tycoon — Visão do Projeto

## Propósito

Pelotas Tycoon é um jogo de gestão 2.5D/cartoon ambientado em Pelotas/RS, concebido para funcionar diretamente no navegador e também no Android a partir da mesma base de código. O jogador começa com um pequeno ponto comercial na Praia do Laranjal e evolui de operador do próprio negócio para gestor de uma rede de empreendimentos pela cidade.

O produto combina a acessibilidade de jogos casual/tycoon com camadas progressivas de gestão inspiradas em simuladores clássicos. A experiência deve ser simples de começar, mas oferecer profundidade crescente em operação, satisfação dos clientes, funcionários, expansão, economia e competição futura entre jogadores.

## Proposta de valor

- Um jogo brasileiro com identidade local real, começando por Pelotas.
- Entrada imediata pelo navegador, reduzindo atrito de instalação nos primeiros testes.
- Android suportado pela mesma aplicação via Capacitor.
- Gameplay mobile de um dedo, direto e acessível.
- Progressão de trabalhador-operador para empresário e gestor.
- Negócios configuráveis a partir de um motor comum de gameplay.
- Zero publicidade durante a experiência.
- Compras opcionais futuras focadas prioritariamente em personalização e conteúdo cosmético.
- Arquitetura preparada para recursos sociais e multiplayer assíncrono no futuro.

## Fantasia central do jogador

> Começar pequeno, construir algo próprio e conquistar espaço na cidade.

## Pilares

1. **Pelotas é parte do gameplay** — a cidade não é apenas plano de fundo.
2. **Começar pequeno** — o jogador participa da operação antes de automatizá-la.
3. **Gestão com consequência** — atendimento, capacidade e satisfação importam.
4. **Progressão visível** — o estabelecimento muda conforme cresce.
5. **Acessibilidade multiplataforma** — web e Android compartilham o mesmo core.
6. **Identidade visual própria** — cartoon 2.5D colorido, amigável e reconhecivelmente pelotense.
7. **Respeito ao jogador** — zero anúncios e ausência de pay-to-win competitivo.
8. **Escalabilidade** — o primeiro ponto é o Laranjal; a arquitetura deve permitir novas regiões, cidades e modos.

## Público inicial

- Jogadores de casual/idle/tycoon em navegador e mobile.
- Pessoas de Pelotas e região atraídas pela identificação com os locais.
- Público brasileiro interessado em jogos de gestão acessíveis.

## Plataformas iniciais

- Navegadores modernos, como primeira superfície de validação e distribuição.
- Android pela mesma base de código usando Capacitor.
- Publicação futura via Google Play após estabilização do vertical slice.
- Mobile-first, com layout responsivo para desktop.

## Modelo comercial futuro

A direção comercial é **free-to-play sem publicidade**, monetizada por compras opcionais dentro do jogo. A progressão principal deve continuar acessível sem pagamento, e dinheiro real não compra superioridade em rankings competitivos.

A V0.1 não terá loja, moeda premium ou compras.

## Escopo da primeira versão jogável

A versão 0.1 terá apenas a Praia do Laranjal e um ponto comercial. A primeira entrega técnica valida um negócio completo; posteriormente o mesmo motor recebe as seis categorias previstas:

- Pizzaria
- Sorveteria
- Churrascaria
- Lancheria
- Pastelaria
- Peixaria

Todos compartilham o mesmo motor de gameplay. A escolha altera produtos, estações, equipamentos, textos, falas, preços-base e identidade visual.

Na V0.1, os preços são parâmetros de configuração do negócio e não são ajustados manualmente pelo jogador.

## Fora do escopo da V0.1

- Outras regiões completas de Pelotas.
- Multiplayer em tempo real.
- Ranking online.
- Login e cloud save.
- Economia compartilhada.
- Publicidade/SDK de ads.
- Compras dentro do jogo.
- Precificação manual pelo jogador.
- Serviço de mesa complexo.
- Trânsito ou mundo aberto completo.

## Filosofia de produção

O projeto deve colocar um loop jogável nas mãos de jogadores cedo. Arte final, mapa completo e sistemas avançados não podem atrasar a validação do core loop.

Pelotas Tycoon não deve ser um jogo de tocar repetidamente na tela até números gigantes aparecerem. Ele deve recompensar operação, observação, decisão, melhoria e planejamento.

**Frase-guia:**

> Pelotas Tycoon é sobre começar pequeno, aprender, trabalhar, administrar e construir algo seu.
