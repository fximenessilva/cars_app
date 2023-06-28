import { FC, ReactNode, useEffect } from "react";

import { useAppContext } from "@contexts/AppContext";
import Button from "../Button";
import styles from "./modal.module.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode | string;
  leftBtnTxt: string;
  leftBtnAction?: () => void;
  rightBtnTxt: string;
  rightBtnAction?: () => void;
}

const Modal: FC<ModalProps> = ({
  onClose,
  isOpen,
  title,
  children,
  leftBtnAction,
  leftBtnTxt = "Delete",
  rightBtnAction,
  rightBtnTxt = "Cancel",
}) => {
  const { darkMode } = useAppContext();

  const theme = darkMode ? "dark" : "light";

  useEffect(() => {
    document.body.classList.add("hidden-overflow");
    return () => {
      document.body.classList.remove("hidden-overflow");
    };
  }, []);

  const leftBtnHandler = () => {
    leftBtnAction && leftBtnAction();
    onClose();
  };

  const rightBtnHandler = () => {
    rightBtnAction && rightBtnAction();
    onClose();
  };

  if (!isOpen) return null;
  return (
    <>
      <div className={styles.darkBG} onClick={() => onClose()} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          {title ? (
            <div className={styles.modalHeader}>
              <h5 className={styles.heading}>{title}</h5>
            </div>
          ) : null}

          {children ? (
            <div className={styles.modalContent}>{children}</div>
          ) : null}

          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <Button
                type="button"
                className={styles.deleteBtn}
                onClick={leftBtnHandler}
                theme={theme}
              >
                {leftBtnTxt}
              </Button>
              <Button
                type="button"
                className={styles.cancelBtn}
                onClick={rightBtnHandler}
                theme={theme}
              >
                {rightBtnTxt}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
