import Phaser from "phaser";
import { HealthSystem } from "./HealthSystem";

export abstract class Player extends Phaser.Physics.Arcade.Sprite {
  public jumpCount: number = 0;
  public maxJumps: number = 2;
  protected characterName: string;
  private jumpKeyPressed: boolean = false;
  private spawnX: number;
  private spawnY: number;
  private healthSystem?: HealthSystem;

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
      console.log(this.jumpCount);
      this.setVelocityY(-330);
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
    if (this.healthSystem && !this.healthSystem.isGameOver()) {
      this.healthSystem.takeDamage();
    }
    
    if (!this.healthSystem || !this.healthSystem.isGameOver()) {
      this.respawn();
    }
  }

  public setHealthSystem(healthSystem: HealthSystem) {
    this.healthSystem = healthSystem;
  }

  // Subclasses should implement a static createAnimations(scene: Phaser.Scene): void method
}
