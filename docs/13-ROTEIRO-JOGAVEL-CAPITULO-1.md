# Pelotas Tycoon — Roteiro Jogável do Capítulo 1

## Status

Documento de pré-produção da V0.1.

Este documento transforma o Capítulo 1 — **O Primeiro Negócio** — em uma sequência jogável. Ele define ritmo, objetivos, tutorial contextual, acontecimentos narrativos e o momento em que o jogador deixa de ser apenas operador e começa a se perceber como gestor.

## 1. Objetivo do capítulo

O Capítulo 1 deve fazer o jogador sentir, nesta ordem:

1. **pertencimento** — estou no Laranjal, em Pelotas;
2. **possibilidade** — este pequeno ponto pode se tornar algo meu;
3. **autoria** — eu escolho que negócio abrir;
4. **trabalho** — no início, tudo depende de mim;
5. **recompensa** — cada venda produz progresso visível;
6. **pressão** — mais clientes criam novos problemas;
7. **decisão** — preciso investir onde o gargalo está;
8. **alívio** — o primeiro funcionário muda a operação;
9. **gestão** — começo a observar o negócio em vez de executar tudo;
10. **ambição** — o Laranjal é apenas o primeiro passo em Pelotas.

O capítulo não deve parecer um tutorial separado do jogo. O tutorial é a própria primeira jornada empresarial.

## 2. Eixo temático

O Capítulo 1 é sobre:

**recomeço → iniciativa → trabalho → aprendizado → crescimento**.

O jogo não determina por que o jogador chegou àquele momento da vida. Não há tragédia obrigatória, herança ou biografia fixa. A narrativa apenas estabelece que existe uma pequena oportunidade e que o jogador decidiu aproveitá-la.

A história pessoal é preenchida pelo próprio jogador.

## 3. Duração-alvo

Para a primeira experiência de teste:

- primeiros 30 segundos: identidade e escolha;
- primeira venda: até aproximadamente 2 minutos;
- primeiro upgrade significativo: nos primeiros minutos;
- primeiro funcionário: ainda na primeira sessão;
- conclusão do arco inicial do ponto: alcançável em uma sessão curta/média de teste.

Os números exatos serão definidos por playtest. O documento define ordem e intenção, não balanceamento final.

## 4. Sequência de abertura

### Beat 0 — Pelotas

**Estado:** jogo recém-iniciado.

1. Tela escura.
2. Som de água, vento e pássaros.
3. Texto central:

> **PELOTAS**
> Rio Grande do Sul

4. A imagem surge gradualmente.
5. A câmera revela uma interpretação 3D estilizada da Praia do Laranjal.
6. Lagoa dos Patos visível.
7. Movimento leve de pessoas no entorno.
8. A câmera aproxima-se de um pequeno ponto comercial simples.
9. O personagem do jogador está diante do imóvel.

Texto:

> **Todo grande negócio começa pequeno.**

Pausa curta.

> **Este é o seu.**

A câmera assume a perspectiva normal de gameplay.

### Regra

Não usar exposição longa, locução obrigatória ou cutscene que impeça o jogador de começar rapidamente.

## 5. A escolha do primeiro negócio

A primeira decisão relevante acontece imediatamente.

Título:

> **O que você vai construir aqui?**

Opções da V0.1:

- Pizzaria
- Sorveteria
- Churrascaria
- Lancheria
- Pastelaria
- Peixaria

Cada opção deve apresentar uma prévia visual simples do ponto transformado e uma indicação curta do estilo operacional.

Exemplo conceitual:

### Sorveteria

- preparo rápido;
- alto giro;
- produtos refrescantes;
- identidade visual leve.

### Pizzaria

- preparo mais demorado;
- ticket maior;
- necessidade de organizar produção.

### Pastelaria

- ritmo intermediário;
- forte giro de balcão;
- produção rápida quando organizada.

As diferenças exatas serão calibradas posteriormente.

### Confirmação

Ao selecionar:

> **Abrir [TIPO DE NEGÓCIO]?**

A confirmação deve mostrar que a escolha define o negócio inicial daquele save.

Durante desenvolvimento, o reset de progresso permite testar outra opção.

## 6. Transformação inicial do ponto

Após a escolha:

1. fachada recebe identidade básica correspondente;
2. estação inicial aparece;
3. balcão aparece;
4. primeiro produto é habilitado;
5. UI mínima mostra caixa atual;
6. o controle do personagem é liberado.

A transformação deve ser rápida e visualmente satisfatória, mesmo usando assets provisórios.

Não começar o jogo com várias estações, menus ou produtos.

## 7. Beat 1 — Aprender a se mover

O jogador recebe apenas a orientação indispensável.

Prompt contextual:

> **Mova-se pelo estabelecimento.**

Joystick virtual aparece.

Quando o jogador se movimenta por distância suficiente, o prompt desaparece permanentemente.

Nenhum texto deve explicar joystick, eixo ou controles além do necessário.

## 8. Beat 2 — O primeiro cliente

Um cliente aparece do lado externo e caminha até o balcão.

