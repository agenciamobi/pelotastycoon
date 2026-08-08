# Pelotas Tycoon — FOUNDATION v0.1

## Status

**EM EXECUÇÃO**

Este documento define o bootstrap técnico imediatamente após a aprovação da `PRE-PRODUCTION v1.0`.

## Objetivo

Chegar rapidamente a dois resultados verificáveis:

1. projeto Unity real versionado no repositório;
2. primeiro APK Android vazio/graybox instalável.

Não produzir arte final antes do Gate A do core loop.

## Stack congelada

- Unity 6.3 LTS;
- patch exato: o mais recente patch 6.3 LTS estável instalado no momento do bootstrap e registrado por `ProjectVersion.txt`;
- template/pipeline: Universal Render Pipeline (URP);
- C#;
- Android;
- portrait;
- package/application id: `com.agenciamobi.pelotastycoon`;
- target baseline: Android 16 / API 36;
- Input System;
- save local;
- sem SDK de publicidade.

## Módulos obrigatórios no Unity Hub

Instalar Unity 6.3 LTS com:

- Android Build Support;
- Android SDK & NDK Tools;
- OpenJDK.

Não usar JDK/SDK externo no primeiro bootstrap sem necessidade comprovada.

## Bootstrap local recomendado

Como o repositório já contém documentação, não criar o projeto Unity diretamente em uma pasta não vazia pelo Hub.

### Passo 1 — clonar a branch de fundação

Exemplo:

```powershell
git clone -b foundation/unity-v0.1 https://github.com/agenciamobi/pelotastycoon.git
cd pelotastycoon
```

### Passo 2 — criar projeto temporário no Unity Hub

Criar um projeto novo em uma pasta irmã temporária, por exemplo:

```text
pelotastycoon-unity-bootstrap/
```

Configuração:

- Editor: Unity 6.3 LTS;
- template: Universal 3D / URP equivalente disponível no Hub;
- nome temporário: `PelotasTycoon`.

Abrir o projeto uma vez e aguardar a importação inicial terminar.

### Passo 3 — fechar o Unity

Depois da criação, fechar o editor para evitar cópia de arquivos enquanto estão sendo escritos.

### Passo 4 — copiar apenas a estrutura versionável

Do projeto temporário para a raiz do clone `pelotastycoon/`, copiar:

```text
Assets/
Packages/
ProjectSettings/
```

Não copiar:

```text
Library/
Temp/
Logs/
UserSettings/
Obj/
```

Esses diretórios são locais e já estão no `.gitignore`.

### Passo 5 — abrir o clone como projeto Unity

No Unity Hub:

- Add/Open project from disk;
- selecionar a pasta raiz do clone `pelotastycoon`.

A partir desse momento, **o clone é o projeto Unity oficial**.

O projeto temporário pode ser removido depois que o clone abrir corretamente.

## Configuração inicial do Player

### Identidade

- Company Name: `MOBI - Marketing Inteligente`;
- Product Name: `Pelotas Tycoon`;
- Package/Application Identifier: `com.agenciamobi.pelotastycoon`.

### Orientação

- Default Orientation: Portrait;
- auto-rotation desabilitada no primeiro graybox.

Landscape só será reconsiderado se playtest demonstrar problema claro.

### Android

- target API: Android 16 / API 36 ou Automatic Highest Installed quando isso resolver para API 36 de forma verificável;
- scripting backend/arquitetura serão validados no primeiro build;
- `minSdk` ainda não é canon e será definido com base nos aparelhos reais de teste.

## Quality/URP

Objetivo inicial é performance e previsibilidade.

- uma configuração visual simples;
- evitar pós-processamento pesado;
- poucas luzes realtime;
- sombras simples;
- sem assets de alta resolução no graybox.

Não otimizar prematuramente, mas não criar dívida visual incompatível com mobile.

## Estrutura de pastas após o Unity existir

Dentro de `Assets/`:

```text
Assets/
├── Art/
├── Audio/
├── Data/
│   ├── Businesses/
│   ├── Products/
│   ├── Dialogues/
│   └── Upgrades/
├── Materials/
├── Prefabs/
│   ├── Characters/
│   ├── Environment/
│   ├── Stations/
│   └── UI/
├── Scenes/
├── Scripts/
│   ├── Core/
│   ├── Player/
│   ├── Customers/
│   ├── Businesses/
│   ├── Stations/
│   ├── Economy/
│   ├── Progression/
│   ├── Save/
│   └── UI/
└── Tests/
```

Não criar dezenas de assemblies/pacotes no primeiro commit. A estrutura deve crescer conforme dependências reais aparecem.

