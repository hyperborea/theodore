import Phaser from "phaser";
import { Player } from "~/objects/Player";
import { Turtle } from "~/objects/Turtle";

export class MainScene extends Phaser.Scene {
  private player!: Player;

  constructor() {
    super("MainScene");
  }

  create() {
    // // Enable physics debug rendering
    // this.physics.world.createDebugGraphic();

    const platform = this.physics.add.staticGroup();
    for (let x = 0; x <= 700; x += 64) {
      platform.create(x, this.scale.height - 32, "platform");
    }

    const platformY = this.scale.height - 32;
    const player = new Turtle(this, 100, platformY - 32 * 4);
    player.playAnimation("idle");
    this.physics.add.collider(player, platform);
    this.player = player;
  }

  update() {
    const cursors = this.input.keyboard!.createCursorKeys();
    this.player.handleControls(cursors);
  }
}
