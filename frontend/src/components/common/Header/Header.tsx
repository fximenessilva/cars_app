import { useAppContext } from "@contexts/AppContext";
import { Link } from "react-router-dom";

import { THEME_NAMESPACE } from "@utils/constants";
import styles from "./header.module.scss";

const Header = () => {
  const { darkMode, setDarkMode } = useAppContext();

  const iconClassName = `fa-solid fa-toggle-${darkMode ? "on" : "off"} ${
    styles.icon
  }`;

  const toggleHandler = () => {
    setDarkMode((prevState) => {
      localStorage.setItem(THEME_NAMESPACE, JSON.stringify(!prevState));
      return !prevState;
    });
  };

  return (
    <header className={styles.header}>
      <Link to="/">
        <h1 className="title">AutoConnect</h1>
      </Link>
      <i onClick={toggleHandler} className={iconClassName} />
    </header>
  );
};

export default Header;
