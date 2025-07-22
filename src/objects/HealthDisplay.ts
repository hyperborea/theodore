import Phaser from "phaser";

export class HealthDisplay {
  private scene: Phaser.Scene;
  private hearts: Phaser.GameObjects.Image[] = [];

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

  public updateDisplay(currentHealth: number) {
    for (let i = 0; i < this.hearts.length; i++) {
      const heartIndex = i;
      const fullHeartsRemaining = Math.floor(currentHealth / 2);
      const hasHalfHeart = currentHealth % 2 === 1;

      if (heartIndex < fullHeartsRemaining) {
        this.hearts[i].setFrame("hud_heart");
      } else if (heartIndex === fullHeartsRemaining && hasHalfHeart) {
        this.hearts[i].setFrame("hud_heart_half");
      } else {
        this.hearts[i].setFrame("hud_heart_empty");
      }
    }
  }

  public destroy() {
    this.hearts.forEach(heart => heart.destroy());
    this.hearts = [];
  }
}
