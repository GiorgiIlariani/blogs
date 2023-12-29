import { ButtonProps } from "@/types";
import React, { FC, ReactElement } from "react";

const Button: FC<ButtonProps> = ({
  onClick,
  type = "button",
  text,
  className,
  style,
  disabled,
  endDecorator,
}): ReactElement => {
  const buttonClasses = `px-4 py-2 rounded-[8px]  ${className} ${
    endDecorator ? "flex items-center justify-center gap-2" : ""
  }`;

  return (
    <button
      onClick={onClick}
      type={type}
      className={buttonClasses}
      style={style}
      disabled={disabled}>
      <div className="flex items-center justify-center">{text}</div>
      {endDecorator}
    </button>
  );
};

export default Button;
