import Image from "next/image";
import { useState, useCallback, DragEvent, ChangeEvent, useRef } from "react";
import icon from "../../../public/images/icons-upload.png";

interface ImageUploaderProps {
  setImageDataUrl: (url: string) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  setImageDataUrl,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  }, []);

  const onDragLeave = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
  }, []);

  const onDrop = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
    processFile(event.dataTransfer.files[0]);
  }, []);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      processFile(event.target.files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImageDataUrl(reader.result as string);
    };
    reader.onerror = (error) => console.error("Error reading file:", error);
    reader.readAsDataURL(file);
  };

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
        <p> Drag and drop an image here, or click to select a file.</p>
        <div className="relative w-64 h-12">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="opacity-0 w-full h-full absolute inset-0 cursor-pointer"
            onChange={onChange}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <Image width={100} height={100} src={icon} alt={"doc-icon"} />
      </div>
    </div>
  );
};
