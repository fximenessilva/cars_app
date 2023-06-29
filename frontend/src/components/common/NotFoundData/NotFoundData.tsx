import { FC } from "react";

import styles from "./notFoundData.module.scss";

interface NotFoundDataProps {
  typeOfData: string;
  searchTerm: string;
}
const NotFoundData: FC<NotFoundDataProps> = ({ typeOfData, searchTerm }) => {
  return (
    <p className={styles.txt}>
      Could not find {typeOfData}s matching "{searchTerm}". <br />
      Please try other options or create new {typeOfData}.
    </p>
  );
};

export default NotFoundData;
