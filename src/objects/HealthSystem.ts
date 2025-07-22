import Phaser from "phaser";

export class HealthSystem {
  private scene: Phaser.Scene;
  private hearts: Phaser.GameObjects.Image[] = [];
  private maxHealth: number = 6; // 3 full hearts = 6 half hearts
  private currentHealth: number = 6;
  private gameOverCallback?: () => void;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene;
    this.createHearts(x, y);
  }

  private createHearts(startX: number, startY: number) {
    for (let i = 0; i < 3; i++) {
      const heart = this.scene.add.image(
        startX + i * 40,
        startY,
        "tiles",
        "hud_heart"
      );
      heart.setScrollFactor(0); // Keep hearts fixed on screen
      this.hearts.push(heart);
    }
  }

  public takeDamage() {
    if (this.currentHealth <= 0) return;

    this.currentHealth--;
    this.updateHeartDisplay();

    if (this.currentHealth <= 0) {
      this.triggerGameOver();
    }
  }

  private updateHeartDisplay() {
    for (let i = 0; i < this.hearts.length; i++) {
      const heartIndex = i;
      const fullHeartsRemaining = Math.floor(this.currentHealth / 2);
      const hasHalfHeart = this.currentHealth % 2 === 1;

      if (heartIndex < fullHeartsRemaining) {
        this.hearts[i].setFrame("hud_heart");
      } else if (heartIndex === fullHeartsRemaining && hasHalfHeart) {
        this.hearts[i].setFrame("hud_heart_half");
      } else {
        this.hearts[i].setFrame("hud_heart_empty");
      }
    }
  }

  private triggerGameOver() {
    if (this.gameOverCallback) {
      this.gameOverCallback();
    }
  }

  public setGameOverCallback(callback: () => void) {
    this.gameOverCallback = callback;
  }

  public reset() {
    this.currentHealth = this.maxHealth;
    this.updateHeartDisplay();
  }

  public getCurrentHealth(): number {
    return this.currentHealth;
  }

  public isGameOver(): boolean {
    return this.currentHealth <= 0;
  }
}
