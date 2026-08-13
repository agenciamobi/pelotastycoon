import Phaser from 'phaser';
import {
  GAME_RESET_EVENT,
  GAME_STATE_EVENT,
  initialSnapshot,
  type GameSnapshot,
} from '../events';

const SAVE_KEY = 'pelotastycoon:v0.1';
const BUSINESS_COST = 500;
const SALE_VALUE = 40;
const CUSTOMER_INTERVAL = 3800;

type Customer = {
  body: Phaser.GameObjects.Arc;
  shadow: Phaser.GameObjects.Ellipse;
};

export class LaranjalScene extends Phaser.Scene {
  private snapshot: GameSnapshot = { ...initialSnapshot };
  private player?: Phaser.GameObjects.Arc;
  private target = new Phaser.Math.Vector2(360, 930);
  private customers: Customer[] = [];
  private businessLabel?: Phaser.GameObjects.Text;
  private queueLabel?: Phaser.GameObjects.Text;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private resetHandler = () => this.resetGame();

  constructor() {
    super('Laranjal');
  }

  create() {
    this.loadSave();
    this.drawWorld();
    this.createBusiness();
    this.createPlayer();
    this.createInput();
    this.cursors = this.input.keyboard?.createCursorKeys();
    this.createCustomerTimer();
    this.refreshBusinessVisual();
    this.emitState();

    window.addEventListener(GAME_RESET_EVENT, this.resetHandler);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      window.removeEventListener(GAME_RESET_EVENT, this.resetHandler);
    });
  }

  update(_: number, delta: number) {
    if (!this.player) return;

    const keyboardVector = new Phaser.Math.Vector2(
      Number(Boolean(this.cursors?.right?.isDown)) - Number(Boolean(this.cursors?.left?.isDown)),
      Number(Boolean(this.cursors?.down?.isDown)) - Number(Boolean(this.cursors?.up?.isDown)),
    );

    if (keyboardVector.lengthSq() > 0) {
      keyboardVector.normalize();
      this.target.set(
        Phaser.Math.Clamp(this.player.x + keyboardVector.x * 180, 70, 650),
        Phaser.Math.Clamp(this.player.y + keyboardVector.y * 180, 650, 1130),
      );
    }

    const direction = new Phaser.Math.Vector2(this.target.x - this.player.x, this.target.y - this.player.y);
    if (direction.length() > 7) {
      direction.normalize();
      const speed = 0.28 * delta;
      this.player.x += direction.x * speed;
      this.player.y += direction.y * speed;
    }
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

    // Trapiche estilizado: referência atual, com um único abrigo.
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
  }

  private createBusiness() {
    this.add.ellipse(500, 1108, 258, 92, 0x234119, 0.22);
    this.add.rectangle(500, 1070, 250, 180, 0xffffff).setStrokeStyle(8, 0x0a659f);
    this.add.rectangle(500, 1004, 250, 50, 0xffc93d).setStrokeStyle(6, 0xf28b21);
    this.add.rectangle(500, 1100, 52, 82, 0x4b8cb8);
    this.add.rectangle(430, 1065, 55, 44, 0x8ed8f8).setStrokeStyle(5, 0x256b91);
    this.add.rectangle(570, 1065, 55, 44, 0x8ed8f8).setStrokeStyle(5, 0x256b91);

    this.businessLabel = this.add.text(500, 1010, 'PONTO DISPONÍVEL', {
      fontFamily: 'system-ui, sans-serif',
      fontSize: '19px',
      fontStyle: 'bold',
      color: '#14314c',
      align: 'center',
    }).setOrigin(0.5);

    this.queueLabel = this.add.text(500, 1174, '', {
      fontFamily: 'system-ui, sans-serif',
      fontSize: '19px',
      fontStyle: 'bold',
      color: '#14314c',
      backgroundColor: '#ffffffdd',
      padding: { x: 12, y: 7 },
    }).setOrigin(0.5);

    const hitZone = this.add.zone(500, 1085, 300, 250).setInteractive({ useHandCursor: true });
    hitZone.on('pointerdown', () => this.interactWithBusiness());
  }

  private createPlayer() {
    this.add.ellipse(210, 1005, 52, 22, 0x173246, 0.25);
    const player = this.add.circle(210, 985, 27, 0xff6f3d).setStrokeStyle(7, 0xffffff);
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
      if (pointer.y < 650) return;
      this.target.set(
        Phaser.Math.Clamp(pointer.x, 70, 650),
        Phaser.Math.Clamp(pointer.y, 650, 1130),
      );
    });
  }

  private createCustomerTimer() {
    this.time.addEvent({
      delay: CUSTOMER_INTERVAL,
      loop: true,
      callback: () => {
        if (!this.snapshot.businessOwned || this.snapshot.queue >= 5) return;
        this.addCustomer();
      },
    });
  }

  private addCustomer() {
    const queueIndex = this.customers.length;
    const x = 120 + queueIndex * 70;
    const y = 790;
    const palette = [0xe45d87, 0x7f66d8, 0x34b5a5, 0xf29f3d, 0x4f8edb];
    const color = palette[queueIndex % palette.length];
    const shadow = this.add.ellipse(x, y + 20, 48, 18, 0x173246, 0.2);
    const body = this.add.circle(x, y, 24, color).setStrokeStyle(6, 0xffffff);
    this.customers.push({ body, shadow });
    this.snapshot.queue = this.customers.length;
    this.snapshot.message = 'Cliente esperando. Toque no seu negócio para atender.';
    this.reflowQueue();
    this.persist();
  }

  private interactWithBusiness() {
    if (!this.snapshot.businessOwned) {
      if (this.snapshot.cash < BUSINESS_COST) {
        this.snapshot.message = 'Você ainda não tem dinheiro suficiente para comprar o ponto.';
        this.emitState();
        return;
      }

      this.snapshot.businessOwned = true;
      this.snapshot.cash -= BUSINESS_COST;
      this.snapshot.message = 'Seu primeiro negócio abriu. Os clientes já vão começar a chegar.';
      this.refreshBusinessVisual();
      this.persist();
      return;
    }

    const customer = this.customers.shift();
    if (!customer) {
      this.snapshot.message = 'Nenhum cliente na fila agora. Explore o Laranjal enquanto espera.';
      this.emitState();
      return;
    }

    this.tweens.add({
      targets: [customer.body, customer.shadow],
      alpha: 0,
      x: 690,
      duration: 420,
      onComplete: () => {
        customer.body.destroy();
        customer.shadow.destroy();
      },
    });

    this.snapshot.cash += SALE_VALUE;
    this.snapshot.served += 1;
    this.snapshot.queue = this.customers.length;
    this.snapshot.businessLevel = 1 + Math.floor(this.snapshot.served / 10);
    this.snapshot.message = `Venda concluída: +R$ ${SALE_VALUE}.`;
    this.reflowQueue();
    this.persist();
  }

  private reflowQueue() {
    this.customers.forEach((customer, index) => {
      const x = 120 + index * 70;
      this.tweens.add({ targets: [customer.body, customer.shadow], x, duration: 240 });
    });
    if (this.queueLabel) {
      this.queueLabel.setText(this.snapshot.businessOwned ? `Fila: ${this.customers.length}/5` : `Comprar ponto: R$ ${BUSINESS_COST}`);
    }
    this.emitState();
  }

  private refreshBusinessVisual() {
    if (!this.businessLabel || !this.queueLabel) return;
    if (this.snapshot.businessOwned) {
      this.businessLabel.setText('LANCHERIA DO LARANJAL');
      this.queueLabel.setText(`Fila: ${this.snapshot.queue}/5`);
    } else {
      this.businessLabel.setText('PONTO DISPONÍVEL');
      this.queueLabel.setText(`Comprar ponto: R$ ${BUSINESS_COST}`);
    }
  }

  private loadSave() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Partial<GameSnapshot>;
      this.snapshot = { ...initialSnapshot, ...parsed, queue: 0 };
    } catch {
      this.snapshot = { ...initialSnapshot };
    }
  }

  private persist() {
    localStorage.setItem(SAVE_KEY, JSON.stringify({ ...this.snapshot, queue: 0 }));
    this.emitState();
  }

  private emitState() {
    window.dispatchEvent(new CustomEvent<GameSnapshot>(GAME_STATE_EVENT, { detail: { ...this.snapshot } }));
  }

  private resetGame() {
    localStorage.removeItem(SAVE_KEY);
    this.customers.forEach(({ body, shadow }) => {
      body.destroy();
      shadow.destroy();
    });
    this.customers = [];
    this.snapshot = { ...initialSnapshot };
    this.refreshBusinessVisual();
    this.emitState();
  }
}
