import { useState } from "react";
import { Link } from "react-router-dom";

import { useAppContext } from "@contexts/AppContext";
import { ROUTES_LINKS } from "@utils/constants";
import styles from "./home.module.scss";

import Modal from "@components/common/Modal";

const Home = () => {
  const { darkMode } = useAppContext();

  const [hover, setHover] = useState("mid");
  const [open, setOpen] = useState(true);

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
              key={page.toLowerCase()}
              className={`${styles.block} ${isActive ? styles.active : ""}`}
              to={page.toLowerCase()}
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
