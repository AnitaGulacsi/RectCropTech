import Image from "next/image";
import { useState, useCallback, DragEvent, ChangeEvent } from "react";

interface ImageUploaderProps {
  setImageDataUrl: (url: string) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  setImageDataUrl,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

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

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImageDataUrl(reader.result as string);
    };
    reader.onerror = (error) => console.error("Error reading file:", error);
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <div
        className={`border-2 ${
          isDragOver ? "border-blue-500 bg-blue-100" : "border-gray-300"
        } p-6 text-center mb-4 cursor-pointer`}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
      >
        Drag and drop an image here, or click to select a file.
        {/* <input
          type="file"
          accept="image/*"
          className="opacity-0 w-full h-full absolute top-0 left-0 cursor-pointer"
          onChange={onChange}
        /> */}
      </div>
    </div>
  );
};
