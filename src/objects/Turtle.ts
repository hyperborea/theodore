import Phaser from "phaser";
import { Player } from "./Player";

export class Turtle extends Player {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "turtle");
  }

  static createAnimations(scene: Phaser.Scene) {
    scene.anims.create({
      key: "turtle-yawn",
      frames: scene.anims.generateFrameNumbers("turtle", { start: 0, end: 11 }),
      frameRate: 8,
      repeat: -1,
    });

    scene.anims.create({
      key: "turtle-idle",
      frames: scene.anims.generateFrameNumbers("turtle", {
        start: 12,
        end: 21,
      }),
      frameRate: 8,
      repeat: -1,
    });

    scene.anims.create({
      key: "turtle-walk",
      frames: scene.anims.generateFrameNumbers("turtle", {
        start: 24,
        end: 27,
      }),
      frameRate: 8,
      repeat: -1,
    });

    scene.anims.create({
      key: "turtle-sleep",
      frames: scene.anims.generateFrameNumbers("turtle", {
        start: 36,
        end: 41,
      }),
      frameRate: 8,
      repeat: -1,
    });

    scene.anims.create({
      key: "turtle-bite",
      frames: scene.anims.generateFrameNumbers("turtle", {
        start: 48,
        end: 52,
      }),
      frameRate: 8,
      repeat: -1,
    });

    scene.anims.create({
      key: "turtle-withdraw",
      frames: scene.anims.generateFrameNumbers("turtle", {
        start: 60,
        end: 69,
      }),
      frameRate: 8,
      repeat: -1,
    });
  }
}
