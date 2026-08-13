import Phaser from 'phaser';
import {
  getBusinessDefinition,
  isBusinessId,
  type BusinessDefinition,
  type BusinessId,
} from '../businesses';
import {
  GAME_RESET_EVENT,
  GAME_SAVE_KEY,
  GAME_STATE_EVENT,
  initialSnapshot,
  type GameAction,
  type GameSnapshot,
} from '../events';

const MAX_QUEUE = 4;
const UPGRADE_COST = 35;
const UPGRADE_SPEED_MULTIPLIER = 0.8;

type Customer = {
  container: Phaser.GameObjects.Container;
  body: Phaser.GameObjects.Arc;
  arrivedAt: number;
  tutorial: boolean;
};

type LegacySave = Partial<GameSnapshot> & {
  businessOwned?: boolean;
};

export class LaranjalScene extends Phaser.Scene {
  private snapshot: GameSnapshot = { ...initialSnapshot };
  private business!: BusinessDefinition;
  private player?: Phaser.GameObjects.Arc;
  private playerShadow?: Phaser.GameObjects.Ellipse;
  private target = new Phaser.Math.Vector2(285, 1110);
  private customers: Customer[] = [];
  private queueLabel?: Phaser.GameObjects.Text;
  private processorStatus?: Phaser.GameObjects.Text;
  private upgradePad?: Phaser.GameObjects.Rectangle;
  private upgradeLabel?: Phaser.GameObjects.Text;
  private paymentCoin?: Phaser.GameObjects.Container;
  private nextCustomerTimer?: Phaser.Time.TimerEvent;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private carrying: 'raw' | 'product' | null = null;
  private processingStartedAt = 0;
  private processingDuration = 0;
  private resetHandler = () => this.resetGame();

  constructor(private readonly requestedBusinessId: BusinessId) {
    super('Laranjal');
  }

