import { useAppContext } from "@contexts/AppContext";
import { Link } from "react-router-dom";

import useScrollDirection from "@hooks/useScrollDirection";

import { THEME_NAMESPACE, ROUTES_LINKS } from "@utils/constants";
import styles from "./header.module.scss";

const Header = () => {
  const { darkMode, setDarkMode } = useAppContext();

  const toggleClassName = `fa-solid fa-toggle-${darkMode ? "on" : "off"} ${
    styles.icon
  }`;

  const scrollDirection = useScrollDirection();

  const headerClassName = `${styles.header} ${
    styles[darkMode ? "dark" : "light"]
  } ${scrollDirection === "down" ? styles.hidden : ""}`;

  const toggleHandler = () => {
    setDarkMode((prevState) => {
      localStorage.setItem(THEME_NAMESPACE, JSON.stringify(!prevState));
      return !prevState;
    });
  };

  return (
    <header className={headerClassName}>
      <Link to="/">
        <h1 className="title">AutoConnect</h1>
      </Link>
      <nav className={styles.nav}>
        {ROUTES_LINKS.map(({ page, href }) => (
          <Link className={`animated-link ${styles.link}`} to={href} key={page}>
            {page}
          </Link>
        ))}
      </nav>
      <div className={styles["icons-wrapper"]} onClick={toggleHandler}>
        <i className={`fa-solid fa-${darkMode ? "moon" : "sun"}`} />
        <i className={toggleClassName} />
      </div>
    </header>
  );
};

export default Header;
