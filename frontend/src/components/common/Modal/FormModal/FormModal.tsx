import { FC, ReactNode, useEffect } from "react";

import styles from "../modal.module.scss";

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode | string;
}

const FormModal: FC<FormModalProps> = ({
  onClose,
  isOpen,
  title,
  children,
}) => {
  useEffect(() => {
    document.body.classList.add("hidden-overflow");
    return () => {
      document.body.classList.remove("hidden-overflow");
    };
  }, []);

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
        </div>
      </div>
    </>
  );
};

export default FormModal;
