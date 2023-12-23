import React, { CSSProperties, FC, ReactElement } from "react";

interface ButtonProps {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  text: string;
  className?: string;
  style?: CSSProperties;
}

const Button: FC<ButtonProps> = ({
  onClick,
  type = "button",
  text,
  className,
  style,
}): ReactElement => {
  const buttonClasses = `px-4 py-2 rounded-[8px]  ${className}`;

  return (
    <button
      onClick={onClick}
      type={type}
      className={buttonClasses}
      style={style}>
      {text}
    </button>
  );
};

export default Button;
