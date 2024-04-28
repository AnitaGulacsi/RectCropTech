import { useEffect, useRef } from "react";
import {
  Container,
  Sprite,
  Application,
  Assets,
  Graphics,
  Texture,
} from "pixi.js";

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
      await app.init({
        background: "#D3D3D3",
        resizeTo: window,
      });

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
        const current = event.getLocalPosition(container);
        rectangle.stroke({ width: 2, color: "red" });
        rectangle.fill("transparent");
        rectangle.rect(
          start.x,
          start.y,
          current.x - start.x,
          current.y - start.y
        );
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

      app.stage.on("pointerup", function () {
        drawing = false;
        const bounds = rectangle.getBounds();
        console.log("Bounds", bounds);

        // Create a new canvas element
        const canvas = document.createElement("canvas");
        canvas.width = bounds.width;
        canvas.height = bounds.height;

        // Get the context of the canvas and draw the cropped area
        const context = canvas.getContext("2d");
        if (context) {
          const rendererCanvas = app.renderer.extract.canvas(
            app.stage
          ) as HTMLCanvasElement;
          context.drawImage(
            rendererCanvas,
            bounds.x,
            bounds.y,
            bounds.width,
            bounds.height,
            0,
            0,
            bounds.width,
            bounds.height
          );

          // Create a texture from the canvas
          const texture = Texture.from(canvas);
          const croppedImage = new Sprite(texture);
          croppedImage.x = (app.screen.width - croppedImage.width) / 2;
          container.addChild(croppedImage);

          myImage.visible = false;
          rectangle.visible = false;
        }
      });

      return () => {
        container.removeChild(myImage);
        app.destroy(true);
      };
    })();
  }, [imageSrc]);

  return <div ref={pixiContainer}></div>;
};
