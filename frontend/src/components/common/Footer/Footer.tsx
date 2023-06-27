import { Link } from "react-router-dom";

import styles from "./footer.module.scss";

import { FOOTER_ICONS_LIST, ROUTES_LINKS } from "@utils/constants";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={`${styles.footer} container`}>
      <ul className={styles.icons}>
        {FOOTER_ICONS_LIST.map(({ href, className }) => (
          <li key={href}>
            <Link target="_blank" rel="noopener noreferrer" to={href}>
              <i className={className} />
            </Link>
          </li>
        ))}
      </ul>
      <nav className={styles.nav}>
        {ROUTES_LINKS.map(({ page, href }) => (
          <Link className="animated-link" to={href} key={page}>
            {page}
          </Link>
        ))}
      </nav>
      <div className={styles["last-row"]}>
        © 2014-{currentYear} Akkodis, Ltd. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