  create() {
    this.loadSave();
    this.business = getBusinessDefinition(this.snapshot.businessId ?? this.requestedBusinessId);
    this.snapshot.businessId = this.business.id;

    this.drawWorld();
    this.createBusiness();
    this.createPlayer();
    this.createInput();
    this.cursors = this.input.keyboard?.createCursorKeys();
    this.refreshUpgradeVisual();
    this.refreshQueueVisual();
    this.persist();

    if (this.snapshot.served > 0) {
      this.snapshot.action = 'awaitingCustomer';
      this.snapshot.objective = 'Aguarde o próximo cliente na orla.';
      this.snapshot.message = `${this.business.name} aberta. Continue fazendo o negócio crescer.`;
      this.scheduleNextCustomer(1500);
      this.emitState();
    }

    window.addEventListener(GAME_RESET_EVENT, this.resetHandler);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      window.removeEventListener(GAME_RESET_EVENT, this.resetHandler);
      this.nextCustomerTimer?.remove(false);
    });
  }

  update(_: number, delta: number) {
    if (!this.player) return;

    const keyboardVector = new Phaser.Math.Vector2(
      Number(Boolean(this.cursors?.right?.isDown)) - Number(Boolean(this.cursors?.left?.isDown)),
      Number(Boolean(this.cursors?.down?.isDown)) - Number(Boolean(this.cursors?.up?.isDown)),
    );

    if (keyboardVector.lengthSq() > 0) {
      this.markMovementStarted();
      keyboardVector.normalize();
      this.target.set(
        Phaser.Math.Clamp(this.player.x + keyboardVector.x * 180, 80, 655),
        Phaser.Math.Clamp(this.player.y + keyboardVector.y * 180, 905, 1215),
      );
    }

    const direction = new Phaser.Math.Vector2(this.target.x - this.player.x, this.target.y - this.player.y);
    if (direction.length() > 7) {
      direction.normalize();
      const speed = 0.33 * delta;
      this.player.x += direction.x * speed;
      this.player.y += direction.y * speed;
      if (this.playerShadow) {
        this.playerShadow.x = this.player.x;
        this.playerShadow.y = this.player.y + 24;
      }
    }

    this.updateProcessing();
    this.updateCustomerPatience();
    this.checkProximityInteractions();
  }

  private drawWorld() {
    const graphics = this.add.graphics();
    graphics.fillStyle(0x8ed8f8, 1);
    graphics.fillRect(0, 0, 720, 1280);

    graphics.fillStyle(0xffd36a, 1);
    graphics.fillCircle(600, 130, 62);
    graphics.fillStyle(0xffffff, 0.72);
    graphics.fillCircle(130, 120, 34);
    graphics.fillCircle(170, 110, 48);
    graphics.fillCircle(215, 125, 32);

    graphics.fillStyle(0x1b8bd3, 1);
    graphics.fillRect(0, 250, 720, 290);
    for (let y = 285; y < 520; y += 38) {
      graphics.lineStyle(7, 0x6fc8ef, 0.75);
      graphics.beginPath();
      graphics.moveTo(0, y);
      graphics.lineTo(720, y + 18);
      graphics.strokePath();
    }

    graphics.fillStyle(0xf4d28b, 1);
    graphics.fillRect(0, 540, 720, 150);

    graphics.fillStyle(0xd59a5e, 1);
    graphics.fillRect(0, 690, 720, 150);
    graphics.lineStyle(4, 0xb17642, 0.7);
    for (let x = 0; x < 720; x += 72) graphics.lineBetween(x, 690, x, 840);

    graphics.fillStyle(0x44515e, 1);
    graphics.fillRect(0, 840, 720, 160);
    graphics.fillStyle(0xf7e9a0, 1);
    for (let x = 22; x < 720; x += 92) graphics.fillRect(x, 915, 55, 8);

    graphics.fillStyle(0x86c95a, 1);
    graphics.fillRect(0, 1000, 720, 280);

    // Trapiche atual: interpretação estilizada com apenas um abrigo.
    graphics.fillStyle(0x7b4b2c, 1);
    graphics.fillRect(292, 330, 34, 300);
    graphics.fillRect(382, 330, 34, 300);
    graphics.fillStyle(0x9d633a, 1);
    graphics.fillRect(292, 330, 124, 28);
    graphics.fillStyle(0x644027, 1);
    graphics.fillTriangle(270, 330, 438, 330, 354, 270);
    graphics.lineStyle(8, 0x65412a, 1);
    graphics.lineBetween(354, 358, 630, 530);
    graphics.lineBetween(390, 358, 666, 530);

    this.add.text(28, 36, 'PRAIA DO LARANJAL', {
      fontFamily: 'system-ui, sans-serif',
      fontSize: '34px',
      fontStyle: 'bold',
      color: '#073763',
      stroke: '#ffffff',
      strokeThickness: 8,
    });
    this.add.text(30, 82, 'Pelotas • RS', {
      fontFamily: 'system-ui, sans-serif',
      fontSize: '22px',
      color: '#174f73',
    });

    this.add.text(26, 650, 'ORLA', {
      fontFamily: 'system-ui, sans-serif',
      fontSize: '15px',
      fontStyle: 'bold',
      color: '#7a552c',
      backgroundColor: '#fff4d6cc',
      padding: { x: 9, y: 5 },
    });
  }

  private createBusiness() {
    const accent = this.business.color;

    this.add.ellipse(500, 1200, 360, 70, 0x234119, 0.2);
    this.add.rectangle(505, 1110, 345, 245, 0xfffbef).setStrokeStyle(8, accent);
    this.add.rectangle(505, 1012, 345, 50, accent).setStrokeStyle(5, 0xffffff);

    this.add.text(505, 1012, this.business.name.toUpperCase(), {
      fontFamily: 'system-ui, sans-serif',
      fontSize: '20px',
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    }).setOrigin(0.5);

    this.createStation(390, 1140, 92, 80, 0x4f9fd3, 'INSUMOS');
    this.createStation(505, 1140, 92, 80, 0xf5b940, 'PREPARO');
    this.createStation(610, 1055, 112, 70, 0x69bd66, 'BALCÃO');
    this.createStation(610, 1160, 92, 72, 0xf2d44f, 'CAIXA');

    this.processorStatus = this.add.text(505, 1191, this.business.starterProduct, {
      fontFamily: 'system-ui, sans-serif',
      fontSize: '12px',
      color: '#5f4a19',
      align: 'center',
      wordWrap: { width: 115 },
    }).setOrigin(0.5);

    this.queueLabel = this.add.text(120, 962, '', {
      fontFamily: 'system-ui, sans-serif',
      fontSize: '17px',
      fontStyle: 'bold',
      color: '#14314c',
      backgroundColor: '#ffffffdd',
      padding: { x: 11, y: 6 },
    }).setOrigin(0, 0.5);

    this.upgradePad = this.add.rectangle(190, 1140, 130, 92, 0x9aa9b0, 0.75).setStrokeStyle(5, 0xffffff);
    this.upgradeLabel = this.add.text(190, 1140, `MELHORIA\n${UPGRADE_COST} moedas`, {
      fontFamily: 'system-ui, sans-serif',
      fontSize: '15px',
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    }).setOrigin(0.5);
  }

  private createStation(x: number, y: number, width: number, height: number, color: number, label: string) {
    this.add.rectangle(x, y, width, height, color, 0.95).setStrokeStyle(5, 0xffffff);
    this.add.text(x, y - 4, label, {
      fontFamily: 'system-ui, sans-serif',
      fontSize: '14px',
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    }).setOrigin(0.5);
  }

  private createPlayer() {
    this.playerShadow = this.add.ellipse(285, 1134, 54, 20, 0x173246, 0.22).setDepth(9);
    const player = this.add.circle(285, 1110, 27, 0xff6f3d).setStrokeStyle(7, 0xffffff);
    player.setDepth(10);
    this.player = player;
    this.target.set(player.x, player.y);

    this.tweens.add({
      targets: player,
      scaleY: 0.92,
      yoyo: true,
      repeat: -1,
      duration: 420,
      ease: 'Sine.easeInOut',
    });
  }

  private createInput() {
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      if (pointer.y < 880) return;
      this.markMovementStarted();
      this.target.set(
        Phaser.Math.Clamp(pointer.x, 80, 655),
        Phaser.Math.Clamp(pointer.y, 905, 1215),
      );
    });
  }

  private markMovementStarted() {
    if (this.snapshot.action !== 'move') return;

    this.snapshot.action = 'awaitingCustomer';
    this.snapshot.objective = 'Seu primeiro cliente está chegando pela orla.';
    this.snapshot.message = 'Explore o ponto enquanto espera. O atendimento será por proximidade.';
    this.emitState();
    this.scheduleNextCustomer(1200, true);
  }

  private scheduleNextCustomer(delay?: number, tutorial = false) {
    if (this.nextCustomerTimer) return;

    const wait = delay ?? Phaser.Math.Between(this.business.arrivalMinMs, this.business.arrivalMaxMs);
    this.nextCustomerTimer = this.time.delayedCall(wait, () => {
      this.nextCustomerTimer = undefined;
      this.addCustomer(tutorial);
      this.scheduleNextCustomer();
    });
  }

  private addCustomer(tutorial: boolean) {
    if (this.customers.length >= MAX_QUEUE) return;

    const queueIndex = this.customers.length;
    const targetX = 115 + queueIndex * 105;
    const y = 930;
    const palette = [0xe45d87, 0x7f66d8, 0x34b5a5, 0xf29f3d, 0x4f8edb];
    const color = palette[queueIndex % palette.length];

    const shadow = this.add.ellipse(0, 22, 48, 18, 0x173246, 0.2);
    const body = this.add.circle(0, 0, 24, color).setStrokeStyle(6, 0xffffff);
    const order = this.add.text(0, -52, this.business.starterProduct, {
      fontFamily: 'system-ui, sans-serif',
      fontSize: '13px',
      fontStyle: 'bold',
      color: '#17304a',
      backgroundColor: '#ffffffee',
      padding: { x: 7, y: 5 },
      align: 'center',
      wordWrap: { width: 118 },
    }).setOrigin(0.5);

    const container = this.add.container(-80, y, [shadow, body, order]).setDepth(8);
    this.customers.push({ container, body, arrivedAt: this.time.now, tutorial });

    this.tweens.add({ targets: container, x: targetX, duration: 520, ease: 'Sine.easeOut' });
    this.snapshot.queue = this.customers.length;
    this.snapshot.message = tutorial
      ? `Primeiro pedido: ${this.business.starterProduct}.`
      : `Novo pedido: ${this.business.starterProduct}.`;

    if (this.snapshot.action === 'awaitingCustomer' || this.snapshot.action === 'free') {
      this.snapshot.action = 'collectRaw';
      this.snapshot.objective = 'Pegue os insumos na estação INSUMOS.';
    }

    this.refreshQueueVisual();
    this.emitState();
  }

  private updateProcessing() {
    if (this.snapshot.action !== 'processing' || this.processingDuration <= 0) return;

    const elapsed = this.time.now - this.processingStartedAt;
    const progress = Phaser.Math.Clamp(elapsed / this.processingDuration, 0, 1);
    const percent = Math.round(progress * 100);
    this.processorStatus?.setText(`Preparando... ${percent}%`);

    if (progress < 1) return;

    this.processingDuration = 0;
    this.snapshot.action = 'ready';
    this.snapshot.objective = `Pegue ${this.business.starterProduct} na estação PREPARO.`;
    this.snapshot.message = 'Pedido pronto para levar ao balcão.';
    this.processorStatus?.setText(`${this.business.starterProduct}\nPRONTO`);
    this.emitState();
  }

  private checkProximityInteractions() {
    if (!this.player) return;

    if (this.snapshot.canUpgrade && this.snapshot.upgradeLevel === 0 && this.distanceTo(190, 1140) < 66) {
      this.buyUpgrade();
    }

    switch (this.snapshot.action) {
      case 'collectRaw':
        if (this.distanceTo(390, 1140) < 62) {
          this.carrying = 'raw';
          this.snapshot.action = 'bringRaw';
          this.snapshot.objective = 'Leve os insumos até a estação PREPARO.';
          this.snapshot.message = 'Insumos coletados.';
          this.emitState();
        }
        break;
      case 'bringRaw':
        if (this.distanceTo(505, 1140) < 62) this.startProcessing();
        break;
      case 'ready':
        if (this.distanceTo(505, 1140) < 62) {
          this.carrying = 'product';
          this.snapshot.action = 'deliver';
          this.snapshot.objective = `Leve ${this.business.starterProduct} ao BALCÃO.`;
          this.snapshot.message = 'Produto pronto em mãos.';
          this.processorStatus?.setText(this.business.starterProduct);
          this.emitState();
        }
        break;
      case 'deliver':
        if (this.distanceTo(610, 1055) < 72) this.deliverOrder();
        break;
      case 'collectPayment':
        if (this.distanceTo(610, 1160) < 66) this.collectPayment();
        break;
      default:
        break;
    }
  }

  private startProcessing() {
    if (this.snapshot.action !== 'bringRaw') return;

    this.carrying = null;
    this.processingStartedAt = this.time.now;
    this.processingDuration = this.getEffectiveProductionTime();
    this.snapshot.action = 'processing';
    this.snapshot.objective = `Aguarde o preparo de ${this.business.starterProduct}.`;
    this.snapshot.message = `Produção iniciada: ${Math.round(this.processingDuration / 100) / 10}s.`;
    this.processorStatus?.setText('Preparando... 0%');
    this.emitState();
  }

  private deliverOrder() {
    const customer = this.customers.shift();
    if (!customer) {
      this.carrying = null;
      this.snapshot.action = 'free';
      this.snapshot.objective = 'Aguarde o próximo cliente.';
      this.snapshot.message = 'Não há cliente aguardando agora.';
      this.emitState();
      return;
    }

    this.carrying = null;
    this.snapshot.queue = this.customers.length;

    this.tweens.add({
      targets: customer.container,
      alpha: 0,
      x: 780,
      duration: 500,
      ease: 'Sine.easeIn',
      onComplete: () => customer.container.destroy(true),
    });

    this.spawnPayment();
    this.snapshot.action = 'collectPayment';
    this.snapshot.objective = 'Recolha o pagamento no CAIXA.';
    this.snapshot.message = `${this.business.starterProduct} entregue. O cliente pagou.`;
    this.refreshQueueVisual();
    this.emitState();
  }

  private spawnPayment() {
    this.paymentCoin?.destroy(true);
    const coin = this.add.circle(0, 0, 24, 0xffd23f).setStrokeStyle(5, 0xb77716);
    const symbol = this.add.text(0, 0, '¢', {
      fontFamily: 'system-ui, sans-serif',
      fontSize: '24px',
      fontStyle: 'bold',
      color: '#7a4a00',
    }).setOrigin(0.5);
    this.paymentCoin = this.add.container(610, 1115, [coin, symbol]).setDepth(12);
    this.tweens.add({
      targets: this.paymentCoin,
      y: 1098,
      yoyo: true,
      repeat: -1,
      duration: 430,
      ease: 'Sine.easeInOut',
    });
  }

  private collectPayment() {
    if (this.snapshot.action !== 'collectPayment') return;

    const coin = this.paymentCoin;
    this.paymentCoin = undefined;
    if (coin) {
      this.tweens.killTweensOf(coin);
      this.tweens.add({
        targets: coin,
        alpha: 0,
        scale: 1.7,
        duration: 280,
        onComplete: () => coin.destroy(true),
      });
    }

    this.snapshot.cash += this.business.saleValue;
    this.snapshot.served += 1;
    this.snapshot.canUpgrade = this.snapshot.upgradeLevel === 0 && this.snapshot.cash >= UPGRADE_COST;
    this.snapshot.message = `Venda concluída: +${this.business.saleValue} moedas.`;

    if (this.customers.length > 0) {
      this.snapshot.action = 'collectRaw';
      this.snapshot.objective = 'Há outro pedido. Volte até INSUMOS.';
    } else {
      this.snapshot.action = 'free';
      this.snapshot.objective = this.snapshot.canUpgrade
        ? 'Você pode melhorar o preparo. Visite a área MELHORIA.'
        : 'Aguarde o próximo cliente na orla.';
    }

    this.refreshUpgradeVisual();
    this.persist();
  }

  private buyUpgrade() {
    if (!this.snapshot.canUpgrade || this.snapshot.upgradeLevel > 0 || this.snapshot.cash < UPGRADE_COST) return;

    this.snapshot.cash -= UPGRADE_COST;
    this.snapshot.upgradeLevel = 1;
    this.snapshot.businessLevel = 2;
    this.snapshot.canUpgrade = false;
    this.snapshot.message = 'Melhoria instalada: preparo 20% mais rápido.';

    if (this.snapshot.action === 'free') {
      this.snapshot.objective = this.customers.length > 0
        ? 'Volte aos INSUMOS para atender o próximo pedido.'
        : 'Aguarde o próximo cliente na orla.';
    }

    this.refreshUpgradeVisual();
    this.persist();
  }

  private updateCustomerPatience() {
    const baseLimit = 30000 + Math.max(0, this.business.productionTimeMs - 5000);

    for (let index = this.customers.length - 1; index >= 0; index -= 1) {
      const customer = this.customers[index];
      if (customer.tutorial) continue;

      const elapsed = this.time.now - customer.arrivedAt;
      if (elapsed > 24000) customer.body.setFillStyle(0xe15b4e);
      else if (elapsed > 16000) customer.body.setFillStyle(0xf0a33a);

      const isCurrentOrder = index === 0 && ['processing', 'ready', 'deliver'].includes(this.snapshot.action);
      if (elapsed > baseLimit && !isCurrentOrder) this.abandonCustomer(index);
    }
  }

  private abandonCustomer(index: number) {
    const [customer] = this.customers.splice(index, 1);
    if (!customer) return;

    this.tweens.add({
      targets: customer.container,
      alpha: 0,
      x: -90,
      duration: 420,
      onComplete: () => customer.container.destroy(true),
    });

    this.snapshot.queue = this.customers.length;
    this.snapshot.message = 'Um cliente desistiu da espera. A venda foi perdida.';

    if (this.customers.length === 0 && (this.snapshot.action === 'collectRaw' || this.snapshot.action === 'bringRaw')) {
      this.carrying = null;
      this.snapshot.action = 'free';
      this.snapshot.objective = 'Aguarde o próximo cliente na orla.';
    }

    this.reflowQueue();
    this.emitState();
  }

  private reflowQueue() {
    this.customers.forEach((customer, index) => {
      const x = 115 + index * 105;
      this.tweens.add({ targets: customer.container, x, duration: 240 });
    });
    this.snapshot.queue = this.customers.length;
    this.refreshQueueVisual();
  }

  private refreshQueueVisual() {
    this.queueLabel?.setText(`Fila: ${this.customers.length}/${MAX_QUEUE}`);
  }

  private refreshUpgradeVisual() {
    if (!this.upgradePad || !this.upgradeLabel) return;

    if (this.snapshot.upgradeLevel > 0) {
      this.upgradePad.setFillStyle(0x52a85b, 0.92);
      this.upgradeLabel.setText('MELHORIA ✓\nPreparo +20%');
      return;
    }

    if (this.snapshot.canUpgrade) {
      this.upgradePad.setFillStyle(0x6f56c7, 0.95);
      this.upgradeLabel.setText(`MELHORIA\n${UPGRADE_COST} moedas`);
      return;
    }

    this.upgradePad.setFillStyle(0x9aa9b0, 0.75);
    this.upgradeLabel.setText(`MELHORIA\n${UPGRADE_COST} moedas`);
  }

  private getEffectiveProductionTime() {
    return Math.round(
      this.business.productionTimeMs * (this.snapshot.upgradeLevel > 0 ? UPGRADE_SPEED_MULTIPLIER : 1),
    );
  }

  private distanceTo(x: number, y: number) {
    if (!this.player) return Number.POSITIVE_INFINITY;
    return Phaser.Math.Distance.Between(this.player.x, this.player.y, x, y);
  }

  private loadSave() {
    try {
      const raw = localStorage.getItem(GAME_SAVE_KEY);
      if (!raw) {
        this.snapshot = {
          ...initialSnapshot,
          businessId: this.requestedBusinessId,
          message: `Você abriu sua ${getBusinessDefinition(this.requestedBusinessId).name} no Laranjal.`,
        };
        return;
      }

      const parsed = JSON.parse(raw) as LegacySave;
      const migratedBusinessId = isBusinessId(parsed.businessId)
        ? parsed.businessId
        : parsed.businessOwned
          ? 'lancheria'
          : this.requestedBusinessId;

      this.snapshot = {
        ...initialSnapshot,
        schemaVersion: 2,
        cash: typeof parsed.cash === 'number' ? parsed.cash : 0,
        served: typeof parsed.served === 'number' ? parsed.served : 0,
        businessId: migratedBusinessId,
        businessLevel: typeof parsed.businessLevel === 'number' ? parsed.businessLevel : 1,
        upgradeLevel: typeof parsed.upgradeLevel === 'number' ? parsed.upgradeLevel : 0,
        canUpgrade: false,
        queue: 0,
        action: typeof parsed.served === 'number' && parsed.served > 0 ? 'awaitingCustomer' : 'move',
        objective: typeof parsed.served === 'number' && parsed.served > 0
          ? 'Aguarde o próximo cliente na orla.'
          : 'Mova-se pelo seu primeiro negócio.',
        message: 'Progresso local carregado.',
      };
      this.snapshot.canUpgrade = this.snapshot.upgradeLevel === 0 && this.snapshot.cash >= UPGRADE_COST;
    } catch {
      this.snapshot = { ...initialSnapshot, businessId: this.requestedBusinessId };
    }
  }

  private persist() {
    localStorage.setItem(GAME_SAVE_KEY, JSON.stringify({
      schemaVersion: 2,
      cash: this.snapshot.cash,
      served: this.snapshot.served,
      businessId: this.snapshot.businessId,
      businessLevel: this.snapshot.businessLevel,
      upgradeLevel: this.snapshot.upgradeLevel,
    }));
    this.emitState();
  }

  private emitState() {
    window.dispatchEvent(new CustomEvent<GameSnapshot>(GAME_STATE_EVENT, { detail: { ...this.snapshot } }));
  }

  private resetGame() {
    localStorage.removeItem(GAME_SAVE_KEY);
    this.nextCustomerTimer?.remove(false);
    this.customers.forEach(({ container }) => container.destroy(true));
    this.customers = [];
    this.paymentCoin?.destroy(true);
    this.paymentCoin = undefined;
    this.carrying = null;
    this.snapshot = { ...initialSnapshot };
    this.emitState();
  }
}
