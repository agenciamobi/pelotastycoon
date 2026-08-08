# Pelotas Tycoon — Roteiro Jogável do Capítulo 1

## Status

Documento oficial da `PRE-PRODUCTION v1.0` para a V0.1.

Este documento transforma o Capítulo 1 — **O Primeiro Negócio** — em uma sequência jogável. Ele define ritmo, objetivos, tutorial contextual, acontecimentos narrativos e a passagem do jogador de operador para gestor iniciante.

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

**recomeço → iniciativa → trabalho → aprendizado → crescimento**

O jogo não determina por que o jogador chegou àquele momento da vida. Não há tragédia obrigatória, herança ou biografia fixa. Existe uma pequena oportunidade e o jogador decidiu aproveitá-la.

## 3. Duração-alvo

Baseline de playtest:

- escolha do negócio: até 30 segundos após a abertura;
- primeira produção/venda: idealmente até 60–90 segundos;
- primeiro upgrade: aproximadamente 2–4 minutos;
- segundo produto: aproximadamente 5–8 minutos;
- primeiro funcionário: aproximadamente 8–15 minutos;
- consolidação do arco V0.1: aproximadamente 20–35 minutos no primeiro playthrough.

Os números são parâmetros de teste, não compromissos definitivos.

## 4. Beat 0 — Pelotas

1. Tela escura.
2. Som de água, vento e pássaros.
3. Texto:

> **PELOTAS**  
> Rio Grande do Sul

4. A câmera revela uma interpretação 3D estilizada da Praia do Laranjal.
5. Lagoa dos Patos visível.
6. Calçadão arborizado com pedestres ambientais.
7. A câmera percorre a orla e encontra o pequeno ponto comercial.
8. O personagem do jogador está diante dele.

Texto:

> **Todo grande negócio começa pequeno.**

Depois:

> **Este é o seu.**

A abertura deve ser curta. Sem locução obrigatória ou exposição longa.

## 5. Escolha do primeiro negócio

Título:

> **O que você vai construir aqui?**

Opções:

- Pizzaria
- Sorveteria
- Churrascaria
- Lancheria
- Pastelaria
- Peixaria

Cada opção apresenta:

- ícone;
- preview visual simples;
- característica operacional curta.

A escolha define o negócio inicial daquele save.

Durante desenvolvimento, o reset permite testar outra opção.

## 6. Transformação inicial

Após confirmar:

1. fachada recebe identidade básica;
2. estação inicial aparece;
3. balcão aparece;
4. primeiro produto é habilitado;
5. UI mínima mostra o caixa;
6. personagem recebe controle.

Não iniciar com múltiplas estações, menus ou produtos.

## 7. Beat 1 — Movimento

Prompt:

> **Mova-se pelo estabelecimento.**

Joystick portrait aparece. Após movimentação suficiente, o prompt desaparece.

## 8. Beat 2 — Primeiro cliente

Um `Customer` surge a partir do fluxo da orla e entra no estabelecimento enquanto outros `AmbientPedestrian` continuam circulando sem obrigação de comprar.

O cliente faz sempre o primeiro pedido disponível do negócio.

### Primeiro pedido canônico por negócio

**Pizzaria**

> "Uma pizza de queijo, por favor."

**Sorveteria**

> "Quero um sorvete de chocolate."

**Churrascaria**

> "Quero uma porção de carne."

**Lancheria**

> "Um hambúrguer, por favor."

**Pastelaria**

> "Um pastel de carne, por favor."

**Peixaria**

> "Vou levar um filé de pescado."

Os nomes seguem `23-BALANCEAMENTO-INICIAL-DOS-SEIS-NEGOCIOS-V0.1.md`.

## 9. Beat 3 — Primeira produção

A estação recebe destaque visual discreto.

Prompt:

> **Prepare o pedido.**

Interação automática por proximidade.

Feedback mínimo:

- progresso de produção;
- animação simples;
- som curto;
- item pronto claramente visível.

## 10. Beat 4 — Primeira entrega

Prompt:

> **Leve o pedido ao balcão.**

Ao entrar na zona:

- produto é transferido;
- cliente recebe;
- cliente reage;
- pagamento é gerado.

## 11. Beat 5 — Primeiro dinheiro

O dinheiro aparece antes da instrução.

Ao coletar:

- som de caixa/moeda;
- feedback visual em direção ao caixa;
- saldo aumenta.

Mensagem curta:

> **Primeira venda!**

## 12. Beat 6 — Repetição sem tutorial

O segundo cliente chega. O jogo não repete o processo inteiro.

O objetivo é confirmar que o jogador compreendeu:

**pedido → produção → balcão → pagamento → coleta**

Dicas contextuais só reaparecem se houver inatividade relevante.

## 13. Beat 7 — Pressão

Depois de algumas vendas:

- mais clientes aparecem;
- fila começa a existir;
- produção mostra limite;
- paciência ganha significado.

Possível fala:

> "Está demorando..."

A pressão deve criar necessidade de melhorar, não sensação de punição injusta.

## 14. Beat 8 — Primeiro upgrade

Uma Upgrade Zone torna-se acessível.

O primeiro upgrade deve atacar gargalo percebido, como:

