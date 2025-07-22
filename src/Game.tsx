import { useEffect, useRef } from "react";
import { PreloaderScene } from "~/scenes/PreloaderScene";
import { MainScene } from "~/scenes/MainScene";

export function Game() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const game = new Phaser.Game({
      type: Phaser.AUTO,
      parent: containerRef.current,
      backgroundColor: "#fff",
      pixelArt: true,
      height: 1000,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { x: 0, y: 300 },
        },
      },
      scene: [PreloaderScene, MainScene],
    });

    return () => game.destroy(true);
  }, []);

  return <div ref={containerRef} className="w-screen h-screen" />;
}
