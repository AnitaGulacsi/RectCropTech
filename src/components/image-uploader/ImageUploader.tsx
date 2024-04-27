import Image from "next/image";
import { useState, useCallback, DragEvent, ChangeEvent, useRef } from "react";

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
      className={`border-2 ${
        isDragOver ? "border-blue-500 bg-blue-100" : "border-gray-300"
      } p-6 text-center mb-4 cursor-pointer`}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onClick={handleClick}
    >
      Drag and drop an image here, or click to select a file.
      <div className="relative w-64 h-12">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="opacity-0 w-full h-full absolute inset-0 cursor-pointer"
          onChange={onChange}
        />
        <label className="absolute inset-0 flex items-center justify-center text-white text-sm pointer-events-none">
          Click here to upload an image
        </label>
      </div>
    </div>
  );
};
