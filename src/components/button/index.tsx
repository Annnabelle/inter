import React, { ReactNode } from "react";
import "./styles.sass";

interface ButtonProps {
  className?: string;
  children: ReactNode;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ className = "", children, disabled = false }) => {
  return (
    <button className={`btn ${className}`} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
