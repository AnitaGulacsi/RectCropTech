import { ImageLoaderProps } from "next/image";
import { ChangeEvent, DragEvent, useCallback, useRef, useState } from "react";
import { ImageUploaderProps } from "./ImageUploader";

export const useImageUploader = ({ setImageDataUrl }: ImageUploaderProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImageDataUrl(reader.result as string);
    };
    reader.onerror = (error) => console.error("Error reading file:", error);
    reader.readAsDataURL(file);
  };

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

  const onFileUploaded = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      processFile(event.target.files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return {
    isDragOver,
    fileInputRef,
    handleClick,
    processFile,
    onDragOver,
    onDragLeave,
    onDrop,
    onFileUploaded,
  };
};
