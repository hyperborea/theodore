import Phaser from "phaser";

export class Fox extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "fox");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setScale(4);
    this.setBounce(0.2);
  }

  static createAnimations(scene: Phaser.Scene) {
    scene.anims.create({
      key: "fox-idle",
      frames: scene.anims.generateFrameNumbers("fox", { start: 0, end: 4 }),
      frameRate: 8,
      repeat: -1,
    });

    scene.anims.create({
      key: "fox-idle-2",
      frames: scene.anims.generateFrameNumbers("fox", { start: 14, end: 27 }),
      frameRate: 8,
      repeat: -1,
    });

    scene.anims.create({
      key: "fox-walk",
      frames: scene.anims.generateFrameNumbers("fox", { start: 28, end: 35 }),
      frameRate: 8,
      repeat: -1,
    });

    scene.anims.create({
      key: "fox-jump",
      frames: scene.anims.generateFrameNumbers("fox", { start: 42, end: 52 }),
      frameRate: 8,
      repeat: -1,
    });

    scene.anims.create({
      key: "fox-damage",
      frames: scene.anims.generateFrameNumbers("fox", { start: 56, end: 60 }),
      frameRate: 8,
      repeat: -1,
    });

    scene.anims.create({
      key: "fox-sleep",
      frames: scene.anims.generateFrameNumbers("fox", { start: 70, end: 75 }),
      frameRate: 8,
      repeat: -1,
    });

    scene.anims.create({
      key: "fox-death",
      frames: scene.anims.generateFrameNumbers("fox", { start: 84, end: 90 }),
      frameRate: 8,
      repeat: -1,
    });
  }

  playAnimation(animationKey: string) {
    this.play("fox-" + animationKey);
  }
}
