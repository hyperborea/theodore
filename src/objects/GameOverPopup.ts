import Phaser from "phaser";

export class GameOverPopup {
  private scene: Phaser.Scene;
  private container: Phaser.GameObjects.Container;
  private retryCallback?: () => void;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.container = scene.add.container(0, 0);
    this.createPopup();
    this.container.setDepth(30);
    this.hide();
  }

  private createPopup() {
    const { width, height } = this.scene.scale;

    // Semi-transparent background overlay
    const overlay = this.scene.add.rectangle(
      0,
      0,
      width,
      height,
      0x000000,
      0.7
    );
    overlay.setOrigin(0);

    // Popup background
    const popupBg = this.scene.add.rectangle(
      width / 2,
      height / 2,
      400,
      200,
      0x333333
    );
    popupBg.setStrokeStyle(4, 0xffffff);

    // Game Over text
    const gameOverText = this.scene.add.text(
      width / 2,
      height / 2 - 40,
      "GAME OVER",
      {
        fontSize: "32px",
        color: "#ffffff",
        fontStyle: "bold",
      }
    );
    gameOverText.setOrigin(0.5);

    // Retry button background
    const retryButtonBg = this.scene.add.rectangle(
      width / 2,
      height / 2 + 40,
      150,
      50,
      0x666666
    );
    retryButtonBg.setStrokeStyle(2, 0xffffff);
    retryButtonBg.setInteractive();

    // Retry button text
    const retryText = this.scene.add.text(width / 2, height / 2 + 40, "RETRY", {
      fontSize: "20px",
      color: "#ffffff",
      fontStyle: "bold",
    });
    retryText.setOrigin(0.5);

    // Button hover effects
    retryButtonBg.on("pointerover", () => {
      retryButtonBg.setFillStyle(0x888888);
    });

    retryButtonBg.on("pointerout", () => {
      retryButtonBg.setFillStyle(0x666666);
    });

    // Button click handler
    retryButtonBg.on("pointerdown", () => {
      this.onRetryClicked();
    });

    // Add all elements to container
    this.container.add([
      overlay,
      popupBg,
      gameOverText,
      retryButtonBg,
      retryText,
    ]);
    this.container.setScrollFactor(0); // Keep popup fixed on screen
  }

  public show() {
    this.container.setVisible(true);
    this.scene.physics.pause();
  }

  public hide() {
    this.container.setVisible(false);
    this.scene.physics.resume();
  }

  public setRetryCallback(callback: () => void) {
    this.retryCallback = callback;
  }

  private onRetryClicked() {
    this.hide();
    if (this.retryCallback) {
      this.retryCallback();
    }
  }

  public destroy() {
    this.container.destroy();
  }
}
