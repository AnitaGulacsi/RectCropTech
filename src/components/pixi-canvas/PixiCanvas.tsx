import { usePixiCanvas } from "./usePixiCanvas";
import { useFileDownloader } from "./useFileDownloader";

interface PixiCanvasProps {
  imageSrc: string;
}

export const PixiCanvas: React.FC<PixiCanvasProps> = ({ imageSrc }) => {
  const { downloadUrl, pixiContainer } = usePixiCanvas(imageSrc);

  const { handleDownload } = useFileDownloader(downloadUrl ?? "");

  return (
    <div>
      {downloadUrl && (
        <button onClick={handleDownload}>Download Cropped Image</button>
      )}
      <div ref={pixiContainer}></div>
    </div>
  );
};
