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
  upgrade: { x: 145, y: 1135 },
  raw: { x: 320, y: 1155 },
  processor: { x: 465, y: 1168 },
  counter: { x: 585, y: 1072 },
  cash: { x: 608, y: 1182 },
} as const;

type CarryType = 'raw' | 'product' | null;

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

export class LaranjalIsometricScene extends Phaser.Scene {
  private snapshot: GameSnapshot = { ...initialSnapshot };
  private business!: BusinessDefinition;
  private player?: Phaser.GameObjects.Container;
  private avatar?: Phaser.GameObjects.Container;
  private carryBadge?: Phaser.GameObjects.Container;
  private carryText?: Phaser.GameObjects.Text;
  private actionHalo?: Phaser.GameObjects.Arc;
  private target = new Phaser.Math.Vector2(250, 1115);
  private customers: Customer[] = [];
  private queueLabel?: Phaser.GameObjects.Text;
  private processorStatus?: Phaser.GameObjects.Text;
  private upgradeTop?: Phaser.GameObjects.Polygon;
  private upgradeLabel?: Phaser.GameObjects.Text;
  private paymentCoin?: Phaser.GameObjects.Container;
  private nextCustomerTimer?: Phaser.Time.TimerEvent;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private carrying: CarryType = null;
  private processingStartedAt = 0;
  private processingDuration = 0;
  private lastFacing = 1;
  private resetHandler = () => this.resetGame();

