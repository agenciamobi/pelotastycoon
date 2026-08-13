import Phaser from 'phaser';
import { getBusinessDefinition, type BusinessId } from '../businesses';
import { LaranjalIsometricScene } from './LaranjalIsometricScene';

type AmbientPersonConfig = {
  x: number;
  y: number;
  direction: 1 | -1;
  shirt: number;
  duration: number;
  delay: number;
};

/**
 * Camada de acabamento visual sobre a cena jogável.
 * Mantém o core loop isolado e permite evoluir o "game feel" sem acoplar
 * ambientação, props e identidade visual às regras de gameplay.
 */
export class LaranjalShowcaseScene extends LaranjalIsometricScene {
  private readonly showcaseBusinessId: BusinessId;

  constructor(businessId: BusinessId) {
    super(businessId);
    this.showcaseBusinessId = businessId;
  }

  create() {
    super.create();

    this.createWaterSparkles();
    this.createBeachLife();
    this.createPromenadeFurniture();
    this.createAmbientPeople();
    this.createBusinessSignature();
    this.createForegroundGreenery();
  }

  private createWaterSparkles() {
    const sparkles = [
      { x: 112, y: 292, width: 72, delay: 0 },
      { x: 292, y: 348, width: 92, delay: 600 },
      { x: 548, y: 270, width: 62, delay: 1200 },
      { x: 610, y: 420, width: 104, delay: 1700 },
      { x: 210, y: 456, width: 76, delay: 900 },
    ];

    sparkles.forEach(({ x, y, width, delay }) => {
      const shine = this.add.rectangle(x, y, width, 4, 0xffffff, 0.42)
        .setAngle(-4)
        .setDepth(3);
      this.tweens.add({
        targets: shine,
        alpha: { from: 0.18, to: 0.68 },
        scaleX: { from: 0.72, to: 1.08 },
        yoyo: true,
        repeat: -1,
        delay,
        duration: 1500,
        ease: 'Sine.easeInOut',
      });
    });
  }

  private createBeachLife() {
    this.createUmbrella(105, 620, 0xf45e61, 0xffd35e, 0.72);
    this.createUmbrella(610, 566, 0x4f84df, 0xffffff, 0.58);
    this.createBeachChair(175, 634, 0x3fa6c9, 0.7);
    this.createBeachChair(555, 598, 0xef7657, 0.62);

    const ball = this.add.container(305, 612).setDepth(9);
    ball.add([
      this.add.circle(0, 0, 10, 0xffffff).setStrokeStyle(2, 0xd95a45),
      this.add.arc(0, 0, 8, 220, 320, false, 0x4f84df, 1),
    ]);
    this.tweens.add({
      targets: ball,
      y: 602,
      angle: 12,
      yoyo: true,
      repeat: -1,
      duration: 950,
      ease: 'Sine.easeInOut',
    });
  }

  private createUmbrella(x: number, y: number, primary: number, secondary: number, scale: number) {
    const umbrella = this.add.container(x, y).setScale(scale).setDepth(9);
    const shade = this.add.graphics();
    shade.fillStyle(primary, 1);
    shade.fillTriangle(-48, -25, 0, -72, 0, -25);
    shade.fillStyle(secondary, 1);
    shade.fillTriangle(0, -72, 48, -25, 0, -25);
    shade.lineStyle(4, 0xffffff, 0.85);
    shade.lineBetween(-48, -25, 48, -25);
    umbrella.add([
      this.add.ellipse(0, 4, 70, 16, 0x6b4b2c, 0.12),
      this.add.rectangle(0, -8, 6, 78, 0x9a6a3b).setOrigin(0.5, 1),
      shade,
    ]);
  }

  private createBeachChair(x: number, y: number, color: number, scale: number) {
    const chair = this.add.container(x, y).setScale(scale).setDepth(9);
    const frame = this.add.graphics();
    frame.lineStyle(5, 0xffffff, 0.95);
    frame.lineBetween(-22, 4, 20, -30);
    frame.lineBetween(-20, 5, 24, 8);
    frame.lineBetween(20, -30, 28, 8);
    frame.lineStyle(13, color, 1);
    frame.lineBetween(-13, -1, 18, -25);
    chair.add(frame);
  }

  private createPromenadeFurniture() {
    this.createBench(250, 736, 0.78);
    this.createBench(534, 708, 0.66);
    this.createBike(86, 762, 0.7);

    [335, 430].forEach((x, index) => {
      const bin = this.add.container(x, 722 - index * 8).setScale(0.65).setDepth(13);
      bin.add([
        this.add.ellipse(0, 8, 42, 12, 0x173246, 0.13),
        this.add.rectangle(0, -8, 30, 44, 0x3e8790).setStrokeStyle(3, 0xffffff),
        this.add.rectangle(0, -31, 34, 7, 0x275e64),
      ]);
    });
  }

