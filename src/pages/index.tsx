import { ImageProcessor } from "@/components/image-processor/ImageProcessor";
import { ImageUploader } from "@/components/image-uploader/ImageUploader";
import { PixiCanvas } from "@/components/pixi-canvas/PixiCanvas";
import { useCallback, useState } from "react";

export default function Home() {
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [showCanvas, setShowCanvas] = useState<boolean | null>(null);
  const handleImageData = useCallback((dataUrl: string) => {
    setImageDataUrl(dataUrl);
    setShowCanvas(true);
  }, []);
  return (
    <main className="mx-10 my-10">
      <div className="flex justify-center m-10">
        <h1 className="text-blue-800">RECT-CROP-TECH APP</h1>
      </div>
      <p className="m-4">The app will show you what is on the picture!</p>
      <ImageUploader setImageDataUrl={handleImageData} />
      <div>
        {imageDataUrl && (
          <div className="flex flex-col">
            <p className="m-3">Objects found on the picture:</p>
            <ImageProcessor imageDataUrl={imageDataUrl} />
          </div>
        )}
        {showCanvas && imageDataUrl && (
          <div>
            <p className="mb-3">
              Select the desired area on the image! Draw a rectangle for
              cropping:
            </p>
            <PixiCanvas imageSrc={imageDataUrl} />
          </div>
        )}
      </div>
    </main>
  );
}
