export type Platform = {
  x: number;
  y: number;
  width?: number;
  texture?: string;
  frame?: string;
};

export type Level = {
  id: number;
  name: string;
  platforms: Platform[];
  playerStartX: number;
  playerStartY: number;
  cakeX: number;
  cakeY: number;
  bottomBackgrounds: string[];
};

export const levels: Level[] = [
  {
    id: 1,
    name: "First Steps",
    platforms: [
      { x: 1, y: 1, frame: "terrain_grass_block_top_left" },
      { x: 2, y: 1, frame: "terrain_grass_block_top" },
      { x: 3, y: 1, frame: "terrain_grass_block_top" },
      { x: 4, y: 1, frame: "terrain_grass_block_top" },
      { x: 5, y: 1, frame: "terrain_grass_block_top_right" },

      { x: 7, y: 1, frame: "terrain_grass_block_top_left" },
      { x: 8, y: 1, frame: "terrain_grass_block_top_right" },

      { x: 10, y: 1, frame: "terrain_grass_block_top_left" },
      { x: 11, y: 1, frame: "terrain_grass_block_top_right" },

      { x: 13, y: 1, frame: "terrain_grass_block_top_left" },
      { x: 14, y: 1, frame: "terrain_grass_block_top" },
      { x: 15, y: 1, frame: "terrain_grass_block_top_right" },
    ],
    playerStartX: 0,
    playerStartY: 550,
    cakeX: 900,
    cakeY: 550,
    bottomBackgrounds: ["background_color_hills", "background_color_trees"],
  },
  {
    id: 2,
    name: "Second Challenge",
    platforms: [
      { x: 1, y: 3, frame: "terrain_sand_cloud" },
      { x: 2, y: 2, frame: "terrain_sand_cloud" },
      { x: 3, y: 1, frame: "terrain_sand_cloud" },

      { x: 5, y: 1, frame: "terrain_sand_cloud_left" },
      { x: 6, y: 1, frame: "terrain_sand_cloud_right" },

      { x: 8, y: 2, frame: "terrain_sand_cloud" },
      { x: 9, y: 3, frame: "terrain_sand_cloud" },
      { x: 10, y: 4, frame: "terrain_sand_cloud" },

      { x: 12, y: 5, frame: "terrain_sand_cloud_left" },
      { x: 13, y: 5, frame: "terrain_sand_cloud_right" },
      { x: 14, y: 6, frame: "terrain_sand_cloud" },
      { x: 15, y: 7, frame: "terrain_sand_cloud" },
    ],
    playerStartX: 0,
    playerStartY: 420,
    cakeX: 920,
    cakeY: 150,
    bottomBackgrounds: ["background_color_desert"],
  },
  {
    id: 3,
    name: "Double Jump Challenge",
    platforms: [
      { x: 4, y: 1, frame: "terrain_stone_block_top_left" },
      { x: 5, y: 1, frame: "terrain_stone_block_top" },
      { x: 6, y: 1, frame: "terrain_stone_block_top_right" },

      { x: 1, y: 3, frame: "terrain_stone_cloud_left" },
      { x: 2, y: 3, frame: "terrain_stone_cloud_right" },

      { x: 5, y: 5, frame: "terrain_stone_cloud_left" },
      { x: 6, y: 5, frame: "terrain_stone_cloud_right" },

      { x: 8, y: 7, frame: "terrain_stone_cloud_left" },
      { x: 9, y: 7, frame: "terrain_stone_cloud_middle" },
      { x: 10, y: 7, frame: "terrain_stone_cloud_right" },

      { x: 14, y: 6, frame: "terrain_stone_cloud_left" },
      { x: 15, y: 6, frame: "terrain_stone_cloud_right" },
    ],
    playerStartX: 250,
    playerStartY: 550,
    cakeX: 900,
    cakeY: 220,
    bottomBackgrounds: ["background_color_mushrooms"],
  },
  {
    id: 4,
    name: "Ultimate Challenge",
    platforms: [
      // Starting platform (bottom center)
      { x: 8, y: 1, frame: "block_planks" },

      // Left side - single jump path
      { x: 5, y: 2, frame: "block_plank" },
      { x: 3, y: 3, frame: "block_planks" },

      // Right side - requires double jump
      { x: 11, y: 3, frame: "block_plank" },

      // Middle high platform - requires double jump from either side
      { x: 8, y: 5, frame: "block_planks" },

      // Left upper - single jump from middle high
      { x: 6, y: 6, frame: "block_plank" },

      // Right upper - requires double jump from middle high
      { x: 12, y: 7, frame: "block_planks" },

      // Final platform with cake - requires double jump
      { x: 9, y: 8, frame: "block_plank" },
    ],
    playerStartX: 420,
    playerStartY: 550,
    cakeX: 544,
    cakeY: 100,
    bottomBackgrounds: [
      "background_fade_trees",
      "background_fade_hills",
      "background_fade_desert",
      "background_fade_mushrooms",
    ],
  },
];
