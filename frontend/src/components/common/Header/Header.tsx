import { useAppContext } from "@contexts/AppContext";
import { Link } from "react-router-dom";

import { THEME_NAMESPACE, ROUTES_LINKS } from "@utils/constants";
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
      <nav className={styles.nav}>
        {ROUTES_LINKS.map(({ page, href }) => (
          <Link className={`animated-link ${styles.link}`} to={href} key={page}>
            {page}
          </Link>
        ))}
      </nav>
      <i onClick={toggleHandler} className={iconClassName} />
    </header>
  );
};

export default Header;
