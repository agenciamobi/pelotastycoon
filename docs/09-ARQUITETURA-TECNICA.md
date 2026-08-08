# Pelotas Tycoon — Arquitetura Técnica

## Stack inicial

- Unity 6 LTS
- C#
- URP
- Android
- Git/GitHub

## Princípios

- Mobile-first.
- Data-driven.
- Componentes pequenos e especializados.
- Separação entre gameplay, dados, UI e infraestrutura.
- Nenhum segredo no repositório.
- Arquitetura preparada para save local agora e sincronização online depois.

## Estrutura planejada

```text
Assets/
├── Art/
├── Audio/
├── Data/
├── Prefabs/
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

## Cenas iniciais

- Boot
- MainMenu
- Laranjal

## Serviços principais

- GameManager
- BusinessManager
- CustomerManager
- EconomyManager
- ProgressionManager
- SaveManager
- UIManager
- AudioManager

Evitar um `GameManager` monolítico. Cada serviço deve ter responsabilidade clara.

## Dados

Negócios, produtos, estações, upgrades e diálogos devem ser configuráveis por dados. A implementação poderá usar ScriptableObjects inicialmente, mantendo uma camada que permita futura migração/espelhamento para configuração remota.

Entidades conceituais:

- BusinessDefinition
- ProductDefinition
- StationDefinition
- UpgradeDefinition
- DialogueSet
- CustomerProfile
- SaveData

## Player

- joystick virtual;
- movimento 3D;
- câmera de acompanhamento;
- inventário/stack simplificado para itens transportados;
- interação automática por proximidade.

## Navegação de NPCs

- Unity AI Navigation/NavMesh ou solução equivalente compatível com Unity 6;
- destinos controlados por estado;
- filas com posições reservadas;
- pooling de clientes.

## Persistência V0.1

Save local versionado.

O formato deve conter versão de schema para permitir migrações futuras.

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

Quando recursos online entrarem, Supabase é a opção preferencial inicial:

- Auth;
- PostgreSQL;
- RLS;
- RPC/Edge Functions quando necessário;
- perfis;
- negócios;
- cloud save;
- visitas;
- amizades;
- rankings;
- eventos;
- logs econômicos.

## Multiplayer futuro

Prioridade: multiplayer assíncrono.

Visitar outro comércio significa carregar a configuração persistida daquele negócio e reconstruí-la localmente. Não é necessário sincronizar centenas de jogadores em tempo real para entregar a experiência social principal.

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

- meta mínima inicial de 30 FPS estáveis em Android intermediário;
- object pooling;
- materiais compartilhados;
- redução de overdraw;
- texturas adequadas ao mobile;
- luz baked sempre que vantajoso;
- poucas luzes dinâmicas;
- LOD/occlusion conforme a complexidade crescer;
- profiling em aparelho real desde cedo.

## Repositório

Versionar:

- Assets/
- Packages/
- ProjectSettings/
- docs/

Não versionar builds, caches Unity, credenciais, keystores ou segredos.

Git LFS deverá ser configurado antes da entrada relevante de arquivos binários grandes.
