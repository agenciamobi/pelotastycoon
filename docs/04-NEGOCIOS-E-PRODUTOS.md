# Pelotas Tycoon — Negócios e Produtos

## Princípio

Os negócios da V0.1 não são sistemas separados. Todos usam o mesmo motor operacional e recebem configurações específicas de dados, arte e linguagem.

## Estrutura comum

Cada negócio define:

- identificador;
- nome;
- categoria;
- fachada/tema;
- conjunto de produtos;
- estações;
- equipamentos;
- custos e preços-base;
- tempos de produção;
- capacidade;
- frases de clientes;
- upgrades temáticos;
- parâmetros de demanda.

## 1. Pizzaria

### Produtos iniciais

- Pizza de queijo
- Pizza de calabresa
- Pizza de frango

### Fluxo

Ingredientes → Forno → Pizza → Balcão → Cliente

### Identidade de gameplay

- produção relativamente lenta;
- ticket médio/alto;
- boa recompensa por capacidade e automação.

## 2. Sorveteria

### Produtos iniciais

- Sorvete de chocolate
- Sorvete de morango
- Sorvete de creme

### Fluxo

Insumos → Preparo/Freezer → Sorvete → Balcão → Cliente

### Identidade de gameplay

- produção rápida;
- ticket baixo;
- alta demanda em períodos quentes;
- forte relação futura com clima e verão.

## 3. Churrascaria

### Produtos iniciais

- Carne
- Frango
- Linguiça

### Fluxo

Carne crua → Churrasqueira → Porção pronta → Balcão → Cliente

### Identidade de gameplay

- produção mais lenta;
- ticket alto;
- maior valor por atendimento.

### Restrição V0.1

Atendimento de balcão. Buffet e serviço de mesa são sistemas futuros.

## 4. Lancheria

### Produtos iniciais

- Hambúrguer
- Cachorro-quente
- Xis

### Fluxo

Ingredientes → Chapa → Lanche → Balcão → Cliente

### Identidade de gameplay

- produção média;
- ticket médio;
- ritmo equilibrado.

## 5. Pastelaria

### Produtos iniciais

- Pastel de carne
- Pastel de queijo
- Pastel de frango

### Fluxo

Ingredientes → Fritadeira → Pastel → Balcão → Cliente

### Identidade de gameplay

- produção média;
- demanda alta;
- boa capacidade por estação.

## 6. Peixaria

### Produtos iniciais

Os produtos finais devem ser definidos após pesquisa regional de disponibilidade e representação adequada. Não inventar espécies locais sem validação.

### Fluxo base

Pescado → Preparação → Produto pronto → Expositor/Balcão → Cliente

### Identidade de gameplay

- categoria diferenciada;
- forte potencial de relação futura com Z3, pesca e fornecedores;
- operação simplificada na V0.1.

## Sistema de diálogo adaptável

As frases devem usar conjuntos por contexto:

- greeting;
- order;
- waiting;
- happy;
- angry;
- goodbye.

Templates podem receber variáveis, por exemplo:

`Quero {product}, por favor.`

O mesmo template pode gerar pedidos coerentes para diferentes negócios.

## Regra de dados

Nenhuma regra central de gameplay deve depender diretamente de um nome como `Pizza` ou `Pastel`. O motor deve operar com definições genéricas de produto, estação e pedido.

## Evolução futura

Novos tipos de negócio devem poder ser adicionados majoritariamente por dados e assets, evitando duplicação do código-base.
