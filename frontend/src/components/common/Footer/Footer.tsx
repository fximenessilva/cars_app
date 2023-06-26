import { Link } from "react-router-dom";

import styles from "./footer.module.scss";

const iconsList = [
  {
    href: "https://www.facebook.com/",
    className: "fa-brands fa-facebook",
  },
  {
    href: "https://www.instagram.com/",
    className: "fa-brands fa-instagram",
  },
  { href: "https://twitter.com/", className: "fa-brands fa-twitter" },
];

const routesLink = [
  { page: "Cars", href: "/cars" },
  { page: "Users", href: "/users" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <ul className={styles.icons}>
        {iconsList.map(({ href, className }) => (
          <li key={href}>
            <Link target="_blank" rel="noopener noreferrer" to={href}>
              <i className={className} />
            </Link>
          </li>
        ))}
      </ul>
      <nav className={styles.nav}>
        {routesLink.map(({ page, href }) => (
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
