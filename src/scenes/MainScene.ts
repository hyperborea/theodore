import Phaser from "phaser";
import { Player } from "~/objects/Player";
import { Turtle } from "~/objects/Turtle";
import { HealthDisplay } from "~/objects/HealthDisplay";
import { GameOverPopup } from "~/objects/GameOverPopup";
import { CharacterSelector } from "~/objects/CharacterSelector";
import { LevelManager } from "~/objects/LevelManager";

export class MainScene extends Phaser.Scene {
  private player!: Player;
  private healthDisplay!: HealthDisplay;
  private gameOverPopup!: GameOverPopup;
  private characterSelector!: CharacterSelector;
  private platforms!: Phaser.Physics.Arcade.StaticGroup;
  private levelManager!: LevelManager;

  constructor() {
    super("MainScene");
  }

  create() {
    // Initialize platform group and level manager
    this.platforms = this.physics.add.staticGroup();
    this.levelManager = new LevelManager(this, this.platforms);

    // Load the first level
    const level = this.levelManager.loadLevel(1);
    if (level) {
      this.player = new Turtle(this, level.playerStartX, level.playerStartY);
    }

    // Create health display UI
    this.healthDisplay = new HealthDisplay(this, 32, 32);

    // Create game over popup
    this.gameOverPopup = new GameOverPopup(this);
    this.gameOverPopup.setRetryCallback(() => {
      this.restartGame();
    });

    this.setupPlayer();

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

  private setupPlayer() {
    this.player.playAnimation("idle");

    // Set up player health callbacks
    this.player.setHealthChangeCallback((health: number) => {
      this.healthDisplay.updateDisplay(health);
    });

    this.player.setGameOverCallback(() => {
      this.gameOverPopup.show();
    });

    this.healthDisplay.updateDisplay(this.player.getCurrentHealth());

    this.physics.add.collider(this.player, this.platforms);
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
    this.setupPlayer();
    this.player.setHealth(currentHealth);
  }

  loadLevel(levelId: number) {
    const level = this.levelManager.loadLevel(levelId);
    if (level) {
      this.levelManager.createBackground();
      if (this.player) {
        this.player.setPosition(level.playerStartX, level.playerStartY);
      }
    }
  }
}
