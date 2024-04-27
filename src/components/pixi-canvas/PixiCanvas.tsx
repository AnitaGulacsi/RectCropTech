import { useEffect, useRef } from "react";
import { Container, Sprite, Application, Assets, Graphics, Rectangle } from "pixi.js";

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

      let drawing = false;
      let start = { x: 0, y: 0 };
      const rectangle = new Graphics();
      app.stage.addChild(rectangle);

      app.stage.interactive = true;
      app.stage.on("pointerdown", function (event) {
        drawing = true;
        start = event.getLocalPosition(app.stage);
        rectangle.stroke({ width: 2, color: "red" });
        rectangle.fill("transparent");
        rectangle.rect(start.x, start.y, 1, 1);
      });

      app.stage.on("pointermove", function (event) {
        if (drawing) {
          const current = event.getLocalPosition(app.stage);
          const width = current.x - start.x;
          const height = current.y - start.y;
          rectangle.clear();
          rectangle.stroke({ width: 2, color: "red" });
          rectangle.fill("transparent");
          rectangle.rect(start.x, start.y, width, height);
        }
      });

      app.stage.on("pointerup", function (event) {
        const end = event.getLocalPosition(app.stage);
        const width = Math.abs(end.x - start.x);
        const height = Math.abs(end.y - start.y);

        const rect = new Rectangle(start.x, start.y, width, height);
      });

      return () => {
        container.removeChild(myImage);
        app.destroy(true);
      };
    })();
  }, [imageSrc]);

  return <div ref={pixiContainer}></div>;
};
