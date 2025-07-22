import Phaser from "phaser";

export abstract class Player extends Phaser.Physics.Arcade.Sprite {
  public jumpCount: number = 0;
  public maxJumps: number = 2;
  protected characterName: string;
  private jumpKeyPressed: boolean = false;
  private spawnX: number;
  private spawnY: number;
  private maxHealth: number = 6; // 3 full hearts = 6 half hearts
  private currentHealth: number = 6;
  private onHealthChangeCallback?: (health: number) => void;
  private onGameOverCallback?: () => void;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);

    this.characterName = texture;
    this.spawnX = x;
    this.spawnY = y;

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setScale(4);
    this.setBounce(0.2);

    const boxWidth = 20;
    const boxHeight = 15;
    this.setSize(boxWidth, boxHeight);
    this.setOffset((this.width - boxWidth) / 2, this.height - boxHeight);
  }

  playAnimation(animationKey: string) {
    this.play(`${this.characterName}-${animationKey}`, true);
  }

  handleControls(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
    if (cursors.left?.isDown) {
      this.setVelocityX(-160);
      this.setFlipX(true);
      this.playAnimation("walk");
    } else if (cursors.right?.isDown) {
      this.setVelocityX(160);
      this.setFlipX(false);
      this.playAnimation("walk");
    } else {
      this.setVelocityX(0);
      this.playAnimation("idle");
    }

    if (
      cursors.up?.isDown &&
      !this.jumpKeyPressed &&
      this.jumpCount < this.maxJumps &&
      (this.jumpCount > 0 || this.body?.touching.down)
    ) {
      this.setVelocityY(-400);
      this.jumpCount++;
      this.jumpKeyPressed = true;
    }

    if (!cursors.up?.isDown) {
      this.jumpKeyPressed = false;
    }

    if (this.body?.touching.down && !this.jumpKeyPressed) {
      this.jumpCount = 0;
    }
  }

  respawn() {
    this.setPosition(this.spawnX, this.spawnY);
    this.setVelocity(0, 0);
    this.jumpCount = 0;
    this.jumpKeyPressed = false;
    this.playAnimation("idle");
  }

  handleUpdate() {
    if (this.y > this.scene.scale.height) {
      this.onDeath();
    }
  }

  private onDeath() {
    this.takeDamage();

    if (!this.isGameOver()) {
      this.respawn();
    }
  }

  public takeDamage() {
    if (this.currentHealth <= 0) return;

    this.currentHealth--;

    if (this.onHealthChangeCallback) {
      this.onHealthChangeCallback(this.currentHealth);
    }

    if (this.currentHealth <= 0 && this.onGameOverCallback) {
      this.onGameOverCallback();
    }
  }

  public getCurrentHealth(): number {
    return this.currentHealth;
  }

  public getMaxHealth(): number {
    return this.maxHealth;
  }

  public isGameOver(): boolean {
    return this.currentHealth <= 0;
  }

  public resetHealth() {
    this.currentHealth = this.maxHealth;
    if (this.onHealthChangeCallback) {
      this.onHealthChangeCallback(this.currentHealth);
    }
  }

  public setHealthChangeCallback(callback: (health: number) => void) {
    this.onHealthChangeCallback = callback;
  }

  public setGameOverCallback(callback: () => void) {
    this.onGameOverCallback = callback;
  }

  public setHealth(health: number) {
    this.currentHealth = Math.max(0, Math.min(health, this.maxHealth));
    if (this.onHealthChangeCallback) {
      this.onHealthChangeCallback(this.currentHealth);
    }
  }
}
