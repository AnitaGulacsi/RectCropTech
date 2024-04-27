import { useEffect, useRef } from "react";
import { Container, Sprite, Application, Assets } from "pixi.js";

interface PixiCanvasProps {
  imageSrc: string;
}

export const PixiCanvas: React.FC<PixiCanvasProps> = ({ imageSrc }) => {
  const pixiContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      // Create a new application
      const app = new Application();

      // Initialize the application
      await app.init({ background: "#1099bb", resizeTo: window });

      // Append the application canvas to the document body
      document.body.appendChild(app.canvas);

      // Create and add a container to the stage
      const container = new Container();
      app.stage.addChild(container);

      const texture = await Assets.load(imageSrc);
      const myImage = new Sprite(texture);
      container.addChild(myImage);

      myImage.width = 700;
      myImage.height = 700;

      return () => {
        container.removeChild(myImage);
      };
    })();
  }, [imageSrc]);

  return <div ref={pixiContainer}></div>;
};
