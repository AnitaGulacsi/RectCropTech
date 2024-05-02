import { ReactNode } from "react";
import { Button } from "../button/Button";

interface modalProps {
  children: ReactNode;
  handleCancelModal: () => void;
  handleDoneModal: () => void;
}

export const Modal: React.FC<modalProps> = ({
  children,
  handleCancelModal,
  handleDoneModal,
}) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
      <div className="bg-black bg-opacity-50 w-full h-full absolute"></div>
      <div className="modal z-10 bg-teal-50 p-6 rounded-lg shadow-lg">
        <p className="flex justify-center text-xl mb-10">
          Would you like to add text to the cropped image?
        </p>
        <p>
          Please enter the text you would like, then press the
          <span className="text-teal-500 underline"> Done </span>
          button.
        </p>
        <p>
          If you don&rsquo;t want to add text, press the
          <span className="text-teal-500 underline"> Cancel </span>button.
        </p>
        {children}
        <div className="flex justify-between">
          <Button type="action" onClick={handleCancelModal}>
            Cancel
          </Button>
          <Button type="action" onClick={handleDoneModal}>
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};
