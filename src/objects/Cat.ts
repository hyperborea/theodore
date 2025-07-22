import Phaser from "phaser";

export class Cat extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "cat");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setScale(4);
    this.setBounce(0.2);
  }

  static createAnimations(scene: Phaser.Scene) {
    scene.anims.create({
      key: "cat-idle-1",
      frames: scene.anims.generateFrameNumbers("cat", { start: 0, end: 3 }),
      frameRate: 8,
      repeat: -1,
    });

    scene.anims.create({
      key: "cat-idle-2",
      frames: scene.anims.generateFrameNumbers("cat", { start: 8, end: 11 }),
      frameRate: 8,
      repeat: -1,
    });

    scene.anims.create({
      key: "cat-idle-3",
      frames: scene.anims.generateFrameNumbers("cat", { start: 16, end: 19 }),
      frameRate: 8,
      repeat: -1,
    });

    scene.anims.create({
      key: "cat-idle-4",
      frames: scene.anims.generateFrameNumbers("cat", { start: 24, end: 27 }),
      frameRate: 8,
      repeat: -1,
    });

    scene.anims.create({
      key: "cat-walk",
      frames: scene.anims.generateFrameNumbers("cat", { start: 32, end: 39 }),
      frameRate: 8,
      repeat: -1,
    });

    scene.anims.create({
      key: "cat-run",
      frames: scene.anims.generateFrameNumbers("cat", { start: 40, end: 47 }),
      frameRate: 8,
      repeat: -1,
    });

    scene.anims.create({
      key: "cat-sleep",
      frames: scene.anims.generateFrameNumbers("cat", { start: 48, end: 51 }),
      frameRate: 8,
      repeat: -1,
    });

    scene.anims.create({
      key: "cat-touch",
      frames: scene.anims.generateFrameNumbers("cat", { start: 56, end: 61 }),
      frameRate: 8,
      repeat: -1,
    });

    scene.anims.create({
      key: "cat-jump",
      frames: scene.anims.generateFrameNumbers("cat", { start: 64, end: 69 }),
      frameRate: 8,
      repeat: -1,
    });

    scene.anims.create({
      key: "cat-stretch",
      frames: scene.anims.generateFrameNumbers("cat", { start: 72, end: 79 }),
      frameRate: 8,
      repeat: -1,
    });
  }

  playAnimation(animationKey: string) {
    this.play("cat-" + animationKey);
  }
}
