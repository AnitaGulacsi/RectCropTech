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
        <h1 className="text-teal-800 text-xl">RECT-CROP-TECH APP</h1>
      </div>
      <div>
        <p className="m-10 content-center text-teal-700">
          This program/app allows you to crop a specific part of an uploaded
          image according to your preferences. Additionally, it features an
          object recognition system that identifies and labels the objects found
          within the image. Simply upload a photo, select the area you wish to
          keep, and the app will handle the rest, giving you the cropped version
          of your image. Meanwhile, the object recognition system provides
          insights into what is depicted in the photo, enhancing your
          interaction with the image.
        </p>
        <ImageUploader setImageDataUrl={handleImageData} />
        <p className="m-4">The app will show you what is on the picture!</p>
      </div>

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
            <PixiCanvas imageSrc={imageDataUrl} userText={""} />
          </div>
        )}
      </div>
    </main>
  );
}
