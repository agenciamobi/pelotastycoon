# Pelotas Tycoon — Diálogos Adaptativos da V0.1

## Objetivo

Definir a primeira camada de linguagem adaptativa do jogo.

A escolha do tipo de comércio deve alterar não apenas modelos e produtos, mas também a maneira como clientes se referem ao pedido, à espera, ao estabelecimento e à experiência.

Os exemplos deste documento são copy de protótipo e poderão ser refinados em playtest. O sistema, porém, deve nascer preparado para variações por contexto.

## 1. Princípio

O diálogo não deve conter lógica espalhada do tipo:

`if pizzaria -> frase A`

`if sorveteria -> frase B`

O negócio fornece um conjunto de dados ao sistema de diálogo.

Estrutura conceitual:

```text
DialogueSet
├── greeting[]
├── order[]
├── waitingLow[]
├── waitingMedium[]
├── angry[]
├── happy[]
└── goodbye[]
```

Templates podem receber:

- `{product}`
- `{business}`
- `{category}`

Outras variáveis só devem ser adicionadas quando houver necessidade real.

## 2. Regras de escrita

- uma fala deve ser compreendida rapidamente;
- preferir uma frase por balão;
- evitar parágrafos;
- evitar repetir exatamente a mesma frase em clientes consecutivos;
- não exigir áudio para compreensão;
- regionalismo é tempero, não estrutura;
- falas negativas informam problema operacional;
- falas positivas reforçam recompensa;
- texto nunca substitui feedback visual.

## 3. Pizzaria

### Pedido

- "Uma {product}, por favor."
- "Vou querer {product}."
- "Me vê uma {product}?"
- "Quero {product}."

### Espera leve

- "A pizza já está saindo?"
- "Estou esperando meu pedido."
- "Tomara que não demore muito."

### Espera média

- "Minha pizza está demorando."
- "Ainda falta muito?"
- "A fila travou?"

### Insatisfação

- "Demorou demais."
- "Vou procurar outro lugar."
- "Não vou conseguir esperar."

### Satisfação

- "Essa pizza está muito boa."
- "Valeu a espera."
- "Gostei daqui."
- "Voltaria para comer outra."

## 4. Sorveteria

### Pedido

- "Quero {product}, por favor."
- "Um {product} para mim."
- "Vou querer {product}."
- "Me vê um {product}?"

### Espera leve

- "Que calor..."
- "Meu sorvete já está saindo?"
- "Estou esperando aqui."

### Espera média

- "Está demorando para um sorvete."
- "Ainda falta muito?"
- "A fila não anda."

### Insatisfação

- "Não vou esperar mais."
- "Demorou demais."
- "Vou procurar outro lugar."

### Satisfação

- "Esse sorvete caiu bem."
- "Muito bom."
- "Perfeito para esse calor."
- "Quero voltar aqui."

## 5. Churrascaria

### Pedido

- "Quero {product}."
- "Uma porção de {product}, por favor."
- "Vou querer {product}."
- "Me vê uma porção de {product}?"

### Espera leve

- "Está saindo a carne?"
- "Estou aguardando meu pedido."
- "Tomara que venha logo."

### Espera média

- "Está demorando bastante."
- "Meu pedido ainda não saiu?"
- "A churrasqueira está cheia?"

### Insatisfação

- "Não vou esperar mais."
- "Demorou demais."
- "Vou comer em outro lugar."

### Satisfação

- "Essa carne está muito boa."
- "Gostei bastante."
- "Valeu a espera."
- "Bom atendimento."

## 6. Lancheria

### Pedido

- "Quero {product}."
- "Um {product}, por favor."
- "Me vê um {product}?"
- "Vou querer {product}."

### Espera leve

- "Meu lanche já está saindo?"
- "Estou esperando aqui."
- "Tomara que seja rápido."

### Espera média

- "O lanche está demorando."
- "Ainda falta muito?"
- "A chapa está cheia?"

### Insatisfação

- "Não dá para esperar mais."
- "Demorou demais."
- "Vou procurar outro lanche."

### Satisfação

- "Esse lanche está muito bom."
- "Capricharam nesse."
- "Gostei daqui."
- "Voltaria tranquilo."

