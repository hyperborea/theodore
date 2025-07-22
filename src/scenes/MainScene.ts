import Phaser from "phaser";
import { Turtle } from "~/objects/Turtle";

export class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  create() {
    const platform = this.physics.add.staticGroup();
    for (let x = 0; x <= 700; x += 64) {
      platform.create(x, 400, "platform");
    }

    const turtle = new Turtle(this, 200, 250);
    turtle.playAnimation("idle");
    this.physics.add.collider(turtle, platform);
  }
}
