import styles from "./loading.module.scss";
import { useAppContext } from "@contexts/AppContext";

const Loading = () => {
  const { darkMode } = useAppContext();

  const loaderClassName = `${styles.loader} ${
    darkMode ? styles.dark : styles.light
  }`;
  return (
    <div className={styles.wrapper}>
      <span className={loaderClassName} />
    </div>
  );
};

export default Loading;
