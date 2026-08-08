# Pelotas Tycoon — Marcos Visuais da Orla do Laranjal

## Objetivo

Registrar os elementos visuais reais da orla enviados como referência e definir quais deles devem orientar a modelagem da V0.1.

As imagens de referência não são incorporadas automaticamente ao repositório. Antes de publicar fotografias de terceiros como assets do projeto, deve-se validar autoria, licença e permissão de uso. Este documento registra apenas observações de design derivadas das referências.

## 1. Calçadão arborizado

As referências mostram um corredor de caminhada pavimentado, com árvores maduras em sequência criando sombra e forte perspectiva visual.

Características relevantes:

- piso modular/intertravado;
- árvores dos dois lados ou acompanhando grande parte do percurso;
- copas formando um corredor visual;
- bancos e mobiliário urbano distribuídos lateralmente;
- fluxo misto de caminhada, corrida e passeio;
- relação muito próxima com a praia.

### Decisão para a V0.1

O calçadão deixa de ser apenas uma faixa abstrata de spawn de NPCs e passa a ser um dos principais elementos de identidade do cenário.

Deve aparecer com:

- largura suficiente para fluxo de NPCs;
- pavimentação reconhecível;
- arborização ritmada;
- sombras leves;
- pedestres de passagem que não são necessariamente clientes.

## 2. Relação calçadão, estacionamento e praia

Uma das referências mostra claramente:

- veículos estacionados no lado urbano;
- calçadão no centro;
- faixa de grama/árvores;
- areia e Lagoa do lado oposto.

Essa leitura espacial é extremamente útil para o level design.

### Estrutura canônica simplificada

```text
LADO URBANO / RUA
        ↓
ESTACIONAMENTO / ÁRVORES
        ↓
CALÇADÃO
        ↓
GRAMADO / TRANSIÇÃO
        ↓
AREIA
        ↓
LAGOA DOS PATOS
```

A V0.1 pode comprimir distâncias, mas deve preservar essa lógica visual.

## 3. Letreiro “Laranjal”

As referências mostram um grande letreiro colorido tridimensional com o nome **Laranjal**, implantado junto à orla e à praia.

### Valor de reconhecimento

Esse tipo de marco possui grande capacidade de localizar visualmente o jogador.

### Uso recomendado

O jogo deve possuir um **marco tipográfico inspirado na presença do letreiro da orla**, preferencialmente visível em um ponto secundário do cenário ou durante a abertura.

Antes de reproduzir exatamente desenho, padrões, cores, tipografia e composição do letreiro real, validar autoria e eventual proteção da obra visual.

A solução segura para a V0.1 é:

- usar o nome `Laranjal`;
- criar interpretação 3D própria;
- não copiar obrigatoriamente todos os grafismos existentes no objeto real.

## 4. Deck/piso de madeira na orla

As imagens do letreiro mostram uma área com piso de madeira/deck próxima à areia.

### Aplicação

Pode ser usado como:

- pequena praça visual;
- área de passagem;
- ponto de contemplação;
- transição entre calçadão e praia;
- local para marco visual do Laranjal.

Não precisa ser uma área operacional do comércio na V0.1.

## 5. Praia esportiva

As referências mostram postes/redes e uso da areia para atividades esportivas.

### Aplicação na V0.1

Adicionar em segundo plano uma pequena área esportiva simplificada pode aumentar muito o reconhecimento e a sensação de vida sem exigir novo sistema de gameplay.

Elementos possíveis:

- postes;
- rede;
- poucos NPCs decorativos;
- bola como prop;
- animações simples ou estáticas no primeiro protótipo.

### Regra de escopo

Esporte é ambientação, não mecânica jogável da V0.1.

## 6. Bancos e mobiliário urbano

As referências apresentam bancos orientados para a orla e outros elementos de permanência.

### Aplicação

Usar bancos como:

- props de ambientação;
- pontos de idle para NPCs decorativos no futuro;
- elemento de escala e profundidade.

Na V0.1, não precisam possuir interação.

## 7. Árvores sazonais

As imagens mostram a orla em momentos distintos, com variação significativa de folhas nas árvores.

