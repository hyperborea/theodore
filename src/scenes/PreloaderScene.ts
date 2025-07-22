import Phaser from "phaser";
import catSpritesheet from "~/assets/cat.png";
import turtleSpritesheet from "~/assets/turtle.png";
import bumblebeeSpritesheet from "~/assets/bumblebee.png";
import heroSpritesheet from "~/assets/hero.png";
import foxSpritesheet from "~/assets/fox.png";
import redpandaSpritesheet from "~/assets/redpanda.png";
import backgroundImage from "~/assets/backgrounds.png";
import backgroundAtlas from "~/assets/backgrounds.json";
import tilesImage from "~/assets/tiles.png";
import tilesAtlas from "~/assets/tiles.json";
import { Cat } from "~/objects/Cat";
import { Turtle } from "~/objects/Turtle";
import { Bumblebee } from "~/objects/Bumblebee";
import { Hero } from "~/objects/Hero";
import { Fox } from "~/objects/Fox";
import { RedPanda } from "~/objects/RedPanda";

export class PreloaderScene extends Phaser.Scene {
  constructor() {
    super("PreloaderScene");
  }

  preload() {
    // Load all spritesheets
    this.load.spritesheet("cat", catSpritesheet, {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("turtle", turtleSpritesheet, {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("bumblebee", bumblebeeSpritesheet, {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("hero", heroSpritesheet, {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("fox", foxSpritesheet, {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("redpanda", redpandaSpritesheet, {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.atlas("tiles", tilesImage, tilesAtlas);
    this.load.atlas("backgrounds", backgroundImage, backgroundAtlas);
  }

  create() {
    // Create all animations once
    Cat.createAnimations(this);
    Turtle.createAnimations(this);
    Bumblebee.createAnimations(this);
    Hero.createAnimations(this);
    Fox.createAnimations(this);
    RedPanda.createAnimations(this);

    // Start the main scene
    this.scene.start("MainScene");
  }
}
