import React, { ReactNode } from "react";
import "./styles.sass";

interface ButtonProps {
  className?: string;
  children: ReactNode;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({ className = "", children, disabled = false, onClick }) => {
  return (
    <button onClick={onClick} className={`btn ${className}`} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
