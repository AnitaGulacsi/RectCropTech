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
      <button
        className={`m-3 py-2 px-4 rounded text-white ${
          downloadUrl
            ? "bg-teal-500"
            : "bg-teal-500 font-bold opacity-50 cursor-not-allowed"
        } `}
        onClick={handleDownload}
      >
        Download Cropped Image
      </button>

      <div ref={pixiContainer}></div>
    </div>
  );
};
