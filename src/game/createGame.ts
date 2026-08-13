import Phaser from 'phaser';
import { LaranjalScene } from './scenes/LaranjalScene';

export function createGame(parent: HTMLElement) {
  return new Phaser.Game({
    type: Phaser.AUTO,
    parent,
    width: 720,
    height: 1280,
    backgroundColor: '#8ed8f8',
    scene: [LaranjalScene],
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
