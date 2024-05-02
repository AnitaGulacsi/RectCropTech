import { usePixiCanvas } from "./usePixiCanvas";
import { useFileDownloader } from "./useFileDownloader";
import { Modal } from "../modal/Modal";
import { useState } from "react";

interface PixiCanvasProps {
  imageSrc: string;
  userText: string;
}

export const PixiCanvas: React.FC<PixiCanvasProps> = ({ imageSrc }) => {
  const [isOpen, setIsOpen] = useState(true);

  const {
    downloadUrl,
    pixiContainer,
    userText,
    color,
    handleTextChange,
    handleColorChange,
  } = usePixiCanvas(imageSrc);
  const { handleDownload } = useFileDownloader(downloadUrl ?? "");

  const handleCancelModal = () => {
    setIsOpen(!isOpen);
    handleTextChange({
      target: { value: "" },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleDoneModal = () => {
    setIsOpen(!isOpen);
  };

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

      {isOpen && (
        <Modal
          handleCancelModal={handleCancelModal}
          handleDoneModal={handleDoneModal}
        >
          <input
            type="text"
            value={userText}
            onChange={handleTextChange}
            placeholder="Enter text here"
            className="m-3 py-2 px-4 rounded border border-teal-500 bg-transparent focus:bg-transparent"
          />
          <input
            type="color"
            value={color}
            onChange={handleColorChange}
            className="m-3"
          />
        </Modal>
      )}

      <div ref={pixiContainer}></div>
    </div>
  );
};