- capacidade;
- velocidade;
- espaço de balcão.

A compra deve produzir transformação física e feedback curto.

Mensagem:

> **Seu negócio está crescendo.**

## 15. Beat 9 — Segundo produto

O segundo produto mostra que crescimento adiciona variedade e complexidade.

Ordem baseline:

- Pizzaria: pizza de queijo → pizza de calabresa;
- Sorveteria: chocolate → morango;
- Churrascaria: porção de carne → porção de frango;
- Lancheria: hambúrguer → cachorro-quente;
- Pastelaria: pastel de carne → pastel de queijo;
- Peixaria: filé de pescado → pescado inteiro.

O terceiro produto fica disponível mais adiante conforme o balanceamento.

## 16. Beat 10 — Gargalo humano

Mesmo com equipamento melhor, o jogador ainda faz tudo sozinho.

A experiência deve comunicar sem texto explicativo:

> "Eu não consigo estar em dois lugares ao mesmo tempo."

Só então a contratação é apresentada.

## 17. Beat 11 — Primeiro funcionário

Opção:

> **Contratar funcionário**

Ao contratar:

1. funcionário aparece;
2. assume uma função operacional;
3. começa a automatizar parte do fluxo;
4. a mudança é imediatamente perceptível.

Mensagem:

> **Agora você não precisa fazer tudo sozinho.**

Transição narrativa:

**operador → gestor iniciante**

A preferência inicial de playtest é automatizar `processor → counter`, mantendo o jogador envolvido na produção.

## 18. Beat 12 — Aprender a observar

Depois do primeiro funcionário, o jogador deve poder:

- observar fila;
- acompanhar o funcionário;
- identificar dinheiro acumulado;
- decidir novo upgrade;
- continuar ajudando manualmente.

O jogo começa a ensinar gestão sem abrir uma planilha.

## 19. Beat 13 — Consolidação do ponto

A reta final combina marcos como:

- quantidade mínima de upgrades;
- funcionário contratado;
- fluxo sustentável;
- determinado volume de vendas;
- marco mínimo de satisfação/progresso operacional.

**Não há requisito de reputação global na V0.1.**

Os números serão calibrados em playtest.

O estabelecimento deve estar visualmente mais desenvolvido do que no início.

## 20. Conclusão do arco

Quando o marco é alcançado:

- operação continua funcionando;
- câmera pode se afastar levemente;
- o jogador vê clientes sendo atendidos no negócio que construiu.

Mensagem:

> **Seu negócio começou a chamar atenção pela cidade.**

Depois:

> **Mas Pelotas é muito maior do que este ponto.**

## 21. Revelação do mapa de Pelotas

O mapa é recompensa narrativa.

Mostra:

- Praia do Laranjal — ativa;
- Centro — bloqueado;
- Mercado Público — bloqueado;
- Porto — bloqueado;
- Z3 — bloqueado;
- evento/feira futura — bloqueado.

Marcas privadas e eventos específicos permanecem sujeitos a autorização/licenciamento.

Mensagem final:

> **Isto é só o começo.**

O jogo retorna ao negócio. Não existe `Game Over` por concluir o arco.

## 22. Tutorial invisível

O jogador aprende porque o mundo apresenta um problema.

Evitar explicações como:

> "Clientes possuem uma variável chamada paciência..."

Preferir:

- expressão mudando;
- indicador diminuindo;
- fala curta;
- consequência observável.

## 23. Falha e recuperação

Se um cliente abandonar:

- não há dívida artificial;
- não há tela de derrota;
- a venda é perdida;
- cliente demonstra insatisfação e sai;
- novo cliente pode chegar.

O fracasso ensina eficiência, não reinicia a sessão.

## 24. Adaptação data-driven

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

O código não deve espalhar condicionais como `if Pizza` pelo core loop.

## 25. Frases contextuais mínimas

Cada negócio deve possuir variações para:

- pedido;
- espera;
- satisfação;
- abandono;
- despedida.

As frases concretas pertencem ao documento de diálogos adaptativos.

## 26. Ritmo emocional

**curiosidade → escolha → domínio → recompensa → pressão → solução → automação → orgulho → ambição**

Se a experiência transmitir apenas repetição e números subindo, o capítulo falhou mesmo que tecnicamente funcione.

## 27. Critérios narrativos de aceite

Um jogador novo deve compreender sem explicação presencial:

- que está em Pelotas/Laranjal;
- que aquele ponto é seu primeiro negócio;
- que escolheu a categoria;
- como uma venda acontece;
- por que melhorar equipamentos ajuda;
- por que contratar alguém é valioso;
- que seu negócio mudou visualmente;
- que existem oportunidades futuras pela cidade.

## 28. Fora do escopo da V0.1

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
- franquias;
- reputação global;
- precificação manual;
- monetização;
- publicidade.

Podem existir elementos visuais que antecipem o universo, mas não sistemas incompletos.

## 29. Princípio final

Ao terminar o primeiro arco, o jogador deve olhar para o estabelecimento e sentir:

> **"Eu construí isso."**

Ao ver o mapa de Pelotas, a reação esperada é:

> **"Até onde eu consigo chegar?"**