  private createBench(x: number, y: number, scale: number) {
    const bench = this.add.container(x, y).setScale(scale).setDepth(13);
    bench.add([
      this.add.ellipse(0, 14, 100, 20, 0x173246, 0.12),
      this.add.rectangle(0, -7, 88, 13, 0xa66a39).setStrokeStyle(3, 0xffffff, 0.65),
      this.add.rectangle(0, -28, 88, 12, 0xb97b45).setStrokeStyle(3, 0xffffff, 0.65),
      this.add.rectangle(-34, 8, 7, 32, 0x52636b),
      this.add.rectangle(34, 8, 7, 32, 0x52636b),
    ]);
  }

  private createBike(x: number, y: number, scale: number) {
    const bike = this.add.container(x, y).setScale(scale).setDepth(14);
    const g = this.add.graphics();
    g.lineStyle(5, 0x324d67, 1);
    g.strokeCircle(-27, 0, 18);
    g.strokeCircle(27, 0, 18);
    g.lineBetween(-27, 0, 0, -28);
    g.lineBetween(0, -28, 10, 0);
    g.lineBetween(10, 0, -27, 0);
    g.lineBetween(10, 0, 27, 0);
    g.lineBetween(0, -28, 27, 0);
    g.lineStyle(6, 0xf16645, 1);
    g.lineBetween(-4, -29, 13, -29);
    bike.add(g);
  }

  private createAmbientPeople() {
    const people: AmbientPersonConfig[] = [
      { x: -45, y: 748, direction: 1, shirt: 0xe65f74, duration: 8600, delay: 600 },
      { x: 760, y: 724, direction: -1, shirt: 0x5e7ed8, duration: 9800, delay: 1700 },
      { x: -80, y: 792, direction: 1, shirt: 0x45a87a, duration: 10500, delay: 3200 },
    ];

    people.forEach((config, index) => {
      const person = this.createAmbientPerson(config.x, config.y, config.shirt, 0.62 + index * 0.04);
      person.scaleX = config.direction;
      const endX = config.direction === 1 ? 790 : -80;
      const endY = config.y - config.direction * 74;

      this.tweens.add({
        targets: person,
        x: endX,
        y: endY,
        delay: config.delay,
        duration: config.duration,
        repeat: -1,
        repeatDelay: 900,
        onRepeat: () => {
          person.x = config.x;
          person.y = config.y;
        },
      });
    });
  }

  private createAmbientPerson(x: number, y: number, shirt: number, scale: number) {
    const person = this.add.container(x, y).setScale(scale).setDepth(16);
    const leftLeg = this.add.rectangle(-7, 12, 8, 25, 0x314d68).setOrigin(0.5, 0);
    const rightLeg = this.add.rectangle(7, 12, 8, 25, 0x314d68).setOrigin(0.5, 0);
    const body = this.add.rectangle(0, -2, 34, 44, shirt).setStrokeStyle(3, 0xffffff);
    const head = this.add.circle(0, -34, 16, 0xe9aa7d).setStrokeStyle(3, 0xffffff);
    const hair = this.add.ellipse(0, -43, 28, 12, 0x4b342a);
    person.add([
      this.add.ellipse(0, 34, 45, 13, 0x173246, 0.12),
      leftLeg,
      rightLeg,
      body,
      head,
      hair,
    ]);

    this.tweens.add({
      targets: [leftLeg, rightLeg],
      angle: { from: -8, to: 8 },
      yoyo: true,
      repeat: -1,
      duration: 280,
      ease: 'Sine.easeInOut',
    });

    return person;
  }

  private createBusinessSignature() {
    const business = getBusinessDefinition(this.showcaseBusinessId);
    const accent = business.color;
    const dark = this.shadeColor(accent, 0.72);

    const pedestal = this.add.container(652, 1010).setDepth(34);
    pedestal.add([
      this.add.ellipse(0, 42, 92, 22, 0x173246, 0.14),
      this.add.polygon(0, 20, [0, -22, 42, -6, 0, 13, -42, -6], dark, 1).setStrokeStyle(3, 0xffffff),
      this.add.polygon(-21, 34, [-21, -20, 21, -5, 21, 28, -21, 13], accent, 1).setStrokeStyle(2, 0xffffff, 0.75),
      this.add.polygon(21, 34, [-21, -5, 21, -20, 21, 13, -21, 28], this.shadeColor(accent, 0.82), 1)
        .setStrokeStyle(2, 0xffffff, 0.75),
    ]);

    const prop = this.add.container(652, 938).setDepth(36);
    this.drawBusinessProp(prop, this.showcaseBusinessId, accent);

    this.tweens.add({
      targets: prop,
      y: 931,
      yoyo: true,
      repeat: -1,
      duration: 1350,
      ease: 'Sine.easeInOut',
    });
  }

