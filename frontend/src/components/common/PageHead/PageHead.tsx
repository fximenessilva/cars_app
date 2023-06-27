import { FC } from "react";

import styles from "./pageHead.module.scss";

interface PageHeadProps {
  title: string;
  onClick?: () => void;
}

const PageHead: FC<PageHeadProps> = ({ title, onClick }) => {
  return (
    <div className={styles["page-head-wrapper"]}>
      <h1 className={styles["page-ttl"]}>{title}</h1>
      <i
        onClick={onClick}
        className={`fa-solid fa-plus add-icon ${styles["add-icon"]}`}
      />
    </div>
  );
};

export default PageHead;
