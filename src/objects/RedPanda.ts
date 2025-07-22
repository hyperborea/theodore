import Phaser from "phaser";
import { Player } from "./Player";

export class RedPanda extends Player {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "redpanda");
  }

  static createAnimations(scene: Phaser.Scene) {
    scene.anims.create({
      key: "redpanda-idle",
      frames: scene.anims.generateFrameNumbers("redpanda", {
        start: 0,
        end: 5,
      }),
      frameRate: 8,
      repeat: -1,
    });

    scene.anims.create({
      key: "redpanda-idle-2",
      frames: scene.anims.generateFrameNumbers("redpanda", {
        start: 8,
        end: 13,
      }),
      frameRate: 8,
      repeat: -1,
    });

    scene.anims.create({
      key: "redpanda-walk",
      frames: scene.anims.generateFrameNumbers("redpanda", {
        start: 16,
        end: 23,
      }),
      frameRate: 8,
      repeat: -1,
    });

    scene.anims.create({
      key: "redpanda-fight",
      frames: scene.anims.generateFrameNumbers("redpanda", {
        start: 24,
        end: 31,
      }),
      frameRate: 8,
      repeat: -1,
    });

    scene.anims.create({
      key: "redpanda-damage",
      frames: scene.anims.generateFrameNumbers("redpanda", {
        start: 32,
        end: 36,
      }),
      frameRate: 8,
      repeat: -1,
    });

    scene.anims.create({
      key: "redpanda-death",
      frames: scene.anims.generateFrameNumbers("redpanda", {
        start: 40,
        end: 47,
      }),
      frameRate: 8,
      repeat: -1,
    });

    scene.anims.create({
      key: "redpanda-sleep",
      frames: scene.anims.generateFrameNumbers("redpanda", {
        start: 48,
        end: 55,
      }),
      frameRate: 8,
      repeat: -1,
    });
  }

}
