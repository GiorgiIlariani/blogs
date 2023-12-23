import React, { FC, ReactElement, CSSProperties } from "react";

interface ButtonProps {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  text: string;
  style?: CSSProperties;
}

const Button: FC<ButtonProps> = ({
  onClick,
  type = "button",
  text,
  style,
}): ReactElement => {
  const buttonStyles: CSSProperties = {
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    ...style,
  };

  return (
    <button onClick={onClick} type={type} style={buttonStyles}>
      {text}
    </button>
  );
};

export default Button;
