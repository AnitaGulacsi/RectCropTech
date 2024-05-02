import { usePixiCanvas } from "./usePixiCanvas";
import { useFileDownloader } from "./useFileDownloader";
import { Modal } from "../modal/Modal";

interface PixiCanvasProps {
  imageSrc: string;
  userText: string;
}

export const PixiCanvas: React.FC<PixiCanvasProps> = ({ imageSrc }) => {
  const { downloadUrl, pixiContainer, userText, handleTextChange } =
    usePixiCanvas(imageSrc);

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

      <Modal>
        <input
          type="text"
          value={userText}
          onChange={handleTextChange}
          placeholder="Enter text here"
          className="m-3 py-2 px-4 rounded border border-teal-500 bg-transparent focus:bg-transparent"
        />
      </Modal>

      <div ref={pixiContainer}></div>
    </div>
  );
};
