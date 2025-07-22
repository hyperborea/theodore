import Phaser from "phaser";
import { Player } from "~/objects/Player";
import { Turtle } from "~/objects/Turtle";
import { HealthDisplay } from "~/objects/HealthDisplay";
import { GameOverPopup } from "~/objects/GameOverPopup";
import { CharacterSelector } from "~/objects/CharacterSelector";

export class MainScene extends Phaser.Scene {
  private player!: Player;
  private healthDisplay!: HealthDisplay;
  private gameOverPopup!: GameOverPopup;
  private characterSelector!: CharacterSelector;
  private platform!: Phaser.Physics.Arcade.StaticGroup;

  constructor() {
    super("MainScene");
  }

  create() {
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

    this.platform = this.physics.add.staticGroup();
    for (let x = 200; x <= 700; x += 64) {
      this.platform.create(x, this.scale.height - 32, "tiles", "block_plank");
    }

    const platformY = this.scale.height - 32;
    this.player = new Turtle(this, 250, platformY - 32 * 4);
    this.setupPlayer(this.player);

    // Create character selector
    this.characterSelector = new CharacterSelector(this, (characterClass) => {
      this.swapCharacter(characterClass);
    });

    // Add interactive sign for character selection
    const sign = this.add
      .image(this.scale.width - 32, 32, "tiles", "sign")
      .setScale(0.5);
    sign.setInteractive({ cursor: "pointer" });
    sign.on("pointerdown", () => {
      this.characterSelector.show();
    });
    sign.on("pointerover", () => sign.setTint(0xffff00));
    sign.on("pointerout", () => sign.setTint(0xffffff));
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

  private setupPlayer(player: Player) {
    player.playAnimation("idle");

    // Set up player health callbacks
    player.setHealthChangeCallback((health: number) => {
      this.healthDisplay.updateDisplay(health);
    });

    player.setGameOverCallback(() => {
      this.gameOverPopup.show();
    });

    this.healthDisplay.updateDisplay(player.getCurrentHealth());

    this.physics.add.collider(player, this.platform);
  }

  private swapCharacter(
    characterClass: new (scene: Phaser.Scene, x: number, y: number) => Player
  ) {
    if (!this.player) return;

    const currentX = this.player.x;
    const currentY = this.player.y;
    const currentHealth = this.player.getCurrentHealth();

    this.player.destroy();
    this.player = new characterClass(this, currentX, currentY);
    this.setupPlayer(this.player);
    this.player.setHealth(currentHealth);
  }
}
