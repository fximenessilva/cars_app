import { useAppContext } from "@contexts/AppContext";
import { NavLink, Link } from "react-router-dom";

import useScrollDirection from "@hooks/useScrollDirection";

import { NAMESPACES, ROUTES_LINKS } from "@utils/constants";
import { setter } from "@utils/localStorageHelpers";
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
      setter(NAMESPACES.theme, !prevState);
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
          <NavLink
            className={`animated-link ${styles.link}`}
            to={href}
            key={page}
          >
            {page}
          </NavLink>
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
