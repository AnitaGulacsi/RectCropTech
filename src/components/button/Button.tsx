import { ReactNode } from "react";

interface buttonProps {
  type: string;
  children: ReactNode;
  onClick?: () => void;
}

const returnClassNameByType = (type: string) => {
  switch (type) {
    case "action":
      return "m-5 p-3 border border-teal-500 text-teal-400 rounded-xl hover:bg-teal-800 hover:text-teal-100";
    default:
      return "";
  }
};

export const Button: React.FC<buttonProps> = ({ type, children, onClick }) => {
  const className = returnClassNameByType(type);
  return (
    <button className={`${className}`} onClick={onClick}>
      {children}
    </button>
  );
};
