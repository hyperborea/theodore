import Phaser from "phaser";

export abstract class Player extends Phaser.Physics.Arcade.Sprite {
  public jumpCount: number = 0;
  public maxJumps: number = 2;
  protected characterName: string;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);

    this.characterName = texture;

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setScale(4);
    this.setBounce(0.2);
    this.setCollideWorldBounds(true);

    const boxWidth = 20;
    const boxHeight = 15;
    this.setSize(boxWidth, boxHeight);
    this.setOffset((this.width - boxWidth) / 2, this.height - boxHeight);
  }

  playAnimation(animationKey: string) {
    this.play(`${this.characterName}-${animationKey}`, true);
  }

  // Subclasses should implement a static createAnimations(scene: Phaser.Scene): void method
}
