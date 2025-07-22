import Phaser from "phaser";

export class Hero extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "hero");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setScale(4);
    this.setBounce(0.2);
  }

  static createAnimations(scene: Phaser.Scene) {
    scene.anims.create({
      key: "hero-idle",
      frames: scene.anims.generateFrameNumbers("hero", { start: 0, end: 5 }),
      frameRate: 8,
      repeat: -1,
    });

    scene.anims.create({
      key: "hero-walk",
      frames: scene.anims.generateFrameNumbers("hero", { start: 9, end: 16 }),
      frameRate: 8,
      repeat: -1,
    });

    scene.anims.create({
      key: "hero-fight-1",
      frames: scene.anims.generateFrameNumbers("hero", {
        start: 18,
        end: 26,
      }),
      frameRate: 8,
      repeat: -1,
    });

    scene.anims.create({
      key: "hero-damage",
      frames: scene.anims.generateFrameNumbers("hero", {
        start: 27,
        end: 30,
      }),
      frameRate: 8,
      repeat: -1,
    });

    scene.anims.create({
      key: "hero-death",
      frames: scene.anims.generateFrameNumbers("hero", {
        start: 36,
        end: 42,
      }),
      frameRate: 8,
      repeat: -1,
    });

    scene.anims.create({
      key: "hero-fight-2",
      frames: scene.anims.generateFrameNumbers("hero", {
        start: 45,
        end: 53,
      }),
      frameRate: 8,
      repeat: -1,
    });

    scene.anims.create({
      key: "hero-fight-3",
      frames: scene.anims.generateFrameNumbers("hero", {
        start: 54,
        end: 59,
      }),
      frameRate: 8,
      repeat: -1,
    });
  }

  playAnimation(animationKey: string) {
    this.play("hero-" + animationKey);
  }
}
