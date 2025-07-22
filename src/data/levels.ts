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
  background?: {
    clouds?: boolean;
    hills?: boolean;
  };
};

export const levels: Level[] = [
  {
    id: 1,
    name: "First Steps",
    platforms: [
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 3, y: 1 },
      { x: 4, y: 1 },
      { x: 5, y: 1 },

      { x: 7, y: 1 },
      { x: 8, y: 1 },

      { x: 10, y: 1 },
      { x: 11, y: 1 },

      { x: 13, y: 1 },
      { x: 14, y: 1 },
      { x: 15, y: 1 },
    ],
    playerStartX: 0,
    playerStartY: 550,
    cakeX: 900,
    cakeY: 550,
    background: {
      clouds: true,
      hills: true,
    },
  },
  {
    id: 2,
    name: "Second Challenge",
    platforms: [
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 3, y: 1 },

      { x: 5, y: 2 },
      { x: 6, y: 2 },

      { x: 8, y: 3 },
      { x: 9, y: 3 },
      { x: 10, y: 3 },

      { x: 12, y: 4 },
      { x: 13, y: 4 },
      { x: 14, y: 4 },
      { x: 15, y: 4 },
    ],
    playerStartX: 0,
    playerStartY: 550,
    cakeX: 900,
    cakeY: 350,
    background: {
      clouds: true,
      hills: true,
    },
  },
];
