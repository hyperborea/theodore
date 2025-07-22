import Phaser from "phaser";

export class Cake extends Phaser.Physics.Arcade.Sprite {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    frameIndex: number = 0
  ) {
    super(scene, x, y, "cakes", frameIndex);
    scene.add.existing(this);
    scene.physics.add.existing(this, true);
    this.setScale(2);
  }

  // Static method to create a cake sprite with a specific frame index
  static create(
    scene: Phaser.Scene,
    x: number,
    y: number,
    frameIndex: number
  ): Cake {
    return new Cake(scene, x, y, frameIndex);
  }
}
