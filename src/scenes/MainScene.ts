import Phaser from "phaser";
import { Player } from "~/objects/Player";
import { Turtle } from "~/objects/Turtle";
import { HealthDisplay } from "~/objects/HealthDisplay";
import { GameOverPopup } from "~/objects/GameOverPopup";

export class MainScene extends Phaser.Scene {
  private player!: Player;
  private healthDisplay!: HealthDisplay;
  private gameOverPopup!: GameOverPopup;

  constructor() {
    super("MainScene");
  }

  create() {
    // this.physics.world.createDebugGraphic();

    // Add clouds at the top
    const cloudTexture = this.textures
      .get("backgrounds")
      .get("background_clouds");
    const cloudWidth = cloudTexture.width;
    const cloudHeight = cloudTexture.height;
    const numCloudTiles = Math.ceil(this.scale.width / cloudWidth) + 1;

    for (let i = 0; i < numCloudTiles; i++) {
      this.add
        .image(
          i * cloudWidth,
          cloudHeight / 2,
          "backgrounds",
          "background_clouds"
        )
        .setOrigin(0, 0.5);
    }

    // Add randomized hills background across the bottom
    const hillsTextures = ["background_color_hills", "background_color_trees"];
    const bgWidth = 256;
    const bgHeight = 256;
    const numTiles = Math.ceil(this.scale.width / bgWidth) + 1;

    for (let i = 0; i < numTiles; i++) {
      const randomHillsTexture =
        hillsTextures[Math.floor(Math.random() * hillsTextures.length)];
      this.add
        .image(
          i * bgWidth,
          this.scale.height - bgHeight / 2,
          "backgrounds",
          randomHillsTexture
        )
        .setOrigin(0, 0.5);
    }

    // Create health display UI
    this.healthDisplay = new HealthDisplay(this, 32, 32);

    // Create game over popup
    this.gameOverPopup = new GameOverPopup(this);
    this.gameOverPopup.setRetryCallback(() => {
      this.restartGame();
    });

    const platform = this.physics.add.staticGroup();
    for (let x = 200; x <= 700; x += 64) {
      platform.create(x, this.scale.height - 32, "tiles", "block_plank");
    }

    const platformY = this.scale.height - 32;
    const player = new Turtle(this, 250, platformY - 32 * 4);
    player.playAnimation("idle");

    // Set up player health callbacks
    player.setHealthChangeCallback((health: number) => {
      this.healthDisplay.updateDisplay(health);
    });

    player.setGameOverCallback(() => {
      this.gameOverPopup.show();
    });

    // Initialize the health display with full health
    this.healthDisplay.updateDisplay(player.getCurrentHealth());

    this.physics.add.collider(player, platform);
    this.player = player;

    this.add.image(this.scale.width - 32, 32, "tiles", "sign").setScale(0.5);
  }

  update() {
    const cursors = this.input.keyboard!.createCursorKeys();
    this.player.handleControls(cursors);
    this.player.handleUpdate();
  }

  private restartGame() {
    this.player.resetHealth();
    this.player.respawn();
  }
}
