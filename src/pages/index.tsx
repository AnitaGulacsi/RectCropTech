import { ImageProcessor } from "@/components/image-processor/ImageProcessor";
import { ImageUploader } from "@/components/image-uploader/ImageUploader";
import { useCallback, useState } from "react";

export default function Home() {
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const handleImageData = useCallback((dataUrl: string) => {
    setImageDataUrl(dataUrl);
  }, []);
  return (
    <main className="mx-10 my-10">
      <div className="flex justify-center">
        <h1 className="text-blue-800">RECT-CROP-TECH APP</h1>
      </div>
      <ImageUploader setImageDataUrl={handleImageData} />
      <div className="flex flex-row justify-center">
        {imageDataUrl && <ImageProcessor imageDataUrl={imageDataUrl} />}
      </div>
    </main>
  );
}