O jogador deve perceber visualmente a chegada antes de receber uma instrução.

Ao chegar:

- cliente entra em estado `ORDERING`;
- balão mostra pedido adaptado ao negócio;
- o produto solicitado é sempre o primeiro produto disponível.

Exemplos:

### Pizzaria

> "Uma pizza de queijo, por favor."

### Sorveteria

> "Quero um sorvete de chocolate."

### Churrascaria

> "Quero uma porção de carne."

### Lancheria

> "Um xis, por favor."

### Pastelaria

> "Um pastel de carne, por favor."

### Peixaria

> "Vou levar uma porção de pescado."

A redação definitiva depende da lista final de produtos.

## 9. Beat 3 — Primeira produção

Depois do pedido, a estação necessária recebe destaque visual discreto.

Prompt:

> **Prepare o pedido.**

O jogador aproxima-se da estação.

A interação ocorre automaticamente por proximidade.

Feedback mínimo:

- barra/indicador de produção;
- animação simples;
- áudio curto;
- produto visualmente disponível ao concluir.

Ao concluir, o jogador recebe o produto em sua capacidade de transporte.

## 10. Beat 4 — Primeira entrega

O balcão recebe destaque visual.

Prompt:

> **Leve o pedido ao balcão.**

Ao entrar na área do balcão:

- produto é transferido;
- cliente recebe;
- reação positiva;
- cliente paga.

O dinheiro deve aparecer fisicamente/visualmente.

Este é o primeiro momento de recompensa forte.

## 11. Beat 5 — O primeiro dinheiro

O jogador vê o dinheiro antes de receber instrução.

Ao se aproximar:

- dinheiro é coletado;
- som de caixa/moeda;
- animação em direção ao contador de caixa;
- valor aumenta.

Mensagem curta:

> **Primeira venda!**

Evitar pop-up que pause o jogo por muito tempo.

## 12. Beat 6 — Repetição sem instrução

O segundo cliente chega.

Nenhum tutorial repete o processo inteiro.

Objetivo: verificar se o jogador aprendeu o loop:

**pedido → produção → balcão → pagamento → coleta**.

Se o jogador ficar parado por tempo excessivo, dicas contextuais podem reaparecer de maneira não intrusiva.

## 13. Beat 7 — Começa a pressão

Depois de algumas vendas, o jogo aumenta gradualmente o fluxo.

Agora o jogador percebe um problema real:

- há mais de um cliente;
- existe espera;
- a produção possui capacidade limitada;
- clientes começam a perder paciência.

O objetivo não é punir. É criar a necessidade do primeiro investimento.

Uma reação possível:

> "Está demorando..."

O indicador de paciência passa a ter significado prático.

## 14. Beat 8 — Primeiro upgrade

Uma área de upgrade torna-se acessível quando o jogador possui recursos suficientes.

O upgrade inicial deve atacar um gargalo percebido pelo jogador.

Possibilidades:

- produção mais rápida;
- capacidade maior;
- balcão com mais espaço.

A compra deve gerar transformação física perceptível.

Feedback:

- construção/transformação;
- partículas simples;
- áudio positivo;
- nova estatística brevemente apresentada.

Mensagem:

> **Seu negócio está crescendo.**

## 15. Beat 9 — Primeiro novo produto

Após estabilizar a operação inicial, um segundo produto pode ser desbloqueado.

O objetivo narrativo é mostrar que crescimento também significa complexidade.

Exemplos provisórios:

- Pizzaria: queijo → calabresa;
- Sorveteria: chocolate → morango;
- Churrascaria: carne → linguiça;
- Lancheria: xis → cachorro-quente;
- Pastelaria: carne → queijo;
- Peixaria: primeiro pescado → segunda opção preparada.

A lista definitiva pertence ao documento de negócios/produtos.

## 16. Beat 10 — O gargalo humano

O fluxo aumenta novamente.

Mesmo com equipamento melhor, o jogador continua fazendo tudo sozinho.

Essa é a preparação narrativa para o primeiro funcionário.

O jogo deve permitir que o jogador perceba:

> "Eu não consigo estar em dois lugares ao mesmo tempo."

Só então a contratação é apresentada.

## 17. Beat 11 — Primeiro funcionário

Área/opção:

> **Contratar funcionário**

Ao comprar:

1. funcionário aparece no ponto;
2. recebe uma função operacional simples;
3. começa a executar automaticamente parte do fluxo;
4. o jogador percebe imediatamente a redução da carga manual.

Mensagem curta:

> **Agora você não precisa fazer tudo sozinho.**

Este é um dos principais momentos do Capítulo 1.

Ele representa a transição narrativa:

**operador → gestor iniciante**.

## 18. Beat 12 — Aprender a observar

Após a contratação, o jogo reduz temporariamente a pressão de instruções.

O jogador deve poder:

- acompanhar o funcionário;
- perceber filas;
- identificar dinheiro acumulado;
- decidir onde investir;
- continuar ajudando manualmente se desejar.

O jogo começa a ensinar gestão sem abrir uma planilha.

## 19. Beat 13 — Consolidação do ponto

