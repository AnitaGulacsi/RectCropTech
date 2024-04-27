import { FC, ReactNode } from "react";

interface ImageProcessor {
  children: ReactNode;
}

export const ImageProcessor: FC<ImageProcessor> = ({ children }) => {
  return (
    <div className="m-5">
      <button className="p-4 border">{children} </button>
    </div>
  );
};
