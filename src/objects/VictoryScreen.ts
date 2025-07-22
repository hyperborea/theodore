import Phaser from "phaser";

export class VictoryScreen extends Phaser.GameObjects.Container {
  private background!: Phaser.GameObjects.Rectangle;
  private titleText!: Phaser.GameObjects.Text;
  private birthdayText!: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene) {
    super(scene, 0, 0);
    scene.add.existing(this);
    this.createElements();
    this.setVisible(false);
    this.setDepth(1000);
  }

  private createElements() {
    const { width, height } = this.scene.scale;

    // Semi-transparent dark background
    this.background = this.scene.add.rectangle(
      width / 2,
      height / 2,
      width,
      height,
      0x000000,
      0.8
    );
    this.add(this.background);

    // Congratulations title
    this.titleText = this.scene.add.text(
      width / 2,
      height / 2 - 120,
      "🎉 CONGRATULATIONS! 🎉",
      {
        fontSize: "48px",
        color: "#FFD700",
        fontFamily: "Arial Black",
        stroke: "#FF1493",
        strokeThickness: 4,
      }
    );
    this.titleText.setOrigin(0.5, 0.5);
    this.add(this.titleText);

    // Birthday message for Kamilla
    this.birthdayText = this.scene.add.text(
      width / 2,
      height / 2 + 40,
      "🎂 Happy Birthday Kamilla! 🎂\n🤗🤗🤗 🤗🤗🤗 🤗🤗🤗",
      {
        fontSize: "28px",
        color: "#FF69B4",
        fontFamily: "Arial",
        align: "center",
        lineSpacing: 10,
      }
    );
    this.birthdayText.setOrigin(0.5, 0.5);
    this.add(this.birthdayText);

    // Add twinkling animation to the title
    this.scene.tweens.add({
      targets: this.titleText,
      scaleX: 1.1,
      scaleY: 1.1,
      duration: 800,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });

    // Add floating animation to birthday text
    this.scene.tweens.add({
      targets: this.birthdayText,
      y: this.birthdayText.y - 10,
      duration: 1500,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });
  }

  show() {
    this.setVisible(true);

    // Fade in animation
    this.setAlpha(0);
    this.scene.tweens.add({
      targets: this,
      alpha: 1,
      duration: 500,
      ease: "Power2",
    });

    // Scale in animation for elements
    this.titleText.setScale(0);
    this.birthdayText.setScale(0);

    this.scene.tweens.add({
      targets: [this.titleText],
      scale: 1,
      duration: 600,
      delay: 200,
      ease: "Back.easeOut",
    });

    this.scene.tweens.add({
      targets: [this.birthdayText],
      scale: 1,
      duration: 600,
      delay: 600,
      ease: "Back.easeOut",
    });
  }

  hide() {
    this.setVisible(false);
  }
}