## 7. Pastelaria

### Pedido

- "Quero {product}."
- "Um {product}, por favor."
- "Me vê um {product}?"
- "Vou querer {product}."

### Espera leve

- "Meu pastel já está saindo?"
- "Estou esperando meu pedido."
- "Tomara que venha quentinho."

### Espera média

- "Meu pastel está demorando."
- "Ainda não ficou pronto?"
- "A fritadeira está cheia?"

### Insatisfação

- "Demorou demais."
- "Não vou conseguir esperar."
- "Vou procurar outro lugar."

### Satisfação

- "Esse pastel está muito bom."
- "Bem feito esse aqui."
- "Gostei bastante."
- "Vou voltar."

## 8. Peixaria

A linguagem da peixaria exige cuidado porque o formato final do produto ainda depende de pesquisa e definição do modelo de atendimento.

Na V0.1, a fala deve permanecer genérica o suficiente para não contradizer o produto representado.

### Pedido

- "Quero {product}, por favor."
- "Vou levar {product}."
- "Me separa {product}?"
- "Quero uma porção de {product}."

### Espera leve

- "Já estão preparando meu pedido?"
- "Estou aguardando aqui."
- "Tomara que não demore."

### Espera média

- "Meu pedido está demorando."
- "Ainda falta muito?"
- "Está muito cheio hoje?"

### Insatisfação

- "Não vou esperar mais."
- "Demorou demais."
- "Vou procurar outro lugar."

### Satisfação

- "Muito bom."
- "Gostei do atendimento."
- "Está bem preparado."
- "Voltaria aqui."

## 9. Saudações genéricas

Podem ser compartilhadas entre negócios:

- "Boa tarde."
- "Oi."
- "Tudo bem?"
- "Boa noite."

Saudações devem respeitar futuramente o ciclo de horário do jogo quando esse sistema existir.

## 10. Despedidas genéricas

### Positivas

- "Obrigado!"
- "Até a próxima."
- "Valeu!"
- "Volto mais vezes."

### Neutras

- "Até mais."
- "Obrigado."

### Insatisfeitas

- "Vou indo."
- "Não vou esperar mais."
- "Fica para outra hora."

## 11. Regionalismo

Regionalismos podem aparecer com baixa frequência.

Exemplos possíveis:

- "Bah, gostei daqui."
- "Tá puxado, hein?"
- "Caprichado esse."

Não adicionar regionalismo em todas as falas.

A frequência deve ser parametrizável ou controlada pela seleção aleatória de frases.

## 12. Seleção de fala

O sistema deve evitar repetição imediata.

Regra mínima:

- armazenar última frase usada por categoria/contexto;
- ao escolher nova frase, evitar a mesma se houver outra opção disponível.

Futuro:

- pesos por arquétipo;
- horário;
- região;
- reputação;
- preço;
- tempo de espera;
- clima;
- evento.

## 13. Relação com paciência

Sugestão de faixas conceituais:

### Paciência alta

Sem reclamação ou fala neutra.

### Paciência intermediária

Usar `waitingLow`.

### Paciência baixa

Usar `waitingMedium`.

### Paciência zerada

Usar `angry` e abandonar.

Os limiares serão definidos no balanceamento.

## 14. Relação com satisfação

Após atendimento dentro de condições positivas:

- chance de fala `happy`;
- reação visual positiva;
- saída normal.

Não exigir uma fala a cada venda. Excesso de balões cria ruído visual.

## 15. Tutorial e diálogo

O sistema de diálogo de clientes não deve ser usado para ensinar controles.

Clientes comunicam consequências.

Exemplo:

> "Está demorando..."

ensina indiretamente que existe pressão de tempo.

Prompts de sistema ensinam apenas ações indispensáveis.

## 16. Critério de aceite

A camada adaptativa está funcionando quando, ao reiniciar o jogo e escolher outro negócio:

- produtos mudam;
- nomes das estações mudam;
- pedidos mudam;
- falas de espera fazem sentido;
- elogios fazem sentido;
- nenhum texto menciona produto pertencente ao negócio anterior.

Esse teste deve fazer parte da validação da V0.1.