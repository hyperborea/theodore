import { levels, type Level, type Platform } from "~/data/levels";

export class LevelManager {
  private scene: Phaser.Scene;
  private currentLevel: Level | null = null;
  private platforms: Phaser.Physics.Arcade.StaticGroup;

  constructor(
    scene: Phaser.Scene,
    platforms: Phaser.Physics.Arcade.StaticGroup
  ) {
    this.scene = scene;
    this.platforms = platforms;
  }

  loadLevel(levelId: number): Level | null {
    const level = levels.find((l) => l.id === levelId);
    if (!level) {
      console.warn(`Level ${levelId} not found`);
      return null;
    }

    this.currentLevel = level;
    this.clearPlatforms();
    this.createBackground();
    this.createPlatforms();

    return level;
  }

  getCurrentLevel(): Level | null {
    return this.currentLevel;
  }

  private clearPlatforms() {
    this.platforms.clear(true, true);
  }

  private createPlatforms() {
    if (!this.currentLevel) return;

    this.currentLevel.platforms.forEach((platform: Platform) => {
      const texture = platform.texture || "tiles";
      const frame = platform.frame || "block_plank";

      if (platform.width && platform.width > 1) {
        // Create multiple connected platforms for width
        for (let i = 0; i < platform.width; i++) {
          this.platforms.create(
            (platform.x + i - 0.5) * 64,
            this.scene.scale.height - (platform.y - 0.5) * 64,
            texture,
            frame
          );
        }
      } else {
        console.log(platform);
        console.log(platform.x * 64, this.scene.scale.height - platform.y * 64);
        // Single platform
        this.platforms.create(
          (platform.x - 0.5) * 64,
          this.scene.scale.height - (platform.y - 0.5) * 64,
          texture,
          frame
        );
      }
    });
  }

  createBackground() {
    if (!this.currentLevel?.background) return;

    const { clouds, hills } = this.currentLevel.background;

    // Add clouds at the top
    if (clouds) {
      const cloudTexture = this.scene.textures
        .get("backgrounds")
        .get("background_clouds");
      const cloudWidth = cloudTexture.width;
      const cloudHeight = cloudTexture.height;
      const numCloudTiles = Math.ceil(this.scene.scale.width / cloudWidth) + 1;

      for (let i = 0; i < numCloudTiles; i++) {
        this.scene.add
          .image(
            i * cloudWidth,
            cloudHeight / 2,
            "backgrounds",
            "background_clouds"
          )
          .setOrigin(0, 0.5);
      }
    }

    // Add randomized hills background across the bottom
    if (hills) {
      const hillsTextures = [
        "background_color_hills",
        "background_color_trees",
      ];
      const bgWidth = 256;
      const bgHeight = 256;
      const numTiles = Math.ceil(this.scene.scale.width / bgWidth) + 1;

      for (let i = 0; i < numTiles; i++) {
        const randomHillsTexture =
          hillsTextures[Math.floor(Math.random() * hillsTextures.length)];
        this.scene.add
          .image(
            i * bgWidth,
            this.scene.scale.height - bgHeight / 2,
            "backgrounds",
            randomHillsTexture
          )
          .setOrigin(0, 0.5);
      }
    }
  }
}
