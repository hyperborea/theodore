import Phaser from "phaser";
import { Player } from "~/objects/Player";
import { Turtle } from "~/objects/Turtle";

export class MainScene extends Phaser.Scene {
  private player!: Player;
  private jumpKeyPressed: boolean = false;

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
      player.setFlipX(true);
      player.playAnimation("walk");
    } else if (cursors.right?.isDown) {
      player.setVelocityX(160);
      player.setFlipX(false);
      player.playAnimation("walk");
    } else {
      player.setVelocityX(0);
      player.playAnimation("idle");
    }

    // Reset jump counter when touching ground
    if (player.body?.touching.down) {
      player.jumpCount = 0;
    }

    // Double jump logic - only jump on key press, not hold
    if (cursors.up?.isDown && !this.jumpKeyPressed && player.jumpCount < player.maxJumps) {
      player.setVelocityY(-330);
      player.jumpCount++;
      this.jumpKeyPressed = true;
    }
    
    // Reset jump key tracking when released
    if (!cursors.up?.isDown) {
      this.jumpKeyPressed = false;
    }
  }
}
