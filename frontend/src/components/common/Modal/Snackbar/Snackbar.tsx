import { useEffect, FC, useState } from "react";

import styles from "./snackbar.module.scss";
import modalStyles from "../modal.module.scss";

interface SnackbarProps {
  open: boolean;
  error?: boolean | undefined;
  success?: boolean | undefined;
  onClose: () => void;
  message: string;
}

const Snackbar: FC<SnackbarProps> = ({
  open,
  onClose,
  message,
  error,
  success,
}) => {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  useEffect(() => {
    let timer: any;
    if (isOpen) {
      timer = setTimeout(() => {
        setIsOpen(false);
        onClose();
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isOpen]);

  const iconClassName = `fa-solid ${
    error ? "fa-circle-xmark" : success ? "fa-circle-check" : ""
  }`;

  return (
    isOpen && (
      <>
        <div className={modalStyles.darkBG} onClick={() => setIsOpen(false)} />
        <div className={styles.position}>
          <div className={styles.modal}>
            <div className={styles["message-wrapper"]}>
              <span className={styles.icon}>
                <i className={iconClassName} />
              </span>
              <span className={styles.message}>{message}</span>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default Snackbar;
