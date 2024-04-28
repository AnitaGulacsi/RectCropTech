import React from "react";
import { useLabelDetection } from "./useLabelDetection";

interface ImageProcessorProps {
  imageDataUrl: string;
}

export const ImageProcessor: React.FC<ImageProcessorProps> = ({
  imageDataUrl,
}) => {
  const { labels, isLoading } = useLabelDetection(imageDataUrl);

  return (
    <div className="m-5">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-row">
          {labels.map((item, index) => (
            <div className="border p-3 m-5" key={index}>
              <p className="text-teal-800">{item}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
