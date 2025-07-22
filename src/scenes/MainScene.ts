import Phaser from "phaser";
import { Player } from "~/objects/Player";
import { Turtle } from "~/objects/Turtle";
import { HealthSystem } from "~/objects/HealthSystem";
import { GameOverPopup } from "~/objects/GameOverPopup";

export class MainScene extends Phaser.Scene {
  private player!: Player;
  private healthSystem!: HealthSystem;
  private gameOverPopup!: GameOverPopup;

  constructor() {
    super("MainScene");
  }

  create() {
    // this.physics.world.createDebugGraphic();

    this.healthSystem = new HealthSystem(this, 32, 32);
    this.healthSystem.setGameOverCallback(() => {
      this.gameOverPopup.show();
    });

    const platform = this.physics.add.staticGroup();
    for (let x = 200; x <= 700; x += 64) {
      platform.create(x, this.scale.height - 32, "tiles", "block_plank");
    }

    const platformY = this.scale.height - 32;
    const player = new Turtle(this, 250, platformY - 32 * 4);
    player.playAnimation("idle");
    player.setHealthSystem(this.healthSystem);
    this.physics.add.collider(player, platform);
    this.player = player;

    this.gameOverPopup = new GameOverPopup(this);
    this.gameOverPopup.setRetryCallback(() => {
      this.restartGame();
    });
  }

  update() {
    const cursors = this.input.keyboard!.createCursorKeys();
    this.player.handleControls(cursors);
    this.player.handleUpdate();
  }

  private restartGame() {
    this.healthSystem.reset();
    this.player.respawn();
  }
}
