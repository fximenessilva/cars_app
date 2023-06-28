import { useState, lazy, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";

import Button from "@components/common/Button";
import { setter, remover, getter } from "@utils/localStorageHelpers";
import { NAMESPACES } from "@utils/constants";
import { useAppContext } from "@contexts/AppContext";
import { useUsersContext } from "@contexts/UsersContext";
import { ROUTES_LINKS } from "@utils/constants";
import styles from "./home.module.scss";

const FormModal = lazy(() => import("@components/common/Modal/FormModal"));
const LoginForm = lazy(() =>
  import("@components/common/Form").then((module) => ({
    default: module.LoginForm,
  }))
);

const LOGGED_USER = getter(NAMESPACES.user);

const Home = () => {
  const { darkMode, setLoggedUser, loggedUser, userInitialState } =
    useAppContext();
  const { emailsArr, state } = useUsersContext();

  const { users } = state;

  const theme = darkMode ? "dark" : "light";

  const [hover, setHover] = useState("mid");
  const [open, setOpen] = useState(false);

  const closeHandler = () => setOpen(false);

  const submitHandler = (values: { email: string }) => {
    const foundUser = findUser(values.email);
    if (foundUser) {
      setLoggedUser({ user: foundUser, isLogged: true });
      setter(NAMESPACES.user, { user: foundUser });
    }
  };

  const onLoginHandler = () => setOpen(true);
  const onLogOutHandler = () => {
    setLoggedUser({ user: { ...userInitialState }, isLogged: false });
    remover(NAMESPACES.user);
  };

  const findUser = (email: string) =>
    users.find((user) => user.email === email);

  return (
    <section className="container">
      <div className={styles["btn-wrapper"]}>
        {loggedUser.isLogged ? (
          <div className={styles["msg-logout-wrapper"]}>
            <h2 className={`${styles["page-ttl"]} page-ttl `}>
              Welcome, {loggedUser.user.name} 👋
            </h2>
            <Button theme={theme} type="button" onClick={onLogOutHandler}>
              Log out
            </Button>
          </div>
        ) : (
          <Button
            className={styles["login-btn"]}
            theme={theme}
            type="button"
            onClick={onLoginHandler}
          >
            Log in
          </Button>
        )}
      </div>
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
      {open && (
        <FormModal isOpen={open} onClose={closeHandler} title="Log in">
          <LoginForm
            onSubmit={submitHandler}
            onClose={closeHandler}
            theme={theme}
            emailsArr={emailsArr}
          />
        </FormModal>
      )}
    </section>
  );
};

export default Home;
