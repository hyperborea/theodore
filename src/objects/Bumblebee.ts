import Phaser from "phaser";

export class Bumblebee extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "bumblebee");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setScale(4);
    this.setBounce(0.2);
  }

  static createAnimations(scene: Phaser.Scene) {
    scene.anims.create({
      key: "bumblebee-right",
      frames: scene.anims.generateFrameNumbers("bumblebee", {
        start: 0,
        end: 3,
      }),
      frameRate: 8,
      repeat: -1,
    });

    scene.anims.create({
      key: "bumblebee-left",
      frames: scene.anims.generateFrameNumbers("bumblebee", {
        start: 4,
        end: 7,
      }),
      frameRate: 8,
      repeat: -1,
    });

    scene.anims.create({
      key: "bumblebee-back",
      frames: scene.anims.generateFrameNumbers("bumblebee", {
        start: 8,
        end: 11,
      }),
      frameRate: 8,
      repeat: -1,
    });

    scene.anims.create({
      key: "bumblebee-front",
      frames: scene.anims.generateFrameNumbers("bumblebee", {
        start: 12,
        end: 15,
      }),
      frameRate: 8,
      repeat: -1,
    });
  }

  playAnimation(animationKey: string) {
    this.play("bumblebee-" + animationKey);
  }
}
