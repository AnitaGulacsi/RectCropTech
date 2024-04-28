import { useEffect, useRef, useState } from "react";
import {
  Container,
  Sprite,
  Application,
  Assets,
  Graphics,
  Texture,
} from "pixi.js";
import { usePixiCanvas } from "./usePixiCanvas";

interface PixiCanvasProps {
  imageSrc: string;
}

export const PixiCanvas: React.FC<PixiCanvasProps> = ({ imageSrc }) => {
  const { handleDownload, downloadUrl, pixiContainer } =
    usePixiCanvas(imageSrc);

  return (
    <div>
      {downloadUrl && (
        <button onClick={handleDownload}>Download Cropped Image</button>
      )}
      <div ref={pixiContainer}></div>
    </div>
  );
};
