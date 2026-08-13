import Phaser from 'phaser';
import type { BusinessId } from './businesses';
import { LaranjalShowcaseScene } from './scenes/LaranjalShowcaseScene';

export function createGame(parent: HTMLElement, businessId: BusinessId) {
  return new Phaser.Game({
    type: Phaser.AUTO,
    parent,
    width: 720,
    height: 1280,
    backgroundColor: '#8bdcf3',
    scene: [new LaranjalShowcaseScene(businessId)],
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    render: {
      antialias: true,
      roundPixels: true,
    },
  });
}
