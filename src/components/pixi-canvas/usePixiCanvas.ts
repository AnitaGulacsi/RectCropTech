import {
  Application,
  Assets,
  Container,
  Graphics,
  Sprite,
  Texture,
  Text,
} from "pixi.js";
import { SetStateAction, useEffect, useRef, useState } from "react";

export const usePixiCanvas = (imageSrc: string) => {
  const pixiContainer = useRef<HTMLDivElement>(null);
  const appRef = useRef<Application | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [userText, setUserText] = useState<string>("");
  const [color, setColor] = useState("");
  const baseImageSize = 800;

  useEffect(() => {
    (async () => {
      // Remove old application if it exists
      if (appRef.current) {
        appRef.current.destroy(true);
        setDownloadUrl(null);
      }

      // Create a new application
      const app = new Application();

      // Initialize the application
      await app.init({
        background: "#E0F2F1",
        resizeTo: window,
      });
      appRef.current = app;

      // Append the application canvas to the specified container
      if (pixiContainer.current) {
        pixiContainer.current.appendChild(app.canvas);
      }

      // Create and add a container to the stage
      const container = new Container();
      app.stage.addChild(container);

      const texture = await Assets.load(imageSrc);
      const uploadImage = new Sprite(texture);

      if (
        uploadImage.width > baseImageSize &&
        uploadImage.height > baseImageSize
      ) {
        uploadImage.width = baseImageSize;
        uploadImage.height = baseImageSize;
      }

      container.addChild(uploadImage);

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
          container.addChild(croppedImage);

          // Adding text
          const text = new Text({
            text: userText,
          });
          text.x = 10;
          text.y = 10;
          context.fillStyle = color;
          context.font = "bold 50px serif";
          context.fillText(userText, 40, 40);

          uploadImage.visible = false;
          rectangle.visible = false;

          setDownloadUrl(canvas.toDataURL("image/png"));
        }
      });

      return () => {
        container.removeChild(uploadImage);
        app.destroy(true);
      };
    })();
  }, [color, imageSrc, userText]);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserText(event.target.value);
  };

  const handleColorChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setColor(event.target.value);
  };

  return {
    downloadUrl,
    pixiContainer,
    userText,
    color,
    handleTextChange,
    handleColorChange,
  };
};
