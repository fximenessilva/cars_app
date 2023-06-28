import { FC, ReactNode } from "react";

import styles from "./button.module.scss";

interface ButtonProps {
  onClick?: () => void;
  children: ReactNode | string;
  className?: string;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  theme: "light" | "dark";
  type: "submit" | "button" | "reset";
}

const Button: FC<ButtonProps> = ({
  children,
  className = "",
  onClick,
  variant = "secondary",
  disabled,
  theme,
  type = "button",
}) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${
        styles[`${theme}-btn-${variant}`]
      } ${className}  ${disabled ? styles.disabled : ""}`}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
