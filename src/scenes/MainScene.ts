import Phaser from "phaser";
import { Turtle } from "~/objects/Turtle";

export class MainScene extends Phaser.Scene {
  private player!: Turtle;

  constructor() {
    super("MainScene");
  }

  create() {
    const platform = this.physics.add.staticGroup();
    for (let x = 0; x <= 700; x += 64) {
      platform.create(x, this.scale.height - 32, "platform");
    }

    const platformY = this.scale.height - 32;
    const turtle = new Turtle(this, 100, platformY - 32 * 4);
    turtle.playAnimation("idle");
    this.physics.add.collider(turtle, platform);

    this.player = turtle;
  }

  update() {
    const player = this.player;

    const cursors = this.input.keyboard!.createCursorKeys();
    if (cursors.left?.isDown) {
      player.setVelocityX(-160);
      player.playAnimation("walk");
    } else if (cursors.right?.isDown) {
      player.setVelocityX(160);
      player.playAnimation("walk");
    } else {
      player.setVelocityX(0);
      player.playAnimation("idle");
    }

    if (cursors.up?.isDown && player.body?.touching.down) {
      player.setVelocityY(-330);
      // player.playAnimation("jump");
    }
  }
}
