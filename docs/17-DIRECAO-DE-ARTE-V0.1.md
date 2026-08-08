# Pelotas Tycoon — Direção de Arte da V0.1

## Objetivo

Definir a linguagem visual do primeiro APK sem depender de fotorealismo ou produção 3D cara.

## 1. Direção geral

- 3D estilizado;
- leitura clara em tela pequena;
- formas simples e reconhecíveis;
- cores agradáveis e contrastadas;
- proporções levemente exageradas quando ajudarem a legibilidade;
- cenário inspirado no Laranjal sem cópia fotogramétrica;
- mobile-first.

Referência conceitual:

**casual tycoon moderno + identidade litorânea brasileira + Pelotas reconhecível**.

## 2. O que deve comunicar Laranjal

A V0.1 deve transmitir a região por conjunto de elementos, não por um único monumento.

Elementos possíveis:

- Lagoa dos Patos;
- faixa de areia/orla;
- calçadão;
- vegetação;
- postes e mobiliário urbano estilizados;
- circulação de pedestres;
- bicicletas como ambientação;
- horizonte amplo;
- luz de fim de tarde/verão;
- sinalização com `Praia do Laranjal — Pelotas/RS`.

A pesquisa visual definitiva deve usar referências locais atuais antes da modelagem final.

## 3. Não buscar fotorealismo

Evitar:

- texturas 4K desnecessárias;
- iluminação pesada;
- reprodução arquitetônica milimétrica na V0.1;
- excesso de objetos pequenos;
- materiais complexos sem valor de gameplay.

Prioridade:

**reconhecimento + performance + charme visual**.

## 4. Estabelecimento

O mesmo volume-base pode receber kits diferentes por negócio.

Cada kit altera:

- fachada;
- placa;
- paleta;
- estação de produção;
- balcão;
- props temáticos;
- produtos visuais.

A silhueta geral pode permanecer compartilhada na V0.1.

## 5. Identidade por negócio

### Pizzaria

- forno visível;
- caixas/pratos de pizza;
- elementos quentes;
- comunicação visual associada a pizza.

### Sorveteria

- freezer/expositor;
- recipientes/cones;
- sensação refrescante;
- linguagem visual mais leve.

### Churrascaria

- churrasqueira/grelha;
- utensílios de preparo;
- sensação de calor e robustez.

### Lancheria

- chapa;
- embalagens;
- balcão rápido;
- visual urbano/casual.

### Pastelaria

- fritadeira;
- cestos/bandejas;
- balcão de giro rápido.

### Peixaria

- expositor/preparo coerente;
- linguagem limpa;
- produtos definidos somente após validação regional.

## 6. Produtos

Produtos precisam ser reconhecíveis rapidamente de cima/ângulo de gameplay.

Regras:

- silhueta clara;
- escala levemente ampliada quando necessário;
- evitar detalhes microscópicos;
- cores diferenciadas entre produtos similares;
- ícone 2D coerente com modelo 3D.

## 7. Personagens

Estilo modular para reduzir custo.

Variações por:

- cabelo;
- roupa;
- acessórios;
- tons de pele;
- pequenas variações de corpo/altura quando tecnicamente viáveis.

Animações devem priorizar:

- caminhada;
- idle;
- carregar item;
- produzir/interagir;
- receber pedido;
- reação positiva;
- reação negativa.

## 8. Câmera

A câmera precisa favorecer:

- leitura da fila;
- visão de estações;
- deslocamento curto;
- sensação de espaço.

Evitar câmera cinematográfica durante operação normal.

Cinemachine pode ser usado para transições e abertura, mas gameplay precisa permanecer previsível.

## 9. Água e céu

A Lagoa é parte importante da identidade visual.

Usar solução leve:

- shader/material mobile adequado;
- movimento discreto;
- reflexos simplificados;
- sem simulação física complexa.

O céu deve reforçar atmosfera sem exigir volumetria pesada.

## 10. Luz

Prioridade para iluminação estável e barata.

Preferir:

- baked lighting quando aplicável;
- poucas luzes realtime;
- sombras controladas;
- atmosfera clara.

O primeiro APK não precisa de ciclo completo dia/noite.

## 11. Efeitos

Efeitos são usados para reforçar ação:

- produção concluída;
- dinheiro coletado;
- upgrade comprado;
- novo produto;
- funcionário contratado;
- marco concluído.

Evitar partículas constantes que poluam a cena.

## 12. UI visual

A UI deve combinar com o mundo 3D:

- cantos amigáveis;
- tipografia legível;
- iconografia simples;
- pouca ornamentação;
- hierarquia forte;
- não copiar identidade visual da MOBI como skin do jogo.

Pelotas Tycoon precisa possuir identidade própria, embora seja um produto da MOBI.

## 13. Assets de terceiros

Assets prontos podem ser usados na prototipagem e produção quando licenciados corretamente.

Registrar:

- origem;
- licença;
- comprovante de aquisição quando houver;
- permissões comerciais;
- restrições de redistribuição.

Nunca commitar pacotes cuja licença proíba redistribuição pública no repositório.

Como o repositório está público durante a fase inicial, essa regra é especialmente importante.

## 14. Assets gerados/provisórios

Placeholders podem usar:

- primitives Unity;
- materiais simples;
- modelos temporários;
- arte provisória.

Nunca atrasar validação do loop aguardando arte final.

## 15. Meta visual da V0.1

O primeiro APK não precisa parecer produto final, mas deve ser reconhecível como um jogo e transmitir:

- praia/orla;
- Pelotas/Laranjal;
- estabelecimento escolhido;
- clientes;
- produção;
- crescimento.

## 16. Critério de aceite

Uma captura de tela do gameplay deve permitir a alguém identificar, sem legenda externa:

- que existe um comércio;
- que há clientes;
- qual categoria de negócio está ativa;
- onde ocorre produção;
- onde ocorre atendimento;
- que o cenário é uma área de orla/praia.

A identificação específica do Laranjal será refinada progressivamente com referências locais.