  private drawBusinessProp(container: Phaser.GameObjects.Container, businessId: BusinessId, accent: number) {
    switch (businessId) {
      case 'sorveteria': {
        const cone = this.add.graphics();
        cone.fillStyle(0xd89345, 1);
        cone.fillTriangle(-20, 4, 20, 4, 0, 62);
        cone.lineStyle(3, 0xb97431, 0.7);
        cone.lineBetween(-13, 13, 9, 48);
        cone.lineBetween(13, 13, -9, 48);
        container.add([
          cone,
          this.add.circle(-11, -4, 24, 0xf37ca0).setStrokeStyle(4, 0xffffff),
          this.add.circle(12, -8, 26, 0x7fc9ed).setStrokeStyle(4, 0xffffff),
          this.add.circle(0, -30, 24, 0xffdf74).setStrokeStyle(4, 0xffffff),
        ]);
        break;
      }
      case 'pizzaria': {
        const pizza = this.add.circle(0, 2, 43, 0xf3b84b).setStrokeStyle(7, 0xd88632);
        container.add([
          pizza,
          this.add.circle(-16, -8, 7, 0xd84d45),
          this.add.circle(13, -14, 7, 0xd84d45),
          this.add.circle(16, 14, 7, 0xd84d45),
          this.add.circle(-12, 16, 6, 0x55a85d),
          this.add.circle(2, 0, 6, 0x55a85d),
        ]);
        break;
      }
      case 'pastelaria': {
        const pastel = this.add.ellipse(0, 0, 92, 52, 0xf3c660).setStrokeStyle(5, 0xc98b31);
        container.add([
          pastel,
          this.add.arc(0, 0, 36, 190, 350, false, 0xffe69b, 1),
          this.add.text(0, 4, 'PASTEL', {
            fontFamily: 'system-ui, sans-serif', fontSize: '13px', fontStyle: 'bold', color: '#8b5a22',
          }).setOrigin(0.5),
        ]);
        break;
      }
      case 'lancheria': {
        container.add([
          this.add.ellipse(0, -15, 86, 30, 0xf0b449).setStrokeStyle(4, 0xffffff),
          this.add.rectangle(0, 0, 80, 15, 0x52a95c),
          this.add.rectangle(0, 12, 76, 18, 0x744329),
          this.add.rectangle(0, 25, 82, 10, 0xffd55a),
          this.add.ellipse(0, 33, 86, 24, 0xe7a843),
        ]);
        break;
      }
      case 'peixaria': {
        const fish = this.add.graphics();
        fish.fillStyle(accent, 1);
        fish.fillEllipse(0, 0, 88, 44);
        fish.fillTriangle(-42, 0, -74, -26, -74, 26);
        fish.fillStyle(0xffffff, 0.9);
        fish.fillCircle(26, -6, 5);
        fish.fillStyle(0x26323a, 1);
        fish.fillCircle(27, -6, 2);
        container.add(fish);
        break;
      }
      case 'churrascaria': {
        const skewer = this.add.graphics();
        skewer.lineStyle(6, 0x7c5a3d, 1);
        skewer.lineBetween(-45, 45, 45, -45);
        [-26, -5, 16].forEach((offset) => {
          skewer.fillStyle(0x8d4f34, 1);
          skewer.fillRoundedRect(offset - 15, -offset - 12, 33, 24, 8);
        });
        container.add(skewer);
        break;
      }
      default:
        break;
    }
  }

  private createForegroundGreenery() {
    this.createPottedPlant(68, 1178, 0.8);
    this.createPottedPlant(665, 1205, 0.74);

    const flowers = this.add.container(84, 1228).setDepth(60);
    for (let i = 0; i < 7; i += 1) {
      const angle = (Math.PI * 2 * i) / 7;
      flowers.add(this.add.circle(Math.cos(angle) * 18, Math.sin(angle) * 9, 6, i % 2 ? 0xff7a8d : 0xffd65f));
    }
    flowers.add(this.add.circle(0, 0, 14, 0x4ba95c));
  }

  private createPottedPlant(x: number, y: number, scale: number) {
    const plant = this.add.container(x, y).setScale(scale).setDepth(58);
    const leaves = this.add.graphics();
    leaves.fillStyle(0x3fa85a, 1);
    leaves.fillEllipse(-14, -34, 24, 50);
    leaves.fillEllipse(13, -36, 24, 54);
    leaves.fillStyle(0x55bb67, 1);
    leaves.fillEllipse(0, -49, 25, 55);
    plant.add([
      this.add.ellipse(0, 9, 55, 15, 0x173246, 0.13),
      this.add.polygon(0, 0, [-24, -18, 24, -18, 18, 18, -18, 18], 0xc57643, 1).setStrokeStyle(3, 0xffffff, 0.7),
      leaves,
    ]);
  }

  private shadeColor(color: number, factor: number) {
    const r = Math.round(((color >> 16) & 0xff) * factor);
    const g = Math.round(((color >> 8) & 0xff) * factor);
    const b = Math.round((color & 0xff) * factor);
    return (r << 16) | (g << 8) | b;
  }
}
