import Image from "next/image";
import icon from "../../../public/images/icons-upload.png";
import { useImageUploader } from "./useImageUploader";

export interface ImageUploaderProps {
  setImageDataUrl: (url: string) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  setImageDataUrl,
}) => {
  const {
    isDragOver,
    fileInputRef,
    handleClick,
    onDrop,
    onDragOver,
    onDragLeave,
    onFileUploaded,
  } = useImageUploader({ setImageDataUrl });

  return (
    <div
      className={`border-dashed border-4 border-teal-600 ${
        isDragOver
          ? "bg-teal-500 bg-opacity-50 text-black"
          : "bg-teal-500 bg-opacity-25 text-teal-700"
      } p-6 text-center mb-4 cursor-pointer`}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onClick={handleClick}
    >
      <div>
        <p>Drag and drop an image, or click to select a file.</p>
        <div className="relative w-64 h-12">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="opacity-0 w-full h-full absolute inset-0 cursor-pointer"
            onChange={onFileUploaded}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <Image width={100} height={100} src={icon} alt={"doc-icon"} />
      </div>
    </div>
  );
};
