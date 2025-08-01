import { useEffect, useRef } from "react";
import { PreloaderScene } from "~/scenes/PreloaderScene";
import { MainScene } from "~/scenes/MainScene";

const width = 64 * 15;
const height = 64 * 10;

export function Game() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const game = new Phaser.Game({
      type: Phaser.AUTO,
      parent: containerRef.current,
      backgroundColor: "#fff",
      pixelArt: true,
      roundPixels: true,
      width,
      height,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { x: 0, y: 900 },
          debug: false,
          fps: 120, // Increase physics update rate to reduce jitter
        },
      },
      scene: [PreloaderScene, MainScene],
    });

    return () => game.destroy(true);
  }, []);

  return <div ref={containerRef} style={{ width, height }} />;
}