Isso confirma que o Laranjal não deve ser pensado apenas como verão tropical permanente.

### Decisão

A V0.1 continua usando atmosfera clara e convidativa para facilitar leitura e posicionamento do produto, mas a arquitetura de assets deve permitir futuramente:

- verão;
- outono/inverno;
- árvores com diferentes densidades de folhas;
- variação climática e sazonal.

Não implementar sistema de estações na V0.1.

## 8. Vida cotidiana

As imagens mostram pessoas:

- caminhando;
- correndo;
- passeando com cachorro;
- circulando em grupo;
- usando a praia;
- praticando atividades na areia.

### Consequência para NPCs ambientais

O cenário não pode conter somente clientes do comércio.

Devem existir dois conceitos separados:

### `AmbientPedestrian`
NPC que circula pelo mundo para dar vida ao Laranjal.

### `Customer`
NPC que decide entrar no estabelecimento e participa do core loop econômico.

Na V0.1, ambos podem compartilhar modelos e animações, mas devem possuir comportamentos distintos.

## 9. Elemento escultórico/personagem da orla

Uma das referências apresenta uma escultura/personagem laranja próxima ao letreiro.

Ela é útil como evidência de que a orla possui elementos lúdicos e fotográficos, mas **não deve ser reproduzida automaticamente no jogo** sem confirmar autoria, identidade e direitos associados.

### Decisão

- não entra como asset obrigatório da V0.1;
- pode inspirar a ideia futura de esculturas, mascotes ou pontos fotográficos próprios do universo do jogo;
- qualquer reprodução específica exige validação.

## 10. Pier/estrutura sobre a água

Nas referências do letreiro é possível perceber uma estrutura avançando sobre a Lagoa ao fundo.

### Uso visual

Mesmo que simplificada ou distante, uma estrutura linear sobre a água pode ajudar a quebrar o horizonte e reforçar a paisagem urbana da praia.

Não deve competir visualmente com o estabelecimento.

## 11. Hierarquia de marcos para a V0.1

### Obrigatórios

1. Lagoa dos Patos e horizonte amplo.
2. Faixa de areia.
3. Calçadão arborizado pavimentado.
4. Rua/estacionamento sugerindo bairro habitado.
5. Árvores e bancos/mobiliário urbano.
6. Fluxo de pedestres ambientais.

### Fortemente recomendados

7. Interpretação própria de um letreiro `Laranjal`.
8. Pequena área de deck/madeira.
9. Área esportiva simplificada na areia.

### Opcionais no primeiro APK

10. Pier/estrutura distante.
11. NPCs com cachorro.
12. corredores/ciclistas especializados.
13. esculturas e elementos artísticos específicos.

## 12. Composição sugerida

```text
                 LAGOA DOS PATOS
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            [pier/estrutura distante]

                 FAIXA DE AREIA
        [esporte]             [banhistas]

             [deck / marco Laranjal]

================================================
             CALÇADÃO ARBORIZADO
 pedestre → corredor → passeio → cliente →
================================================

 árvores / bancos / estacionamento / rua

        ┌────────────────────────────┐
        │       PRIMEIRO NEGÓCIO     │
        └────────────────────────────┘
```

A composição final depende do enquadramento da câmera e do protótipo de movimentação. A relação espacial é mais importante que a escala real.

## 13. Critério de reconhecimento

Ao concluir o primeiro passe visual do cenário, realizar um teste simples com pessoas que conheçam Pelotas/Laranjal:

> “Sem olhar o título do jogo, que lugar isso te lembra?”

O objetivo não é exigir 100% de identificação, mas verificar se a combinação de:

- Lagoa;
- praia;
- calçadão arborizado;
- mobiliário;
- marco `Laranjal`;
- urbanização lateral

é suficiente para gerar reconhecimento espontâneo.

## 14. Canon resultante

A partir destas referências, a identidade visual da V0.1 passa a depender não apenas de “praia + água”, mas especificamente da combinação:

**Lagoa dos Patos + areia + calçadão arborizado + vida cotidiana + marco Laranjal + bairro urbano ao redor.**

Essa composição deverá orientar o primeiro blockout ambiental assim que a implementação Unity começar.