  constructor(private readonly requestedBusinessId: BusinessId) {
    super('LaranjalIsometric');
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
      this.scheduleNextCustomer(1200);
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
        Phaser.Math.Clamp(this.player.x + keyboardVector.x * 185, 70, 655),
        Phaser.Math.Clamp(this.player.y + keyboardVector.y * 185, 965, 1220),
      );
    }

    const direction = new Phaser.Math.Vector2(this.target.x - this.player.x, this.target.y - this.player.y);
    if (direction.length() > 7) {
      direction.normalize();
      const speed = 0.34 * delta;
      this.player.x += direction.x * speed;
      this.player.y += direction.y * speed;
      this.player.setDepth(40 + Math.floor(this.player.y / 12));

      if (Math.abs(direction.x) > 0.05) this.lastFacing = direction.x > 0 ? 1 : -1;
      if (this.avatar) this.avatar.scaleX = this.lastFacing;
    }

    this.updateProcessing();
    this.updateCustomerPatience();
    this.checkProximityInteractions();
    this.refreshActionHalo();
  }

  private drawWorld() {
    const g = this.add.graphics();

    // Céu e horizonte — fundo limpo, saturado e amigável.
    g.fillStyle(0x8bdcf3, 1);
    g.fillRect(0, 0, 720, 220);
    g.fillStyle(0xbdeaf6, 1);
    g.fillRect(0, 150, 720, 72);

    this.drawCloud(110, 92, 0.78);
    this.drawCloud(515, 72, 0.58);

    const sun = this.add.circle(620, 118, 48, 0xffd45f).setDepth(1);
    this.tweens.add({ targets: sun, scale: 1.05, yoyo: true, repeat: -1, duration: 2200 });

    // Lagoa dos Patos com shoreline em perspectiva.
    g.fillStyle(0x26a6d7, 1);
    g.fillRect(0, 208, 720, 336);
    g.fillStyle(0x1591c7, 1);
    g.fillTriangle(0, 410, 720, 352, 720, 544);
    g.fillStyle(0x69cbea, 0.55);
    for (let y = 260; y <= 480; y += 42) {
      g.fillRoundedRect(36 + (y % 70), y, 150, 6, 3);
      g.fillRoundedRect(290 + (y % 55), y + 10, 210, 5, 3);
      g.fillRoundedRect(545 - (y % 45), y - 4, 110, 5, 3);
    }

    // Areia e calçadão em faixas oblíquas para reforçar a câmera 3/4.
    g.fillStyle(0xf7d98f, 1);
    g.fillPoints([
      new Phaser.Math.Vector2(0, 520),
      new Phaser.Math.Vector2(720, 454),
      new Phaser.Math.Vector2(720, 640),
      new Phaser.Math.Vector2(0, 706),
    ], true);

    g.fillStyle(0xe6ad68, 1);
    g.fillPoints([
      new Phaser.Math.Vector2(0, 690),
      new Phaser.Math.Vector2(720, 624),
      new Phaser.Math.Vector2(720, 722),
      new Phaser.Math.Vector2(0, 788),
    ], true);

    // Paginação visual do calçadão.
    g.lineStyle(3, 0xbf7d42, 0.35);
    for (let x = -120; x < 780; x += 95) g.lineBetween(x, 702, x + 76, 770);

    // Faixa verde entre orla e avenida.
    g.fillStyle(0x78cc63, 1);
    g.fillPoints([
      new Phaser.Math.Vector2(0, 775),
      new Phaser.Math.Vector2(720, 710),
      new Phaser.Math.Vector2(720, 790),
      new Phaser.Math.Vector2(0, 855),
    ], true);

    this.drawTree(78, 815, 0.72);
    this.drawTree(644, 753, 0.78);
    this.drawLamp(165, 790, 0.72);
    this.drawLamp(555, 756, 0.68);

    // Avenida em perspectiva.
    g.fillStyle(0x46515a, 1);
    g.fillPoints([
      new Phaser.Math.Vector2(-50, 835),
      new Phaser.Math.Vector2(720, 765),
      new Phaser.Math.Vector2(770, 930),
      new Phaser.Math.Vector2(0, 1000),
    ], true);

    // Guias de pista.
    g.lineStyle(5, 0xf5e481, 0.95);
    g.lineBetween(-20, 902, 742, 833);
    g.lineStyle(4, 0xffffff, 0.65);
    g.lineBetween(-20, 852, 742, 783);
    g.lineBetween(-20, 966, 742, 897);

    // Ciclovia/berma colorida.
    g.fillStyle(0x4fb6a4, 1);
    g.fillPoints([
      new Phaser.Math.Vector2(0, 982),
      new Phaser.Math.Vector2(720, 916),
      new Phaser.Math.Vector2(720, 960),
      new Phaser.Math.Vector2(0, 1028),
    ], true);

    this.createTraffic();

    // Terreno do comércio: grande placa isométrica, clara e legível.
    this.add.polygon(365, 1120, [
      0, -150,
      322, -48,
      35, 175,
      -322, 50,
    ], 0xf2e6c8, 1).setStrokeStyle(7, 0xffffff, 0.85).setDepth(5);

    this.add.polygon(365, 1120, [
      -322, 50,
      35, 175,
      35, 195,
      -322, 70,
    ], 0xc7ad7b, 0.8).setDepth(4);

    this.add.polygon(365, 1120, [
      322, -48,
      35, 175,
      35, 195,
      322, -28,
    ], 0xb99e6d, 0.8).setDepth(4);

    this.drawTrapiche();

    this.add.text(26, 28, 'PRAIA DO LARANJAL', {
      fontFamily: 'system-ui, sans-serif',
      fontSize: '31px',
      fontStyle: 'bold',
      color: '#075078',
      stroke: '#ffffff',
      strokeThickness: 8,
    }).setDepth(8);

    const placeBadge = this.add.container(30, 78).setDepth(8);
    placeBadge.add([
      this.add.rectangle(0, 0, 140, 31, 0xffffff, 0.92).setOrigin(0, 0.5),
      this.add.circle(14, 0, 5, 0xf26342),
      this.add.text(26, 0, 'Pelotas • RS', {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '15px',
        fontStyle: 'bold',
        color: '#35667e',
      }).setOrigin(0, 0.5),
    ]);

    this.add.text(28, 610, 'ORLA DO LARANJAL', {
      fontFamily: 'system-ui, sans-serif',
      fontSize: '12px',
      fontStyle: 'bold',
      color: '#704e28',
      backgroundColor: '#fff5dbee',
      padding: { x: 10, y: 6 },
    }).setDepth(8);
  }

  private drawCloud(x: number, y: number, scale: number) {
    const cloud = this.add.container(x, y).setScale(scale).setDepth(1);
    cloud.add([
      this.add.ellipse(-38, 8, 70, 38, 0xffffff, 0.82),
      this.add.ellipse(0, 0, 92, 54, 0xffffff, 0.9),
      this.add.ellipse(44, 8, 75, 40, 0xffffff, 0.82),
    ]);
    this.tweens.add({ targets: cloud, x: x + 26, yoyo: true, repeat: -1, duration: 6800 });
  }

  private drawTree(x: number, y: number, scale: number) {
    const tree = this.add.container(x, y).setScale(scale).setDepth(12);
    tree.add([
      this.add.ellipse(0, 14, 76, 20, 0x24472b, 0.17),
      this.add.rectangle(0, -4, 15, 62, 0x925c31).setOrigin(0.5, 1),
      this.add.circle(-20, -62, 29, 0x2f9b51),
      this.add.circle(20, -62, 31, 0x42ad5d),
      this.add.circle(0, -88, 35, 0x55bd68),
    ]);
  }

  private drawLamp(x: number, y: number, scale: number) {
    const lamp = this.add.container(x, y).setScale(scale).setDepth(11);
    lamp.add([
      this.add.rectangle(0, -36, 8, 86, 0x50616a).setOrigin(0.5, 1),
      this.add.rectangle(12, -119, 30, 5, 0x50616a),
      this.add.circle(28, -119, 10, 0xfff3b2).setStrokeStyle(3, 0x50616a),
    ]);
  }

  private drawTrapiche() {
    const g = this.add.graphics().setDepth(7);

    // Passarela em perspectiva com um único abrigo, mantendo a configuração atual.
    g.fillStyle(0x74472d, 1);
    g.fillTriangle(360, 570, 435, 560, 398, 342);
    g.fillTriangle(435, 560, 478, 554, 425, 338);
    g.fillStyle(0xa76d3c, 1);
    g.fillTriangle(370, 558, 465, 548, 413, 348);

    g.lineStyle(4, 0x5b3824, 1);
    g.lineBetween(360, 570, 398, 342);
    g.lineBetween(478, 554, 425, 338);
    for (let t = 0; t <= 1; t += 0.14) {
      const lx = Phaser.Math.Linear(363, 398, t);
      const rx = Phaser.Math.Linear(475, 425, t);
      const y = Phaser.Math.Linear(562, 342, t);
      g.lineBetween(lx, y, lx - 6, y + 25);
      g.lineBetween(rx, y, rx + 6, y + 25);
    }

    g.fillStyle(0x674028, 1);
    g.fillRect(386, 302, 12, 52);
    g.fillRect(430, 298, 12, 52);
    g.fillStyle(0x96603a, 1);
    g.fillRect(378, 292, 72, 18);
    g.fillStyle(0x53321f, 1);
    g.fillTriangle(366, 294, 462, 289, 414, 254);
    g.fillStyle(0xb97a46, 0.65);
    g.fillTriangle(382, 290, 448, 287, 414, 261);
  }

  private createTraffic() {
    const cars = [
      { y: 838, start: -90, end: 800, color: 0xffb12f, delay: 0, duration: 6200 },
      { y: 888, start: 820, end: -120, color: 0xf25757, delay: 1300, duration: 7000 },
      { y: 842, start: -180, end: 820, color: 0x5f86df, delay: 2700, duration: 7600 },
    ];

    cars.forEach((config, index) => {
      const car = this.createCar(config.start, config.y, config.color, index === 2);
      const toRight = config.end > config.start;
      car.scaleX = toRight ? 1 : -1;
      this.tweens.add({
        targets: car,
        x: config.end,
        y: config.y - (toRight ? 72 : -72),
        duration: config.duration,
        delay: config.delay,
        repeat: -1,
        repeatDelay: 700,
        onRepeat: () => {
          car.x = config.start;
          car.y = config.y;
        },
      });
    });
  }

  private createCar(x: number, y: number, color: number, service = false) {
    const c = this.add.container(x, y).setDepth(18);
    const dark = service ? 0x34475c : this.shade(color, 0.72);
    c.add([
      this.add.ellipse(0, 18, 78, 18, 0x182833, 0.16),
      this.add.rectangle(0, 0, 76, 34, color).setStrokeStyle(3, 0xffffff),
      this.add.polygon(0, -23, [-28, 14, -15, -10, 17, -10, 30, 14], color, 1).setStrokeStyle(3, 0xffffff),
      this.add.rectangle(0, -24, 36, 18, 0xbceef0).setStrokeStyle(2, dark),
      this.add.circle(-25, 17, 10, dark).setStrokeStyle(3, 0xffffff),
      this.add.circle(25, 17, 10, dark).setStrokeStyle(3, 0xffffff),
    ]);

    if (service) {
      c.add(this.add.rectangle(0, -42, 24, 7, 0xf04e4e).setStrokeStyle(2, 0x4e74df));
    }
    return c;
  }

  private createBusiness() {
    const accent = this.business.color;
    const dark = this.shade(accent, 0.72);
    const light = this.tint(accent, 0.42);

    // Edificação principal com faces 3D simples.
    const building = this.add.container(472, 1045).setDepth(26);
    const top = this.add.polygon(0, -82, [0, -66, 160, -12, 0, 42, -160, -12], light, 1)
      .setStrokeStyle(5, 0xffffff);
    const left = this.add.polygon(-80, 8, [-80, -24, 80, 30, 80, 150, -80, 96], 0xf8f0dc, 1)
      .setStrokeStyle(4, dark);
    const right = this.add.polygon(80, 8, [-80, 30, 80, -24, 80, 96, -80, 150], 0xe7dcc1, 1)
      .setStrokeStyle(4, dark);
    building.add([left, right, top]);

    // Faixa da marca no topo.
    const sign = this.add.container(472, 1000).setDepth(31);
    sign.add([
      this.add.polygon(0, 0, [0, -24, 132, 20, 0, 62, -132, 18], accent, 1).setStrokeStyle(4, 0xffffff),
      this.add.text(0, 16, this.business.name.toUpperCase(), {
        fontFamily: 'system-ui, sans-serif',
        fontSize: '18px',
        fontStyle: 'bold',
        color: '#ffffff',
        stroke: '#284556',
        strokeThickness: 3,
      }).setOrigin(0.5),
    ]);

    this.createRawStation();
    this.createProcessorStation();
    this.createCounterStation(accent);
    this.createCashStation();
    this.createUpgradeZone();

    this.processorStatus = this.add.text(SPOTS.processor.x, SPOTS.processor.y + 67, this.business.starterProduct, {
      fontFamily: 'system-ui, sans-serif',
      fontSize: '11px',
      fontStyle: 'bold',
      color: '#6d5228',
      align: 'center',
      wordWrap: { width: 130 },
      backgroundColor: '#fff7e8dd',
      padding: { x: 7, y: 4 },
    }).setOrigin(0.5).setDepth(45);

    this.queueLabel = this.add.text(24, 940, '', {
      fontFamily: 'system-ui, sans-serif',
      fontSize: '13px',
      fontStyle: 'bold',
      color: '#173d55',
      backgroundColor: '#ffffffee',
      padding: { x: 10, y: 6 },
    }).setOrigin(0, 0.5).setDepth(50);
  }

  private createRawStation() {
    const c = this.isoStation(SPOTS.raw.x, SPOTS.raw.y, 92, 58, 28, 0x69bee2, 0x4294bd, 0x317da4);
    c.add([
      this.add.rectangle(0, -43, 74, 11, 0xd6f7ff).setStrokeStyle(2, 0x2f759a),
      this.add.text(0, -3, 'INSUMOS', {
        fontFamily: 'system-ui, sans-serif', fontSize: '12px', fontStyle: 'bold', color: '#ffffff',
      }).setOrigin(0.5),
    ]);
  }

  private createProcessorStation() {
    const c = this.isoStation(SPOTS.processor.x, SPOTS.processor.y, 94, 60, 28, 0xffd36a, 0xf2ad38, 0xc98222);
    c.add([
      this.add.circle(-18, -34, 8, 0x734d2d, 0.75),
      this.add.circle(18, -34, 8, 0x734d2d, 0.75),
      this.add.text(0, -2, 'PREPARO', {
        fontFamily: 'system-ui, sans-serif', fontSize: '12px', fontStyle: 'bold', color: '#ffffff',
      }).setOrigin(0.5),
    ]);
  }

  private createCounterStation(accent: number) {
    const c = this.isoStation(
      SPOTS.counter.x,
      SPOTS.counter.y,
      110,
      62,
      30,
      this.tint(accent, 0.25),
      this.shade(accent, 0.86),
      this.shade(accent, 0.67),
    );
    c.add([
      this.add.polygon(0, -42, [0, -20, 48, -2, 0, 16, -48, -2], 0xcdf5ff, 0.86).setStrokeStyle(3, 0xffffff),
      this.add.text(0, 0, 'BALCÃO', {
        fontFamily: 'system-ui, sans-serif', fontSize: '12px', fontStyle: 'bold', color: '#ffffff',
      }).setOrigin(0.5),
    ]);
  }

  private createCashStation() {
    const c = this.isoStation(SPOTS.cash.x, SPOTS.cash.y, 82, 56, 30, 0xffe16d, 0xf0c23c, 0xb8881d);
    c.add([
      this.add.rectangle(0, -42, 40, 28, 0x455561).setStrokeStyle(3, 0xffffff),
      this.add.rectangle(0, -48, 22, 8, 0xa9e7a8),
      this.add.text(0, 0, 'CAIXA', {
        fontFamily: 'system-ui, sans-serif', fontSize: '12px', fontStyle: 'bold', color: '#704f13',
      }).setOrigin(0.5),
    ]);
  }

  private createUpgradeZone() {
    const c = this.isoStation(SPOTS.upgrade.x, SPOTS.upgrade.y, 104, 62, 18, 0xb9c0c4, 0x90999d, 0x727b80);
    const top = c.list.find((child) => child instanceof Phaser.GameObjects.Polygon) as Phaser.GameObjects.Polygon | undefined;
    this.upgradeTop = top;
    c.add([
      this.add.text(0, -40, '↑', {
        fontFamily: 'system-ui, sans-serif', fontSize: '28px', fontStyle: 'bold', color: '#ffffff',
      }).setOrigin(0.5),
    ]);
    this.upgradeLabel = this.add.text(SPOTS.upgrade.x, SPOTS.upgrade.y + 38, `MELHORIA\n${UPGRADE_COST} moedas`, {
      fontFamily: 'system-ui, sans-serif',
      fontSize: '11px',
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
      backgroundColor: '#5e6a70dd',
      padding: { x: 7, y: 4 },
    }).setOrigin(0.5).setDepth(46);
  }

  private isoStation(
    x: number,
    y: number,
    width: number,
    height: number,
    depth: number,
    topColor: number,
    leftColor: number,
    rightColor: number,
  ) {
    const c = this.add.container(x, y).setDepth(35 + Math.floor(y / 20));
    c.add([
      this.add.ellipse(0, depth + 15, width + 20, 18, 0x173246, 0.13),
      this.add.polygon(-width / 4, depth / 2, [
        -width / 4, -height / 4,
        width / 4, 0,
        width / 4, depth,
        -width / 4, depth - height / 4,
      ], leftColor, 1).setStrokeStyle(3, 0xffffff, 0.72),
      this.add.polygon(width / 4, depth / 2, [
        -width / 4, 0,
        width / 4, -height / 4,
        width / 4, depth - height / 4,
        -width / 4, depth,
      ], rightColor, 1).setStrokeStyle(3, 0xffffff, 0.72),
      this.add.polygon(0, -height / 4, [
        0, -height / 2,
        width / 2, 0,
        0, height / 2,
        -width / 2, 0,
      ], topColor, 1).setStrokeStyle(4, 0xffffff),
    ]);
    return c;
  }

  private createPlayer() {
    const player = this.add.container(250, 1115).setDepth(120);
    const shadow = this.add.ellipse(0, 31, 58, 18, 0x173246, 0.18);

    const leftLeg = this.add.rectangle(-10, 18, 11, 27, 0x2e5278).setOrigin(0.5, 0);
    const rightLeg = this.add.rectangle(10, 18, 11, 27, 0x2e5278).setOrigin(0.5, 0);
    const body = this.add.rectangle(0, 0, 43, 53, 0xff7043).setStrokeStyle(4, 0xffffff);
    const armLeft = this.add.rectangle(-24, 2, 10, 34, 0xe9a376).setAngle(10);
    const armRight = this.add.rectangle(24, 2, 10, 34, 0xe9a376).setAngle(-10);
    const head = this.add.circle(0, -40, 22, 0xefb080).setStrokeStyle(4, 0xffffff);
    const hair = this.add.ellipse(0, -50, 38, 18, 0x3e2c28);
    const eye1 = this.add.circle(-7, -39, 2.5, 0x25323b);
    const eye2 = this.add.circle(7, -39, 2.5, 0x25323b);

    this.avatar = this.add.container(0, 0, [leftLeg, rightLeg, body, armLeft, armRight, head, hair, eye1, eye2]);

    this.carryBadge = this.add.container(0, -86).setVisible(false);
    const carryPlate = this.add.rectangle(0, 0, 94, 32, 0xffffff, 0.96).setStrokeStyle(3, 0x2d617e);
    this.carryText = this.add.text(0, 0, '', {
      fontFamily: 'system-ui, sans-serif',
      fontSize: '11px',
      fontStyle: 'bold',
      color: '#17304a',
      align: 'center',
    }).setOrigin(0.5);
    this.carryBadge.add([carryPlate, this.carryText]);

    player.add([shadow, this.avatar, this.carryBadge]);
    this.player = player;
    this.target.set(player.x, player.y);

    this.tweens.add({
      targets: this.avatar,
      y: 2,
      yoyo: true,
      repeat: -1,
      duration: 460,
      ease: 'Sine.easeInOut',
    });
  }

  private createActionHalo() {
    this.actionHalo = this.add.circle(0, 0, 44, 0xffffff, 0)
      .setStrokeStyle(7, 0xffef8a, 0.9)
      .setVisible(false)
      .setDepth(70);
    this.tweens.add({
      targets: this.actionHalo,
      scale: 1.22,
      alpha: 0.18,
      yoyo: true,
      repeat: -1,
      duration: 650,
    });
  }

  private refreshActionHalo() {
    if (!this.actionHalo) return;

    let spot: { x: number; y: number } | null = null;
    switch (this.snapshot.action) {
      case 'collectRaw': spot = SPOTS.raw; break;
      case 'bringRaw': spot = SPOTS.processor; break;
      case 'ready': spot = SPOTS.processor; break;
      case 'deliver': spot = SPOTS.counter; break;
      case 'collectPayment': spot = SPOTS.cash; break;
      case 'free': if (this.snapshot.canUpgrade) spot = SPOTS.upgrade; break;
      default: break;
    }

    if (!spot) {
      this.actionHalo.setVisible(false);
      return;
    }

    this.actionHalo.setPosition(spot.x, spot.y - 15).setVisible(true);
  }

  private createInput() {
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      if (pointer.y < 940) return;
      this.markMovementStarted();
      this.target.set(
        Phaser.Math.Clamp(pointer.x, 70, 655),
        Phaser.Math.Clamp(pointer.y, 965, 1220),
      );
    });
  }

  private markMovementStarted() {
    if (this.snapshot.action !== 'move') return;

    this.snapshot.action = 'awaitingCustomer';
    this.snapshot.objective = 'Seu primeiro cliente está chegando pela orla.';
    this.snapshot.message = 'Explore o ponto enquanto espera. O atendimento acontece por proximidade.';
    this.emitState();
    this.scheduleNextCustomer(950, true);
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
    const targetX = 110 + queueIndex * 122;
    const targetY = 942 - queueIndex * 8;
    const shirts = [0x2c8eb8, 0xdf6f46, 0x7057bd, 0x3ba579, 0xd39a32];
    const hairColors = [0x4c3027, 0x9b5c31, 0x272c34, 0xd2963d, 0x50372e];
    const index = (queueIndex + this.snapshot.served) % shirts.length;

    const shadow = this.add.ellipse(0, 31, 50, 16, 0x173246, 0.16);
    const legs = this.add.rectangle(0, 16, 27, 25, 0x344f70).setOrigin(0.5, 0);
    const body = this.add.rectangle(0, -2, 38, 48, shirts[index]).setStrokeStyle(4, 0xffffff);
    const head = this.add.circle(0, -39, 19, 0xefb080).setStrokeStyle(4, 0xffffff);
    const hair = this.add.ellipse(0, -48, 32, 14, hairColors[index]);
    const eye1 = this.add.circle(-6, -38, 2, 0x26323a);
    const eye2 = this.add.circle(6, -38, 2, 0x26323a);

    const bubble = this.add.rectangle(0, -96, 126, 53, 0xffffff, 0.97).setStrokeStyle(3, 0x2d617e);
    const tail = this.add.triangle(20, -67, 0, 0, 12, 0, 7, 13, 0xffffff, 0.97).setStrokeStyle(2, 0x2d617e);
    const order = this.add.text(0, -97, this.business.starterProduct, {
      fontFamily: 'system-ui, sans-serif',
      fontSize: '11px',
      fontStyle: 'bold',
      color: '#17304a',
      align: 'center',
      wordWrap: { width: 108 },
    }).setOrigin(0.5);
    const patienceBg = this.add.rectangle(0, -64, 72, 7, 0x173246, 0.16);
    const patience = this.add.rectangle(-36, -64, 72, 7, 0x55b86a, 1).setOrigin(0, 0.5);

    const container = this.add.container(-90, 870, [
      shadow, legs, body, head, hair, eye1, eye2, bubble, tail, order, patienceBg, patience,
    ]).setDepth(60 + queueIndex);

    this.customers.push({ container, body, patience, arrivedAt: this.time.now, tutorial });
    this.tweens.add({
      targets: container,
      x: targetX,
      y: targetY,
      duration: 650,
      ease: 'Back.easeOut',
    });

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
    this.snapshot.message = 'Pedido pronto. Leve-o ao balcão.';
    this.processorStatus?.setText(`${this.business.starterProduct}\nPRONTO`);
    this.showFeedback(SPOTS.processor.x, SPOTS.processor.y - 78, 'PRONTO!', '#3fae63dd');
    this.emitState();
  }

  private checkProximityInteractions() {
    if (!this.player) return;

    if (this.snapshot.canUpgrade && this.snapshot.upgradeLevel === 0 && this.distanceTo(SPOTS.upgrade.x, SPOTS.upgrade.y) < 68) {
      this.buyUpgrade();
    }

    switch (this.snapshot.action) {
      case 'collectRaw':
        if (this.distanceTo(SPOTS.raw.x, SPOTS.raw.y) < 64) {
          this.setCarry('raw');
          this.snapshot.action = 'bringRaw';
          this.snapshot.objective = 'Leve os insumos até a estação PREPARO.';
          this.snapshot.message = 'Insumos coletados.';
          this.emitState();
        }
        break;
      case 'bringRaw':
        if (this.distanceTo(SPOTS.processor.x, SPOTS.processor.y) < 64) this.startProcessing();
        break;
      case 'ready':
        if (this.distanceTo(SPOTS.processor.x, SPOTS.processor.y) < 64) {
          this.setCarry('product');
          this.snapshot.action = 'deliver';
          this.snapshot.objective = `Leve ${this.business.starterProduct} ao BALCÃO.`;
          this.snapshot.message = 'Produto pronto em mãos.';
          this.processorStatus?.setText(this.business.starterProduct);
          this.emitState();
        }
        break;
      case 'deliver':
        if (this.distanceTo(SPOTS.counter.x, SPOTS.counter.y) < 74) this.deliverOrder();
        break;
      case 'collectPayment':
        if (this.distanceTo(SPOTS.cash.x, SPOTS.cash.y) < 68) this.collectPayment();
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

    this.showFeedback(customer.container.x, customer.container.y - 126, 'ÓTIMO!', '#3fae63dd');
    this.spawnPayment(customer.container.x, customer.container.y - 20);

    this.tweens.add({
      targets: customer.container,
      alpha: 0,
      x: 795,
      y: 870,
      duration: 760,
      delay: 170,
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
    this.paymentCoin = this.add.container(fromX, fromY, [coin, symbol]).setDepth(150);

    this.tweens.add({
      targets: this.paymentCoin,
      x: SPOTS.cash.x,
      y: SPOTS.cash.y - 60,
      scale: 1.1,
      duration: 620,
      ease: 'Back.easeOut',
      onComplete: () => {
        if (!this.paymentCoin) return;
        this.tweens.add({
          targets: this.paymentCoin,
          y: SPOTS.cash.y - 74,
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
        y: coin.y - 50,
        scale: 1.65,
        duration: 310,
        onComplete: () => coin.destroy(true),
      });
    }

    this.showFeedback(SPOTS.cash.x, SPOTS.cash.y - 98, `+${this.business.saleValue}`, '#3f9d55ee');
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

  private setCarry(type: CarryType) {
    this.carrying = type;
    if (!this.carryBadge || !this.carryText) return;

    if (!type) {
      this.carryBadge.setVisible(false);
      return;
    }

    this.carryBadge.setVisible(true);
    this.carryText.setText(type === 'raw' ? 'INSUMOS' : this.business.starterProduct.toUpperCase());
  }

  private showFeedback(x: number, y: number, text: string, backgroundColor: string) {
    const feedback = this.add.text(x, y, text, {
      fontFamily: 'system-ui, sans-serif',
      fontSize: '18px',
      fontStyle: 'bold',
      color: '#ffffff',
      backgroundColor,
      padding: { x: 10, y: 6 },
    }).setOrigin(0.5).setDepth(180);

    this.tweens.add({
      targets: feedback,
      y: y - 40,
      scale: 1.08,
      alpha: 0,
      duration: 880,
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

    const burst = this.add.circle(SPOTS.upgrade.x, SPOTS.upgrade.y - 12, 38, 0xffffff, 0)
      .setStrokeStyle(8, 0xffdf67, 0.95)
      .setDepth(170);
    this.tweens.add({
      targets: burst,
      scale: 2.3,
      alpha: 0,
      duration: 650,
      onComplete: () => burst.destroy(),
    });

    this.showFeedback(SPOTS.upgrade.x, SPOTS.upgrade.y - 74, 'UPGRADE!', '#7659cfdd');

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
      customer.patience.setDisplaySize(Math.max(1, 72 * ratio), 7);

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

    this.showFeedback(customer.container.x, customer.container.y - 116, 'Demorou...', '#c54b43dd');
    this.tweens.add({
      targets: customer.container,
      alpha: 0,
      x: -100,
      y: 900,
      duration: 540,
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
      this.tweens.add({
        targets: customer.container,
        x: 110 + index * 122,
        y: 942 - index * 8,
        duration: 270,
      });
    });
    this.snapshot.queue = this.customers.length;
    this.refreshQueueVisual();
  }

  private refreshQueueVisual() {
    this.queueLabel?.setText(`Fila ${this.customers.length}/${MAX_QUEUE}`);
  }

  private refreshUpgradeVisual() {
    if (!this.upgradeLabel) return;

    if (this.snapshot.upgradeLevel > 0) {
      this.upgradeTop?.setFillStyle(0x58b868, 1);
      this.upgradeLabel.setText('MELHORIA ✓\nPreparo +20%').setBackgroundColor('#3d8e4ddd');
      return;
    }

    if (this.snapshot.canUpgrade) {
      this.upgradeTop?.setFillStyle(0x8f73e4, 1);
      this.upgradeLabel.setText(`MELHORIA\n${UPGRADE_COST} moedas`).setBackgroundColor('#6950badd');
      return;
    }

    this.upgradeTop?.setFillStyle(0xb9c0c4, 1);
    this.upgradeLabel.setText(`MELHORIA\n${UPGRADE_COST} moedas`).setBackgroundColor('#5e6a70dd');
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
    return (Phaser.Math.Clamp(r, 0, 255) << 16) | (Phaser.Math.Clamp(g, 0, 255) << 8) | Phaser.Math.Clamp(b, 0, 255);
  }

  private tint(color: number, amount: number) {
    const r = (color >> 16) & 0xff;
    const g = (color >> 8) & 0xff;
    const b = color & 0xff;
    const mix = (channel: number) => Math.round(channel + (255 - channel) * amount);
    return (mix(r) << 16) | (mix(g) << 8) | mix(b);
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
    this.nextCustomerTimer = undefined;
    this.customers.forEach(({ container }) => container.destroy(true));
    this.customers = [];
    this.paymentCoin?.destroy(true);
    this.paymentCoin = undefined;
    this.setCarry(null);
    this.snapshot = { ...initialSnapshot };
    this.emitState();
  }
}
