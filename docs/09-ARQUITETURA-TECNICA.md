# Pelotas Tycoon — Arquitetura Técnica

## Decisão de arquitetura — agosto de 2026

A arquitetura oficial da V0.1 passa a ser **web-first, multiplataforma e orientada a entrega rápida de um vertical slice jogável**.

Unity deixa de ser a família de produção da V0.1. A motivação é reduzir o tempo até testes reais, aproveitar a stack web já dominada pela equipe e manter navegador + Android com um único core de gameplay.

## Stack oficial

- Phaser 4.x — runtime do jogo 2D/2.5D.
- TypeScript — linguagem principal.
- React — HUD, menus, overlays e interfaces de aplicação.
- Vite — desenvolvimento e build web.
- Capacitor 8.x — empacotamento Android da aplicação web.
- Git/GitHub.
- Save local na V0.1.
- Supabase nas fases online futuras.

## Plataformas

### Web

Primeira superfície de entrega e playtest. O jogo deve abrir por URL sem instalação e funcionar em navegadores modernos desktop e mobile.

### Android

A aplicação web será empacotada via Capacitor usando o application id:

`com.agenciamobi.pelotastycoon`

A publicação futura deve seguir o target Android exigido pela Google Play na data efetiva do envio. O projeto não fixa antecipadamente um target obsoleto como regra permanente.

## Princípios

- Web-first.
- Mobile-first e responsivo.
- Um único core de gameplay para web e Android.
- Data-driven.
- Componentes pequenos e especializados.
- Separação entre gameplay, estado, UI e infraestrutura.
- Nenhum segredo no repositório.
- Nenhum SDK de publicidade conforme o canon `zero ads`.
- Save local agora e sincronização online depois.
- O core loop deve funcionar antes de arte final pesada.

## Estrutura inicial

```text
public/
└── assets/
    ├── branding/
    ├── map/
    ├── buildings/
    ├── characters/
    ├── audio/
    └── ui/

src/
├── game/
│   ├── scenes/
│   ├── entities/
│   ├── systems/
│   ├── economy/
│   ├── businesses/
│   └── config/
├── components/
├── ui/
├── stores/
├── services/
└── main.tsx
```

## Cenas iniciais

- Boot/entrada da aplicação.
- MainMenu.
- Laranjal.
- Business loop dentro da cena do Laranjal na primeira versão, podendo ser separado quando a complexidade exigir.

## Responsabilidades

### Phaser

- mapa e câmera;
- entidades visuais;
- personagem;
- clientes e pedestres;
- interação espacial;
- animações;
- efeitos e game feel.

### React

- menu inicial;
- HUD;
- configurações;
- modais;
- painéis de gestão;
- telas externas ao mundo jogável.

### Core TypeScript

Economia e regras de negócio não devem depender diretamente da renderização. Negócios, produtos, upgrades, clientes e balanceamento devem ser configuráveis por dados.

Entidades conceituais:

- BusinessDefinition
- ProductDefinition
- StationDefinition
- UpgradeDefinition
- DialogueSet
- CustomerProfile
- SaveData

## Representação visual

A V0.1 adota 2.5D/cartoon estilizado. O primeiro graybox pode usar formas geométricas e assets provisórios. A perspectiva isométrica será aplicada progressivamente à medida que os tiles e assets definitivos entrarem.

## Input

- toque como input primário;
- clique do mouse equivalente;
- teclado como conveniência no desktop;
- interações operacionais simples e legíveis;
- nenhuma funcionalidade essencial deve depender de hover.

## Persistência V0.1

Save local versionado, inicialmente com APIs do navegador. A camada de persistência deve permitir migração posterior para IndexedDB e sincronização Supabase sem acoplar o gameplay ao backend.

Exemplo conceitual:

```text
SaveData
├── schemaVersion
├── businessType
├── cash
├── unlockedUpgrades
├── progression
└── settings
```

## Backend futuro

Supabase permanece como preferência inicial para Auth, PostgreSQL, RLS, cloud save, visitas, amizades, rankings, eventos e logs econômicos.

## Multiplayer futuro

Prioridade: multiplayer assíncrono. Visitar outro comércio significa carregar a configuração persistida daquele negócio e reconstruí-la localmente. Não é necessário sincronizar centenas de jogadores em tempo real para entregar a experiência social principal.

## Segurança futura

Quando ranking/economia online existirem:

- nunca confiar no saldo enviado pelo cliente;
- validar compras e upgrades no servidor;
- registrar operações econômicas relevantes;
- limitar requisições abusivas;
- usar RLS;
- separar configuração pública de segredos;
- prever detecção de estados impossíveis.

## Performance

- meta inicial de 60 FPS em desktop e aparelhos mobile intermediários quando viável;
- mínimo aceitável de 30 FPS estáveis nos aparelhos alvo;
- object pooling para clientes e efeitos;
- atlas/texturas compactas;
- evitar overdraw e filtros caros sem valor visual claro;
- reduzir tamanho de download;
- lazy loading de regiões/assets conforme a cidade crescer;
- profiling em aparelhos reais desde cedo.

## Distribuição

### Web

Build estático Vite (`dist/`) apto a CDN/Vercel.

### Android

Capacitor usa o mesmo `dist/` como origem web. O fluxo previsto é:

```bash
npm run build
npx cap sync android
npx cap open android
```

## Repositório

Versionar código, configuração, documentação e assets próprios/licenciados. Não versionar builds, caches, credenciais, keystores ou segredos.

Assets de terceiros só podem ser commitados quando a licença permitir redistribuição pública no repositório.
