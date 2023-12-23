import React, { FC, ReactElement } from "react";

interface ButtonProps {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  text: string;
  className?: string;
}

const Button: FC<ButtonProps> = ({
  onClick,
  type = "button",
  text,
  className,
}): ReactElement => {
  const buttonClasses = `px-4 py-2 rounded cursor-pointer ${className}`;

  return (
    <button onClick={onClick} type={type} className={buttonClasses}>
      {text}
    </button>
  );
};

export default Button;
