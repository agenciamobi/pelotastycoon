# Pelotas Tycoon — Roadmap V0.1

## Objetivo da V0.1

Entregar um APK Android instalável e jogável, ambientado apenas na Praia do Laranjal, com um ponto comercial e seis categorias de negócio que compartilham o mesmo motor.

## Fase 0 — Pré-produção

- Visão aprovada.
- História e enredo aprovados.
- GDD aprovado.
- Core loop definido.
- Negócios iniciais definidos.
- Economia inicial definida.
- Regras de NPCs definidas.
- Direção do Laranjal definida.
- Monetização futura definida.
- Arquitetura técnica definida.
- Canon e backlog separados.
- Revisão cruzada concluída.

**Saída:** `PRE-PRODUCTION v1.0`.

## Fase 1 — Fundação Unity

- Criar projeto Unity 6.3 LTS com URP.
- Fixar patch exato no `ProjectVersion.txt`.
- Configurar Android Build Support.
- Definir package name `com.agenciamobi.pelotastycoon`.
- Configurar portrait como orientação baseline.
- Configurar Android 16/API 36 como target baseline para publicação futura.
- Definir `minSdk` após teste da faixa de aparelhos alvo.
- Criar estrutura de pastas.
- Criar cenas Boot, MainMenu e Laranjal.
- Configurar Input System.
- Configurar controle de versão adequado a Unity.
- Adicionar Git LFS antes de assets pesados.
- Não integrar SDK de publicidade.

**Saída:** projeto abre, compila e gera APK vazio funcional.

## Fase 2 — Protótipo cinza

Usar placeholders geométricos.

- Player com movimento.
- Câmera.
- Joystick virtual portrait.
- Source Station.
- Processor Station.
- Counter Station.
- Item transportável.
- Cliente com NavMesh.
- Fila.
- Pedido.
- Pagamento.
- Dinheiro coletável.

**Saída:** primeiro loop completo jogável sem arte final.

## Fase 3 — Motor data-driven

- BusinessDefinition.
- ProductDefinition.
- StationDefinition.
- DialogueSet.
- UpgradeDefinition.
- Seleção de negócio.
- Adaptação automática de produtos, estações e falas.
- Preços-base definidos nos dados, sem precificação manual pelo jogador.

**Teste obrigatório:** trocar Pastelaria por Pizzaria sem alterar código do core loop.

## Fase 4 — Progressão

- Saldo.
- Pelo menos três upgrades.
- Áreas/fluxo de compra de upgrades.
- Primeiro funcionário automático.
- Capacidade/velocidade configuráveis.
- Satisfação/paciência básica.

Não implementar reputação global na V0.1.

## Fase 5 — Save local

- SaveData versionado.
- Persistência do negócio escolhido.
- Persistência do dinheiro.
- Persistência dos upgrades.
- Retomada após fechar o app.
- Reset de progresso para testes.

## Fase 6 — Laranjal visual

- Água/Lagoa dos Patos.
- Areia.
- Calçadão arborizado.
- Vegetação.
- Ponto comercial modular.
- Rua/estacionamento e continuidade urbana simplificada.
- Marco `Laranjal` em interpretação própria quando viável.
- Edificações de apoio.
- Céu e iluminação.
- Ambientação sonora.
- NPCs visuais low-poly.
- `AmbientPedestrian` simples circulando independentemente dos clientes.

## Fase 7 — Game feel

- Animações.
- Feedback de produção.
- Sons de caixa/venda.
- Partículas de upgrade.
- Reações de cliente.
- Dinheiro satisfatório de coletar.
- Transições de UI.

## Fase 8 — Otimização Android

- Profiling em aparelho real.
- Pooling.
- Revisão de materiais/texturas.
- Revisão de iluminação.
- Revisão de NavMesh.
- Redução de GC spikes.
- Revisão de safe areas em portrait.
- Meta mínima: 30 FPS estáveis em aparelho intermediário de teste.

## Fase 9 — APK V0.1

Checklist:

- [ ] Menu abre corretamente.
- [ ] Orientação portrait funciona corretamente.
- [ ] Jogador escolhe um dos seis negócios.
- [ ] Laranjal carrega.
- [ ] Player se movimenta por joystick.
- [ ] Clientes chegam e formam fila.
- [ ] Pedestres ambientais circulam sem obrigação de comprar.
- [ ] Pedidos correspondem ao negócio escolhido.
- [ ] Produção funciona.
- [ ] Entrega funciona.
- [ ] Pagamento funciona.
- [ ] Dinheiro é coletável.
- [ ] Pelo menos três upgrades funcionam.
- [ ] Pelo menos um funcionário funciona.
- [ ] Paciência/abandono funciona.
- [ ] Save local funciona.
- [ ] Reset de teste funciona.
- [ ] APK instala em Android real.
- [ ] Performance aceitável.

## Fora da V0.1

- Supabase.
- Login.
- Cloud save.
- Ranking.
- Amigos.
- Visitas online.
- Compras in-app.
- Publicidade e SDK de ads.
- Precificação manual.
- Reputação global.
- Outras regiões.
- Multiplayer em tempo real.
- Serviço de mesa complexo.
