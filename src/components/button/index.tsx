import React, { ReactNode } from "react";
import "./styles.sass";

interface ButtonProps {
  className?: string;
  children: ReactNode;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset"; // Ограничиваем допустимые значения
}

const Button: React.FC<ButtonProps> = ({ className = "", children, disabled = false, onClick, type = "button" }) => {
  return (
    <button onClick={onClick} className={`btn ${className}`} disabled={disabled} type={type}>
      {children}
    </button>
  );
};

export default Button;

