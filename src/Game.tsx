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
      roundPixels: true,
      width: 64 * 15,
      height: 64 * 10,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { x: 0, y: 600 },
          debug: false,
          fps: 120, // Increase physics update rate to reduce jitter
        },
      },
      scene: [PreloaderScene, MainScene],
    });

    return () => game.destroy(true);
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div ref={containerRef} />
    </div>
  );
}
