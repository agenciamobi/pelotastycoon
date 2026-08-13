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
  type GameSnapshot,
} from '../events';

const MAX_QUEUE = 4;
const UPGRADE_COST = 35;
const UPGRADE_SPEED_MULTIPLIER = 0.8;

const SPOTS = {
  upgrade: { x: 170, y: 1140 },
  raw: { x: 355, y: 1145 },
  processor: { x: 490, y: 1145 },
  counter: { x: 610, y: 1050 },
  cash: { x: 610, y: 1160 },
} as const;

type Customer = {
  container: Phaser.GameObjects.Container;
  body: Phaser.GameObjects.Rectangle;
  patience: Phaser.GameObjects.Rectangle;
  arrivedAt: number;
  tutorial: boolean;
};

type LegacySave = Partial<GameSnapshot> & {
  businessOwned?: boolean;
};

export class LaranjalScene extends Phaser.Scene {
  private snapshot: GameSnapshot = { ...initialSnapshot };
  private business!: BusinessDefinition;
  private player?: Phaser.GameObjects.Container;
  private avatar?: Phaser.GameObjects.Container;
  private carryBadge?: Phaser.GameObjects.Container;
  private carryText?: Phaser.GameObjects.Text;
  private actionHalo?: Phaser.GameObjects.Arc;
  private target = new Phaser.Math.Vector2(275, 1110);
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
  private lastFacing = 1;
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
    this.createActionHalo();
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
        Phaser.Math.Clamp(this.player.x + keyboardVector.x * 180, 70, 650),
        Phaser.Math.Clamp(this.player.y + keyboardVector.y * 180, 930, 1215),
      );
    }

    const direction = new Phaser.Math.Vector2(this.target.x - this.player.x, this.target.y - this.player.y);
    if (direction.length() > 7) {
      direction.normalize();
      const speed = 0.33 * delta;
      this.player.x += direction.x * speed;
      this.player.y += direction.y * speed;
      this.player.setDepth(20 + Math.floor(this.player.y / 18));

      if (Math.abs(direction.x) > 0.05) this.lastFacing = direction.x > 0 ? 1 : -1;
      if (this.avatar) this.avatar.scaleX = this.lastFacing;
    }

    this.updateProcessing();
    this.updateCustomerPatience();
    this.checkProximityInteractions();
  }

  private drawWorld() {
    const g = this.add.graphics();

    // Céu e horizonte.
    g.fillStyle(0x80d1ef, 1);
    g.fillRect(0, 0, 720, 220);
    g.fillStyle(0xa6e1f4, 1);
    g.fillRect(0, 165, 720, 55);
    this.drawCloud(125, 105, 0.85);
    this.drawCloud(535, 85, 0.62);

    const sun = this.add.circle(610, 120, 48, 0xffcf64).setDepth(1);
    this.tweens.add({ targets: sun, alpha: 0.84, yoyo: true, repeat: -1, duration: 1800 });

    // Lagoa dos Patos em três planos.
    g.fillStyle(0x198fc7, 1);
    g.fillRect(0, 220, 720, 305);
    g.fillStyle(0x20a2d9, 1);
    g.fillRect(0, 235, 720, 90);
    g.fillStyle(0x0d79b1, 0.55);
    g.fillRect(0, 420, 720, 105);
    for (let y = 265; y < 510; y += 38) {
      g.lineStyle(4, 0x8adcf3, 0.62);
      g.beginPath();
      g.moveTo(-20, y);
      g.lineTo(220, y + 8);
      g.lineTo(455, y - 3);
      g.lineTo(740, y + 10);
      g.strokePath();
    }

    // Praia e calçadão.
    g.fillStyle(0xf2d28c, 1);
    g.fillRect(0, 525, 720, 112);
    g.fillStyle(0xe4b86f, 1);
    g.fillRect(0, 637, 720, 20);
    g.fillStyle(0xd89b59, 1);
    g.fillRect(0, 657, 720, 102);
    g.lineStyle(3, 0xb7773d, 0.45);
    for (let x = -40; x < 760; x += 72) g.lineBetween(x, 657, x + 32, 759);
    g.lineStyle(2, 0xf2c68a, 0.45);
    for (let y = 686; y < 755; y += 32) g.lineBetween(0, y, 720, y);

    // Faixa verde, árvores e postes.
    g.fillStyle(0x5fb657, 1);
    g.fillRect(0, 759, 720, 72);
    this.drawTree(65, 806, 0.82);
    this.drawTree(650, 806, 0.9);
    this.drawLamp(150, 808);
    this.drawLamp(555, 808);

    // Avenida + ciclovia.
    g.fillStyle(0x43515c, 1);
    g.fillRect(0, 831, 720, 112);
    g.fillStyle(0xf6df77, 1);
    for (let x = 22; x < 720; x += 112) g.fillRect(x, 884, 60, 6);
    g.fillStyle(0x57b6a2, 1);
    g.fillRect(0, 943, 720, 31);
    g.fillStyle(0xffffff, 0.72);
    for (let x = 24; x < 720; x += 105) g.fillRect(x, 956, 55, 4);

    // Lote do primeiro negócio.
    g.fillStyle(0x79c95a, 1);
    g.fillRect(0, 974, 720, 306);
    g.fillStyle(0x6dbb51, 1);
    g.fillTriangle(0, 974, 720, 974, 720, 1042);
    g.fillStyle(0xe8d8b8, 1);
    g.fillRoundedRect(92, 1008, 595, 250, 34);
    g.fillStyle(0xbca77f, 0.35);
    g.fillEllipse(430, 1242, 520, 54);

    this.drawTrapiche();

    this.add.text(26, 30, 'PRAIA DO LARANJAL', {
      fontFamily: 'system-ui, sans-serif',
      fontSize: '31px',
      fontStyle: 'bold',
      color: '#075078',
      stroke: '#ffffff',
      strokeThickness: 8,
    }).setDepth(4);

    const badge = this.add.container(30, 78).setDepth(4);
    const plate = this.add.rectangle(0, 0, 136, 30, 0xffffff, 0.88).setOrigin(0, 0.5);
    const dot = this.add.circle(14, 0, 5, 0xe95f3d);
    const label = this.add.text(26, 0, 'Pelotas • RS', {
      fontFamily: 'system-ui, sans-serif',
      fontSize: '15px',
      fontStyle: 'bold',
      color: '#35667e',
    }).setOrigin(0, 0.5);
    badge.add([plate, dot, label]);

    this.add.text(24, 604, 'ORLA DO LARANJAL', {
      fontFamily: 'system-ui, sans-serif',
      fontSize: '12px',
      fontStyle: 'bold',
      color: '#704e28',
      backgroundColor: '#fff4d6dd',
      padding: { x: 10, y: 6 },
    }).setDepth(4);
  }

  private drawCloud(x: number, y: number, scale: number) {
    const cloud = this.add.container(x, y).setScale(scale).setDepth(1);
    cloud.add([
      this.add.ellipse(-42, 8, 74, 42, 0xffffff, 0.82),
      this.add.ellipse(0, 0, 94, 58, 0xffffff, 0.9),
      this.add.ellipse(45, 9, 78, 44, 0xffffff, 0.82),
    ]);
    this.tweens.add({ targets: cloud, x: x + 24, yoyo: true, repeat: -1, duration: 6500 });
  }

  private drawTree(x: number, y: number, scale: number) {
    const tree = this.add.container(x, y).setScale(scale).setDepth(6);
    tree.add([
      this.add.ellipse(0, 15, 72, 20, 0x234119, 0.18),
      this.add.rectangle(0, -8, 14, 58, 0x86522d).setOrigin(0.5, 1),
      this.add.circle(-18, -64, 28, 0x2f8f4b),
      this.add.circle(20, -62, 31, 0x3da75b),
      this.add.circle(0, -88, 34, 0x4fba64),
    ]);
  }

  private drawLamp(x: number, y: number) {
    const lamp = this.add.container(x, y).setDepth(6);
    lamp.add([
      this.add.rectangle(0, -38, 8, 82, 0x4f616a).setOrigin(0.5, 1),
      this.add.rectangle(12, -117, 28, 5, 0x4f616a),
      this.add.circle(26, -117, 9, 0xfff4bc).setStrokeStyle(3, 0x4f616a),
    ]);
  }

  private drawTrapiche() {
    const g = this.add.graphics().setDepth(3);

    // Passarela em perspectiva e apenas um abrigo, conforme o Trapiche atual.
    g.fillStyle(0x70462c, 1);
    g.fillTriangle(405, 565, 468, 565, 382, 330);
    g.fillTriangle(468, 565, 508, 565, 418, 330);
    g.fillStyle(0xa36b3d, 1);
    g.fillTriangle(412, 555, 495, 555, 403, 338);

    g.lineStyle(4, 0x5b3926, 1);
    g.lineBetween(407, 555, 382, 333);
    g.lineBetween(500, 555, 418, 333);
    for (let t = 0; t <= 1; t += 0.13) {
      const lx = Phaser.Math.Linear(407, 382, t);
      const rx = Phaser.Math.Linear(500, 418, t);
      const y = Phaser.Math.Linear(555, 333, t);
      g.lineBetween(lx, y, lx - 7, y + 25);
      g.lineBetween(rx, y, rx + 7, y + 25);
    }

    g.fillStyle(0x6a4028, 1);
    g.fillRect(370, 300, 12, 54);
    g.fillRect(418, 300, 12, 54);
    g.fillStyle(0x8f5b36, 1);
    g.fillRect(362, 289, 76, 18);
    g.fillStyle(0x54331f, 1);
    g.fillTriangle(350, 292, 450, 292, 400, 254);
    g.fillStyle(0xb77943, 0.65);
    g.fillTriangle(366, 289, 432, 289, 400, 263);
  }

  private createBusiness() {
    const accent = this.business.color;
    const dark = this.shade(accent, 0.76);

    this.add.ellipse(495, 1217, 390, 72, 0x274c22, 0.22).setDepth(7);

    const building = this.add.graphics().setDepth(8);
    building.fillStyle(0xfef9ed, 1);
    building.fillRoundedRect(295, 1020, 375, 224, 24);
    building.lineStyle(6, dark, 1);
    building.strokeRoundedRect(295, 1020, 375, 224, 24);
    building.fillStyle(dark, 1);
    building.fillRoundedRect(282, 992, 401, 54, 18);
    building.fillStyle(accent, 1);
    building.fillRoundedRect(296, 1001, 373, 45, 14);

    // Marquise listrada.
    for (let i = 0; i < 7; i += 1) {
      const x = 300 + i * 53;
      building.fillStyle(i % 2 === 0 ? 0xffffff : accent, 0.96);
      building.fillTriangle(x, 1040, x + 26, 1068, x + 53, 1040);
    }

    this.add.text(482, 1022, this.business.name.toUpperCase(), {
      fontFamily: 'system-ui, sans-serif',
      fontSize: '21px',
      fontStyle: 'bold',
      color: '#ffffff',
      stroke: '#29485c',
      strokeThickness: 3,
    }).setOrigin(0.5).setDepth(13);

    this.createRawStation();
    this.createProcessorStation();
    this.createCounterStation(accent);
    this.createCashStation();

    this.processorStatus = this.add.text(SPOTS.processor.x, 1210, this.business.starterProduct, {
      fontFamily: 'system-ui, sans-serif',
      fontSize: '11px',
      fontStyle: 'bold',
      color: '#6d5228',
      align: 'center',
      wordWrap: { width: 118 },
    }).setOrigin(0.5).setDepth(13);

    this.queueLabel = this.add.text(24, 931, '', {
      fontFamily: 'system-ui, sans-serif',
      fontSize: '13px',
      fontStyle: 'bold',
      color: '#173d55',
      backgroundColor: '#ffffffdd',
      padding: { x: 10, y: 6 },
    }).setOrigin(0, 0.5).setDepth(16);

    this.createUpgradeZone();
  }

  private createRawStation() {
    const c = this.add.container(SPOTS.raw.x, SPOTS.raw.y).setDepth(12);
    c.add([
      this.add.ellipse(0, 34, 100, 24, 0x173246, 0.14),
      this.add.rectangle(0, 2, 96, 80, 0x4c9fd1).setStrokeStyle(5, 0xffffff),
      this.add.rectangle(0, -34, 100, 19, 0x87d5ee).setStrokeStyle(3, 0x2f759a),
      this.add.rectangle(0, -34, 28, 5, 0x2f759a),
      this.add.text(0, 8, 'INSUMOS', {
        fontFamily: 'system-ui, sans-serif', fontSize: '13px', fontStyle: 'bold', color: '#ffffff',
      }).setOrigin(0.5),
    ]);
  }

  private createProcessorStation() {
    const c = this.add.container(SPOTS.processor.x, SPOTS.processor.y).setDepth(12);
    c.add([
      this.add.ellipse(0, 34, 102, 24, 0x173246, 0.14),
      this.add.rectangle(0, 4, 100, 78, 0xf3b740).setStrokeStyle(5, 0xffffff),
      this.add.rectangle(0, -34, 106, 16, 0xffd575).setStrokeStyle(3, 0xc38322),
      this.add.circle(-22, -34, 9, 0x72572e, 0.78),
      this.add.circle(22, -34, 9, 0x72572e, 0.78),
      this.add.text(0, 10, 'PREPARO', {
        fontFamily: 'system-ui, sans-serif', fontSize: '13px', fontStyle: 'bold', color: '#ffffff',
      }).setOrigin(0.5),
    ]);
  }

  private createCounterStation(accent: number) {
    const c = this.add.container(SPOTS.counter.x, SPOTS.counter.y).setDepth(12);
    c.add([
      this.add.ellipse(0, 31, 124, 22, 0x173246, 0.14),
      this.add.rectangle(0, 4, 120, 65, this.shade(accent, 0.88)).setStrokeStyle(5, 0xffffff),
      this.add.rectangle(0, -26, 105, 28, 0xcdf3ff, 0.72).setStrokeStyle(3, 0x4c8ca5),
      this.add.rectangle(0, -43, 122, 10, 0xffffff, 0.94),
      this.add.text(0, 8, 'BALCÃO', {
        fontFamily: 'system-ui, sans-serif', fontSize: '12px', fontStyle: 'bold', color: '#ffffff',
      }).setOrigin(0.5),
    ]);
  }

  private createCashStation() {
    const c = this.add.container(SPOTS.cash.x, SPOTS.cash.y).setDepth(12);
    c.add([
      this.add.ellipse(0, 30, 94, 22, 0x173246, 0.14),
      this.add.rectangle(0, 5, 94, 66, 0xf1cf4b).setStrokeStyle(5, 0xffffff),
      this.add.rectangle(0, -23, 46, 30, 0x455561).setStrokeStyle(3, 0xffffff),
      this.add.rectangle(0, -29, 26, 9, 0xa9e7a8),
      this.add.text(0, 11, 'CAIXA', {
        fontFamily: 'system-ui, sans-serif', fontSize: '12px', fontStyle: 'bold', color: '#73551b',
      }).setOrigin(0.5),
    ]);
  }

  private createUpgradeZone() {
    this.add.ellipse(SPOTS.upgrade.x, SPOTS.upgrade.y + 38, 140, 26, 0x173246, 0.14).setDepth(10);
    this.upgradePad = this.add.rectangle(SPOTS.upgrade.x, SPOTS.upgrade.y, 132, 90, 0x98a5a9, 0.86)
      .setStrokeStyle(4, 0xffffff)
      .setDepth(10);
    this.add.text(SPOTS.upgrade.x, SPOTS.upgrade.y - 27, '↑', {
      fontFamily: 'system-ui, sans-serif', fontSize: '27px', fontStyle: 'bold', color: '#ffffff',
    }).setOrigin(0.5).setDepth(11);
    this.upgradeLabel = this.add.text(SPOTS.upgrade.x, SPOTS.upgrade.y + 17, `MELHORIA\n${UPGRADE_COST} moedas`, {
      fontFamily: 'system-ui, sans-serif',
      fontSize: '12px',
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    }).setOrigin(0.5).setDepth(11);
  }

  private createPlayer() {
    const player = this.add.container(275, 1110).setDepth(40);
    const shadow = this.add.ellipse(0, 31, 56, 18, 0x173246, 0.2);

    const leftLeg = this.add.rectangle(-10, 18, 11, 26, 0x244d78).setOrigin(0.5, 0);
    const rightLeg = this.add.rectangle(10, 18, 11, 26, 0x244d78).setOrigin(0.5, 0);
    const body = this.add.rectangle(0, 0, 42, 54, 0xff7043).setStrokeStyle(4, 0xffffff);
    const armLeft = this.add.rectangle(-24, 2, 10, 34, 0xe8a073).setAngle(10);
    const armRight = this.add.rectangle(24, 2, 10, 34, 0xe8a073).setAngle(-10);
    const head = this.add.circle(0, -40, 22, 0xefb080).setStrokeStyle(4, 0xffffff);
    const hair = this.add.ellipse(0, -50, 38, 18, 0x3e2c28);
    const eye1 = this.add.circle(-7, -39, 2.5, 0x25323b);
    const eye2 = this.add.circle(7, -39, 2.5, 0x25323b);
    this.avatar = this.add.container(0, 0, [leftLeg, rightLeg, body, armLeft, armRight, head, hair, eye1, eye2]);

    this.carryBadge = this.add.container(0, -82).setVisible(false);
    const carryPlate = this.add.rectangle(0, 0, 82, 32, 0xffffff, 0.96).setStrokeStyle(3, 0x23536f);
    this.carryText = this.add.text(0, 0, '', {
      fontFamily: 'system-ui, sans-serif', fontSize: '10px', fontStyle: 'bold', color: '#173d55',
    }).setOrigin(0.5);
    this.carryBadge.add([carryPlate, this.carryText]);

    player.add([shadow, this.avatar, this.carryBadge]);
    this.player = player;
    this.target.set(player.x, player.y);

    this.tweens.add({
      targets: [leftLeg, rightLeg],
      scaleY: 0.84,
      yoyo: true,
      repeat: -1,
      duration: 360,
      ease: 'Sine.easeInOut',
    });
  }

  private setCarry(value: 'raw' | 'product' | null) {
    this.carrying = value;
    this.carryBadge?.setVisible(Boolean(value));
    this.carryText?.setText(value === 'raw' ? 'INSUMOS' : value === 'product' ? 'PEDIDO' : '');
  }

  private createActionHalo() {
    this.actionHalo = this.add.circle(0, 0, 55, 0xffffff, 0)
      .setStrokeStyle(5, 0xffffff, 0.85)
      .setDepth(9)
      .setVisible(false);
    this.tweens.add({
      targets: this.actionHalo,
      scale: 1.14,
      alpha: 0.4,
      yoyo: true,
      repeat: -1,
      duration: 620,
    });
  }

  private refreshActionHalo() {
    if (!this.actionHalo) return;

    let spot: { x: number; y: number } | null = null;
    if (this.snapshot.action === 'collectRaw') spot = SPOTS.raw;
    else if (this.snapshot.action === 'bringRaw' || this.snapshot.action === 'ready') spot = SPOTS.processor;
    else if (this.snapshot.action === 'deliver') spot = SPOTS.counter;
    else if (this.snapshot.action === 'collectPayment') spot = SPOTS.cash;
    else if (this.snapshot.action === 'free' && this.snapshot.canUpgrade && this.snapshot.upgradeLevel === 0) spot = SPOTS.upgrade;

    if (!spot) {
      this.actionHalo.setVisible(false);
      return;
    }

    this.actionHalo.setPosition(spot.x, spot.y).setVisible(true);
  }

  private createInput() {
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      if (pointer.y < 900) return;
      this.markMovementStarted();
      this.target.set(
        Phaser.Math.Clamp(pointer.x, 70, 650),
        Phaser.Math.Clamp(pointer.y, 930, 1215),
      );
    });
  }

  private markMovementStarted() {
    if (this.snapshot.action !== 'move') return;

    this.snapshot.action = 'awaitingCustomer';
    this.snapshot.objective = 'Seu primeiro cliente está chegando pela orla.';
    this.snapshot.message = 'Explore o ponto enquanto espera. As ações acontecem por proximidade.';
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
    const targetX = 105 + queueIndex * 122;
    const y = 900;
    const colors = [0xe45d87, 0x7f66d8, 0x34b5a5, 0xf29f3d, 0x4f8edb];
    const shirts = [0x2c8eb8, 0xdf6f46, 0x7057bd, 0x3ba579, 0xd39a32];
    const hairColor = colors[(queueIndex + this.snapshot.served) % colors.length];
    const shirt = shirts[(queueIndex + this.snapshot.served) % shirts.length];

    const shadow = this.add.ellipse(0, 31, 50, 16, 0x173246, 0.18);
    const legs = this.add.rectangle(0, 16, 27, 25, 0x344f70).setOrigin(0.5, 0);
    const body = this.add.rectangle(0, -2, 38, 48, shirt).setStrokeStyle(4, 0xffffff);
    const head = this.add.circle(0, -39, 19, 0xefb080).setStrokeStyle(4, 0xffffff);
    const hair = this.add.ellipse(0, -48, 32, 14, hairColor);
    const eye1 = this.add.circle(-6, -38, 2, 0x26323a);
    const eye2 = this.add.circle(6, -38, 2, 0x26323a);

    const bubble = this.add.rectangle(0, -94, 126, 52, 0xffffff, 0.96).setStrokeStyle(3, 0x2d617e);
    const order = this.add.text(0, -95, this.business.starterProduct, {
      fontFamily: 'system-ui, sans-serif',
      fontSize: '11px',
      fontStyle: 'bold',
      color: '#17304a',
      align: 'center',
      wordWrap: { width: 108 },
    }).setOrigin(0.5);
    const patienceBg = this.add.rectangle(0, -62, 72, 7, 0x173246, 0.18);
    const patience = this.add.rectangle(-36, -62, 72, 7, 0x55b86a, 1).setOrigin(0, 0.5);

    const container = this.add.container(-90, y, [
      shadow, legs, body, head, hair, eye1, eye2, bubble, order, patienceBg, patience,
    ]).setDepth(18);

    this.customers.push({ container, body, patience, arrivedAt: this.time.now, tutorial });
    this.tweens.add({ targets: container, x: targetX, duration: 600, ease: 'Back.easeOut' });

    this.snapshot.queue = this.customers.length;
    this.snapshot.message = tutorial
      ? `Primeiro pedido: ${this.business.starterProduct}.`
      : `Novo pedido: ${this.business.starterProduct}.`;

    if (this.snapshot.action === 'awaitingCustomer' || this.snapshot.action === 'free') {
      this.snapshot.action = 'collectRaw';
      this.snapshot.objective = 'Pegue os insumos no freezer de INSUMOS.';
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
    this.snapshot.objective = `Pegue ${this.business.starterProduct} na bancada de PREPARO.`;
    this.snapshot.message = 'Pedido pronto para levar ao balcão.';
    this.processorStatus?.setText(`${this.business.starterProduct}\nPRONTO`);
    this.emitState();
  }

  private checkProximityInteractions() {
    if (!this.player) return;

    if (this.snapshot.canUpgrade && this.snapshot.upgradeLevel === 0 && this.distanceTo(SPOTS.upgrade.x, SPOTS.upgrade.y) < 66) {
      this.buyUpgrade();
    }

    switch (this.snapshot.action) {
      case 'collectRaw':
        if (this.distanceTo(SPOTS.raw.x, SPOTS.raw.y) < 62) {
          this.setCarry('raw');
          this.snapshot.action = 'bringRaw';
          this.snapshot.objective = 'Leve os insumos até a bancada de PREPARO.';
          this.snapshot.message = 'Insumos coletados.';
          this.emitState();
        }
        break;
      case 'bringRaw':
        if (this.distanceTo(SPOTS.processor.x, SPOTS.processor.y) < 62) this.startProcessing();
        break;
      case 'ready':
        if (this.distanceTo(SPOTS.processor.x, SPOTS.processor.y) < 62) {
          this.setCarry('product');
          this.snapshot.action = 'deliver';
          this.snapshot.objective = `Leve ${this.business.starterProduct} ao BALCÃO.`;
          this.snapshot.message = 'Produto pronto em mãos.';
          this.processorStatus?.setText(this.business.starterProduct);
          this.emitState();
        }
        break;
      case 'deliver':
        if (this.distanceTo(SPOTS.counter.x, SPOTS.counter.y) < 72) this.deliverOrder();
        break;
      case 'collectPayment':
        if (this.distanceTo(SPOTS.cash.x, SPOTS.cash.y) < 66) this.collectPayment();
        break;
      default:
        break;
    }
  }

  private startProcessing() {
    if (this.snapshot.action !== 'bringRaw') return;

    this.setCarry(null);
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
      this.setCarry(null);
      this.snapshot.action = 'free';
      this.snapshot.objective = 'Aguarde o próximo cliente.';
      this.snapshot.message = 'Não há cliente aguardando agora.';
      this.emitState();
      return;
    }

    this.setCarry(null);
    this.snapshot.queue = this.customers.length;

    this.showFeedback(customer.container.x, customer.container.y - 125, 'ÓTIMO!', '#3fae63dd');
    this.spawnPayment(customer.container.x, customer.container.y - 20);

    this.tweens.add({
      targets: customer.container,
      alpha: 0,
      x: 790,
      duration: 700,
      delay: 180,
      ease: 'Sine.easeIn',
      onComplete: () => customer.container.destroy(true),
    });

    this.snapshot.action = 'collectPayment';
    this.snapshot.objective = 'Recolha o pagamento no CAIXA.';
    this.snapshot.message = `${this.business.starterProduct} entregue. O cliente gostou!`;
    this.refreshQueueVisual();
    this.emitState();
  }

  private spawnPayment(fromX: number, fromY: number) {
    this.paymentCoin?.destroy(true);
    const coin = this.add.circle(0, 0, 23, 0xffd23f).setStrokeStyle(5, 0xb77716);
    const symbol = this.add.text(0, 0, '¢', {
      fontFamily: 'system-ui, sans-serif',
      fontSize: '23px',
      fontStyle: 'bold',
      color: '#7a4a00',
    }).setOrigin(0.5);
    this.paymentCoin = this.add.container(fromX, fromY, [coin, symbol]).setDepth(45);

    this.tweens.add({
      targets: this.paymentCoin,
      x: SPOTS.cash.x,
      y: SPOTS.cash.y - 48,
      scale: 1.08,
      duration: 620,
      ease: 'Back.easeOut',
      onComplete: () => {
        if (!this.paymentCoin) return;
        this.tweens.add({
          targets: this.paymentCoin,
          y: SPOTS.cash.y - 62,
          yoyo: true,
          repeat: -1,
          duration: 430,
        });
      },
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
        y: coin.y - 48,
        scale: 1.6,
        duration: 300,
        onComplete: () => coin.destroy(true),
      });
    }

    this.showFeedback(SPOTS.cash.x, SPOTS.cash.y - 92, `+${this.business.saleValue}`, '#3f9d55ee');
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

  private showFeedback(x: number, y: number, text: string, backgroundColor: string) {
    const feedback = this.add.text(x, y, text, {
      fontFamily: 'system-ui, sans-serif',
      fontSize: '18px',
      fontStyle: 'bold',
      color: '#ffffff',
      backgroundColor,
      padding: { x: 9, y: 5 },
    }).setOrigin(0.5).setDepth(50);

    this.tweens.add({
      targets: feedback,
      y: y - 36,
      alpha: 0,
      duration: 850,
      ease: 'Cubic.easeOut',
      onComplete: () => feedback.destroy(),
    });
  }

  private buyUpgrade() {
    if (!this.snapshot.canUpgrade || this.snapshot.upgradeLevel > 0 || this.snapshot.cash < UPGRADE_COST) return;

    this.snapshot.cash -= UPGRADE_COST;
    this.snapshot.upgradeLevel = 1;
    this.snapshot.businessLevel = 2;
    this.snapshot.canUpgrade = false;
    this.snapshot.message = 'Melhoria instalada: preparo 20% mais rápido.';

    const burst = this.add.circle(SPOTS.upgrade.x, SPOTS.upgrade.y, 42, 0xffffff, 0)
      .setStrokeStyle(8, 0xffdf67, 0.95)
      .setDepth(40);
    this.tweens.add({
      targets: burst,
      scale: 2.2,
      alpha: 0,
      duration: 650,
      onComplete: () => burst.destroy(),
    });

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
      const ratio = Phaser.Math.Clamp(1 - elapsed / baseLimit, 0, 1);
      customer.patience.width = 72 * ratio;

      if (ratio < 0.28) {
        customer.patience.setFillStyle(0xe15b4e);
        customer.body.setFillStyle(0xd55a52);
      } else if (ratio < 0.55) {
        customer.patience.setFillStyle(0xf0a33a);
      } else {
        customer.patience.setFillStyle(0x55b86a);
      }

      const isCurrentOrder = index === 0 && ['processing', 'ready', 'deliver'].includes(this.snapshot.action);
      if (elapsed > baseLimit && !isCurrentOrder) this.abandonCustomer(index);
    }
  }

  private abandonCustomer(index: number) {
    const [customer] = this.customers.splice(index, 1);
    if (!customer) return;

    this.showFeedback(customer.container.x, customer.container.y - 115, 'Demorou...', '#c54b43dd');
    this.tweens.add({
      targets: customer.container,
      alpha: 0,
      x: -90,
      duration: 520,
      onComplete: () => customer.container.destroy(true),
    });

    this.snapshot.queue = this.customers.length;
    this.snapshot.message = 'Um cliente desistiu da espera. A venda foi perdida.';

    if (this.customers.length === 0 && (this.snapshot.action === 'collectRaw' || this.snapshot.action === 'bringRaw')) {
      this.setCarry(null);
      this.snapshot.action = 'free';
      this.snapshot.objective = 'Aguarde o próximo cliente na orla.';
    }

    this.reflowQueue();
    this.emitState();
  }

  private reflowQueue() {
    this.customers.forEach((customer, index) => {
      const x = 105 + index * 122;
      this.tweens.add({ targets: customer.container, x, duration: 260 });
    });
    this.snapshot.queue = this.customers.length;
    this.refreshQueueVisual();
  }

  private refreshQueueVisual() {
    this.queueLabel?.setText(`Fila ${this.customers.length}/${MAX_QUEUE}`);
  }

  private refreshUpgradeVisual() {
    if (!this.upgradePad || !this.upgradeLabel) return;

    if (this.snapshot.upgradeLevel > 0) {
      this.upgradePad.setFillStyle(0x4fa75b, 0.94);
      this.upgradeLabel.setText('MELHORIA ✓\nPreparo +20%');
      return;
    }

    if (this.snapshot.canUpgrade) {
      this.upgradePad.setFillStyle(0x7659cf, 0.96);
      this.upgradeLabel.setText(`MELHORIA\n${UPGRADE_COST} moedas`);
      return;
    }

    this.upgradePad.setFillStyle(0x98a5a9, 0.86);
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

  private shade(color: number, factor: number) {
    const r = Math.round(((color >> 16) & 0xff) * factor);
    const g = Math.round(((color >> 8) & 0xff) * factor);
    const b = Math.round((color & 0xff) * factor);
    return (r << 16) | (g << 8) | b;
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
    this.refreshActionHalo();
    window.dispatchEvent(new CustomEvent<GameSnapshot>(GAME_STATE_EVENT, { detail: { ...this.snapshot } }));
  }

  private resetGame() {
    localStorage.removeItem(GAME_SAVE_KEY);
    this.nextCustomerTimer?.remove(false);
    this.customers.forEach(({ container }) => container.destroy(true));
    this.customers = [];
    this.paymentCoin?.destroy(true);
    this.paymentCoin = undefined;
    this.setCarry(null);
    this.snapshot = { ...initialSnapshot };
    this.emitState();
  }
}
