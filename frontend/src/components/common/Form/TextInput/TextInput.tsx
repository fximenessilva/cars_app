import { FC, ChangeEvent } from "react";

import styles from "./textInput.module.scss";

interface InputProps {
  type?: string;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  search?: boolean;
  value?: string | number;
}
const TextInput: FC<InputProps> = ({
  type = "text",
  placeholder = "",
  onChange,
  className,
  search,
  value,
}) => {
  return (
    <input
      className={`${styles.input} ${className} txt-input ${
        search ? styles.search : ""
      }`}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
};

export default TextInput;
