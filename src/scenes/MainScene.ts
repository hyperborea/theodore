import Phaser from "phaser";
import { Player } from "~/objects/Player";
import { Turtle } from "~/objects/Turtle";
import { HealthDisplay } from "~/objects/HealthDisplay";
import { GameOverPopup } from "~/objects/GameOverPopup";
import { CharacterSelector } from "~/objects/CharacterSelector";
import { LevelManager } from "~/objects/LevelManager";
import { Cake } from "~/objects/Cake";
import { VictoryScreen } from "~/objects/VictoryScreen";

export class MainScene extends Phaser.Scene {
  private player!: Player;
  private healthDisplay!: HealthDisplay;
  private gameOverPopup!: GameOverPopup;
  private characterSelector!: CharacterSelector;
  private platforms!: Phaser.Physics.Arcade.StaticGroup;
  private levelManager!: LevelManager;
  private cake!: Cake;
  private victoryScreen!: VictoryScreen;
  private currentLevelId: number = 1;

  constructor() {
    super("MainScene");
  }

  create() {
    // Initialize platform group and level manager
    this.platforms = this.physics.add.staticGroup();
    this.levelManager = new LevelManager(this, this.platforms);

    // Load the first level
    const level = this.levelManager.loadLevel(this.currentLevelId);
    if (level) {
      this.player = new Turtle(this, level.playerStartX, level.playerStartY);
      // Create cake at level-configured position
      this.cake = new Cake(this, level.cakeX, level.cakeY, 0);
    }

    // Create health display UI
    this.healthDisplay = new HealthDisplay(this, 32, 32);

    // Create game over popup
    this.gameOverPopup = new GameOverPopup(this);
    this.gameOverPopup.setRetryCallback(() => {
      this.restartGame();
    });

    // Create victory screen
    this.victoryScreen = new VictoryScreen(this);

    this.setupPlayer();

    // Create character selector
    this.characterSelector = new CharacterSelector(this, (characterClass) => {
      this.swapCharacter(characterClass);
    });

    // Add interactive sign for character selection
    const sign = this.add
      .image(this.scale.width - 32, 32, "tiles", "sign")
      .setScale(0.5)
      .setDepth(20);
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
    this.currentLevelId = 0;
    this.loadNextLevel();
    this.player.resetHealth();
    // this.player.respawn();
  }

  private loadNextLevel() {
    this.currentLevelId++;
    const nextLevel = this.levelManager.loadLevel(this.currentLevelId);

    if (nextLevel) {
      // Destroy current cake and create new one at new level position
      this.cake.destroy();
      this.cake = new Cake(
        this,
        nextLevel.cakeX,
        nextLevel.cakeY,
        this.currentLevelId - 1
      );

      // Add overlap detection between player and cake
      this.physics.add.overlap(this.player, this.cake, () =>
        this.loadNextLevel()
      );

      // Move player to new level start position
      this.player.spawn(nextLevel.playerStartX, nextLevel.playerStartY);

      console.log(`Loaded level ${this.currentLevelId}: ${nextLevel.name}`);
    } else {
      // Show victory screen when all levels are completed
      this.victoryScreen.show();
      this.currentLevelId = 1;
    }
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

    // Add overlap detection between player and cake
    this.physics.add.overlap(this.player, this.cake, () => {
      this.loadNextLevel();
    });
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
}