A reta final da V0.1 envolve atingir marcos combinados, por exemplo:

- quantidade mínima de upgrades;
- funcionário contratado;
- fluxo sustentável;
- determinado volume de vendas;
- nível/reputação mínima simplificada.

Os requisitos numéricos serão calibrados em playtest.

Visualmente, o estabelecimento deve estar claramente mais desenvolvido do que no início.

O antes/depois é parte da recompensa.

## 20. Conclusão do arco inicial

Quando o marco de consolidação é alcançado:

- fluxo continua funcionando;
- câmera pode se afastar levemente;
- o jogador vê clientes sendo atendidos no negócio que construiu.

Mensagem:

> **Seu negócio começou a chamar atenção pela cidade.**

Em seguida:

> **Mas Pelotas é muito maior do que este ponto.**

Transição para o mapa da cidade.

## 21. A primeira revelação do mapa de Pelotas

Esta deve ser uma recompensa narrativa, não apenas uma tela de seleção.

O mapa mostra:

- Praia do Laranjal — ativa/concluída no arco inicial;
- outras regiões como futuras oportunidades;
- algumas áreas bloqueadas;
- nenhuma obrigação de implementar essas regiões na V0.1.

Exemplo conceitual:

- Praia do Laranjal — seu primeiro negócio;
- Centro — bloqueado;
- Mercado Público — bloqueado;
- Porto — bloqueado;
- Z3 — bloqueado;
- evento/feira futura — bloqueado.

Nomes de marcas privadas ou eventos protegidos permanecem sujeitos a autorização antes do uso comercial definitivo.

Mensagem final da V0.1:

> **Isto é só o começo.**

A câmera/tela retorna ao negócio para permitir continuar jogando.

Não existe `Game Over` nem encerramento obrigatório.

## 22. Tutorial invisível

Regra central:

O jogador deve aprender porque o mundo apresenta um problema, não porque o jogo exibe um manual.

### Ruim

> "Clientes possuem uma variável chamada paciência. Quando ela chega a zero..."

### Correto

Cliente começa a esperar, muda de expressão e diz:

> "Está demorando..."

A barra diminui.

O jogador entende a relação observando.

## 23. Falha e recuperação

A V0.1 não deve punir pesadamente erros iniciais.

Se um cliente abandonar:

- nenhuma dívida artificial;
- nenhuma tela de derrota;
- receita daquela venda é perdida;
- cliente demonstra insatisfação e sai;
- novo cliente poderá chegar.

O fracasso ensina eficiência, não reinicia a sessão.

## 24. Adaptação por tipo de negócio

O roteiro é único, mas conteúdo deve ser data-driven.

Cada negócio fornece ao roteiro:

- `businessDisplayName`;
- `starterProduct`;
- `secondaryProduct`;
- `sourceStation`;
- `processorStation`;
- `counterName`;
- `orderDialogueSet`;
- `waitingDialogueSet`;
- `happyDialogueSet`;
- `upgradeLabels`;
- `visualTheme`.

O roteiro não deve conter condicionais de gameplay como `if Pizza` espalhados pelo código.

## 25. Frases contextuais mínimas

Cada negócio deve possuir pelo menos variações para:

### Pedido

- pedido direto;
- pedido cordial;
- pedido casual.

### Espera

- leve impaciência;
- impaciência média;
- abandono.

### Satisfação

- aprovação simples;
- elogio ao produto;
- intenção de retorno.

### Saída

- despedida neutra;
- despedida positiva;
- saída insatisfeita.

## 26. Ritmo emocional esperado

A curva da primeira sessão deve seguir aproximadamente:

**curiosidade → escolha → domínio → recompensa → pressão → solução → automação → orgulho → ambição**.

Se o jogador sentir apenas repetição e números subindo, o Capítulo 1 falhou mesmo que tecnicamente funcione.

## 27. Critérios narrativos de aceite

O Capítulo 1 está narrativamente funcional quando um novo jogador consegue compreender, sem explicação externa:

- que está em Pelotas/Laranjal;
- que aquele ponto é seu primeiro negócio;
- que escolheu o tipo de comércio;
- como uma venda acontece;
- por que precisa melhorar equipamentos;
- por que contratar um funcionário é valioso;
- que seu negócio mudou visualmente;
- que existem oportunidades futuras pela cidade.

## 28. Fora do escopo da V0.1

Não entram neste capítulo inicial:

- serviço de mesa;
- delivery;
- drive-thru;
- salários complexos;
- estoque realista;
- fornecedores complexos;
- impostos;
- falência;
- empréstimos;
- multiplayer;
- concorrentes reais;
- clima influenciando economia;
- eventos globais;
- imóveis pela cidade;
- franquias.

Podem existir elementos visuais que antecipem o universo, mas não sistemas incompletos.

## 29. Princípio final

Ao terminar o primeiro arco, o jogador deve olhar para o pequeno estabelecimento e sentir:

> **"Eu construí isso."**

Ao ver o mapa de Pelotas, a reação esperada é:

> **"Até onde eu consigo chegar?"**

Essas duas sensações definem o Capítulo 1.