## Cenas iniciais

Criar:

- `Boot.unity`;
- `MainMenu.unity`;
- `Laranjal.unity`.

No primeiro graybox, `Laranjal` pode conter apenas primitives e pontos funcionais.

## Input

Usar Unity Input System.

Primeira ação necessária:

- `Move` como `Vector2`.

O joystick virtual alimenta `Move`.

Não criar botões de `Pick`, `Produce` ou `Deliver` na V0.1: essas interações são automáticas por proximidade.

## Primeiro graybox

### Player

Placeholder:

- capsule/cylinder;
- CharacterController ou solução equivalente;
- movimento relativo ao mundo/câmera definido no protótipo;
- sem animação obrigatória.

### Câmera

- perspectiva 3D levemente elevada;
- acompanhamento suave;
- enquadramento portrait;
- sem Cinemachine obrigatória no primeiro minuto de protótipo se uma câmera simples resolver.

### Estações

Criar placeholders para:

- `SourceStation`;
- `ProcessorStation`;
- `CounterStation`.

### Item

Um único item placeholder com estados suficientes para provar:

```text
RAW → PROCESSING → READY → CARRIED → AVAILABLE → SOLD
```

### Cliente

Um cliente placeholder deve provar:

```text
ENTERING
→ QUEUEING
→ ORDERING
→ WAITING
→ RECEIVING
→ PAYING
→ LEAVING
```

`ABANDONING` entra logo depois do loop básico funcionar.

## Milestone F0 — projeto abre

Critérios:

- [ ] Unity abre o clone sem erro estrutural;
- [ ] `Assets/`, `Packages/` e `ProjectSettings/` estão versionados;
- [ ] `Library/` e caches não aparecem no Git;
- [ ] `ProjectVersion.txt` registra Unity 6.3 LTS patch real;
- [ ] URP ativo;
- [ ] projeto em portrait;
- [ ] package id correto.

## Milestone F1 — APK vazio

Critérios:

- [ ] plataforma Android selecionada;
- [ ] build conclui;
- [ ] APK instala no aparelho;
- [ ] aplicação abre;
- [ ] portrait respeitado;
- [ ] tela não apresenta crash.

Não precisa haver gameplay nesse build.

## Milestone F2 — movimento

Critérios:

- [ ] cena `Laranjal` abre;
- [ ] capsule do jogador visível;
- [ ] joystick responde;
- [ ] jogador se move;
- [ ] câmera acompanha;
- [ ] funciona em Android real.

## Milestone F3 — primeira venda

Critérios:

- [ ] cliente chega;
- [ ] pedido existe;
- [ ] jogador coleta/obtém item;
- [ ] item é processado;
- [ ] item chega ao balcão;
- [ ] cliente recebe;
- [ ] pagamento aparece;
- [ ] jogador coleta dinheiro.

Quando F3 estiver estável, o **coração do jogo existe**.

## O que NÃO fazer nesta branch antes de F3

- modelar Laranjal final;
- adicionar Supabase;
- login;
- ranking;
- loja premium;
- Google Play Billing;
- ads;
- multiplayer;
- serviço de mesa;
- clima real;
- ciclo dia/noite;
- funcionários complexos;
- sistema de reputação;
- precificação manual;
- grandes pacotes de assets.

## Git e assets

### Arquivos Unity

Versionar normalmente:

- `.meta`;
- scenes;
- prefabs;
- ScriptableObjects;
- scripts;
- ProjectSettings;
- Packages.

### Binários grandes

Antes de inserir modelos/texturas/áudio pesados:

1. validar licença;
2. decidir se podem existir em repositório público;
3. configurar Git LFS para extensões necessárias;
4. evitar adicionar/remover arquivos grandes repetidamente do histórico.

## Segurança

Nunca commitar:

- keystore;
- `.jks`;
- `key.properties`;
- `local.properties`;
- `.env`;
- service account;
- senhas/tokens;
- credenciais Google Play.

O `.gitignore` da branch já cobre esses itens.

## Definition of Done da FOUNDATION v0.1

A fase termina quando:

- projeto Unity real está no Git;
- Android está configurado;
- primeiro APK instala;
- joystick/movimento funcionam no aparelho;
- core loop da primeira venda funciona com placeholders;
- não há backend, ads ou arte pesada escondendo problemas do gameplay.

## Próxima fase

Após a primeira venda estável:

**`CORE-LOOP v0.1`**

Nela entram:

- fila completa;
- paciência/abandono;
- BusinessDefinition;
- primeiros dois negócios data-driven;
- upgrades;
- primeiro funcionário;
- save local.
