import { useState } from "react";
import { Link } from "react-router-dom";

import { useAppContext } from "@contexts/AppContext";
import { ROUTES_LINKS } from "@utils/constants";
import styles from "./home.module.scss";

const Home = () => {
  const { darkMode } = useAppContext();

  const [hover, setHover] = useState("mid");

  return (
    <section className="container">
      <div
        className={`${styles.wrapper} ${
          darkMode ? styles.dark : styles.light
        } mt-80 mlr-80`}
      >
        {ROUTES_LINKS.map(({ page, icon }) => {
          const isActive = hover === page;
          return (
            <Link
              key={page}
              className={`${styles.block} ${isActive ? styles.active : ""}`}
              to={page}
              onMouseEnter={() => setHover(page)}
              onMouseLeave={() => setHover("mid")}
            >
              <div>
                {isActive ? (
                  <i className={`${icon} ${styles.icon}`} />
                ) : (
                  <span>{page}</span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Home;
