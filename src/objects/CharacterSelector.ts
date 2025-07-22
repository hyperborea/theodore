import Phaser from "phaser";
import { Player } from "./Player";
import { Cat } from "./Cat";
import { Fox } from "./Fox";
import { Hero } from "./Hero";
import { RedPanda } from "./RedPanda";
import { Turtle } from "./Turtle";

export class CharacterSelector extends Phaser.GameObjects.Container {
  private background: Phaser.GameObjects.Rectangle;
  private characterPreviews: Phaser.GameObjects.Sprite[] = [];
  private characterOptions = [
    { key: "turtle", class: Turtle, name: "Theodore" },
    { key: "hero", class: Hero, name: "Kamilla" },
    { key: "cat", class: Cat, name: "WoKiwi" },
    { key: "redpanda", class: RedPanda, name: "Pocky" },
    { key: "fox", class: Fox, name: "Kitsune" },
  ];
  private onCharacterSelected: (
    characterClass: new (scene: Phaser.Scene, x: number, y: number) => Player
  ) => void;

  constructor(
    scene: Phaser.Scene,
    onCharacterSelected: (
      characterClass: new (scene: Phaser.Scene, x: number, y: number) => Player
    ) => void
  ) {
    super(scene, scene.scale.width / 2, scene.scale.height / 2);

    this.onCharacterSelected = onCharacterSelected;

    // Create semi-transparent background overlay
    const overlay = scene.add.rectangle(
      0,
      0,
      scene.scale.width,
      scene.scale.height,
      0x000000,
      0.7
    );
    overlay.setOrigin(0.5, 0.5);
    this.add(overlay);

    // Create main panel background
    this.background = scene.add.rectangle(0, 0, 600, 300, 0x444444);
    this.background.setStrokeStyle(4, 0xffffff);
    this.add(this.background);

    // Add title
    const title = scene.add.text(0, -120, "Select Character", {
      fontSize: "24px",
      color: "#ffffff",
      fontFamily: "Arial",
    });
    title.setOrigin(0.5, 0.5);
    this.add(title);

    // Create character previews
    this.createCharacterPreviews();

    // Initially hidden
    this.setVisible(false);
    this.setActive(false);

    scene.add.existing(this);
  }

  private createCharacterPreviews() {
    const startX = -220;
    const spacing = 110;
    const previewY = -20;

    this.characterOptions.forEach((option, index) => {
      const x = startX + index * spacing;

      // Create character sprite preview
      const preview = this.scene.add.sprite(x, previewY, option.key, 0);
      preview.setScale(3);
      preview.setInteractive({ cursor: "pointer" });
      preview.setTint(0xffffff);

      // Add hover effects
      preview.on("pointerover", () => {
        preview.setTint(0xffff00);
        preview.setScale(3.5);
      });

      preview.on("pointerout", () => {
        preview.setTint(0xffffff);
        preview.setScale(3);
      });

      // Handle selection
      preview.on("pointerdown", () => {
        this.selectCharacter(option.class);
      });

      // Add character name label
      const label = this.scene.add.text(x, previewY + 80, option.name, {
        fontSize: "16px",
        color: "#ffffff",
        fontFamily: "Arial",
      });
      label.setOrigin(0.5, 0.5);

      this.add(preview);
      this.add(label);
      this.characterPreviews.push(preview);
    });

    // Add close button
    const closeButton = this.scene.add.rectangle(270, -120, 40, 40, 0xff4444);
    closeButton.setStrokeStyle(2, 0xffffff);
    closeButton.setInteractive();

    const closeX = this.scene.add.text(270, -120, "×", {
      fontSize: "24px",
      color: "#ffffff",
      fontFamily: "Arial",
    });
    closeX.setOrigin(0.5, 0.5);

    closeButton.on("pointerdown", () => {
      this.hide();
    });

    this.add(closeButton);
    this.add(closeX);
  }

  private selectCharacter(
    characterClass: new (scene: Phaser.Scene, x: number, y: number) => Player
  ) {
    this.onCharacterSelected(characterClass);
    this.hide();
  }

  public show() {
    this.setVisible(true);
    this.setActive(true);

    // Play character idle animations
    this.characterOptions.forEach((option, index) => {
      const preview = this.characterPreviews[index];
      preview.play(`${option.key}-idle`, true);
    });
  }

  public hide() {
    this.setVisible(false);
    this.setActive(false);

    // Stop animations
    this.characterPreviews.forEach((preview) => {
      preview.stop();
    });
  }
}
