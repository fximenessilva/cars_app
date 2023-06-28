import { FC, ChangeEvent } from "react";

import styles from "./textInput.module.scss";

interface InputProps {
  type?: string;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  search?: boolean;
  value?: string | number;
  label?: string;
  error?: string;
  name?: string;
  variant: "form" | "searchbar";
}
const TextInput: FC<InputProps> = ({
  type = "text",
  placeholder = "",
  onChange,
  className,
  search,
  value,
  label,
  error,
  name,
  variant = "searchbar",
}) => {
  return (
    <div className={`${styles.wrapper} ${styles[`${variant}-variant`]}`}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        className={`${styles.input} ${className} txt-input ${
          search ? styles.search : ""
        }`}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

export default TextInput;
