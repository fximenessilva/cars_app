import { useState, lazy, useEffect } from "react";
import { Link } from "react-router-dom";

import Button from "@components/common/Button";
import { setter, remover } from "@utils/localStorageHelpers";
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

const FAKE_API_CALLS_MS = 1000;

const Home = () => {
  const { darkMode, setLoggedUser, loggedUser, userInitialState } =
    useAppContext();
  const { emailsArr, state } = useUsersContext();

  const { users } = state;

  const theme = darkMode ? "dark" : "light";

  const [hover, setHover] = useState("mid");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [btnContent, setBtnContent] = useState(<>Log in</>);

  useEffect(() => {
    if (loading) {
      setBtnContent(<i className="fa-solid fa-spinner fa-spin" />);
    }
  }, [loading]);

  const closeHandler = () => setOpen(false);

  const submitHandler = (values: { email: string }) => {
    setLoading(true);
    setTimeout(() => {
      const foundUser = findUser(values.email);
      if (foundUser) {
        setLoggedUser({ user: foundUser, isLogged: true });
        setter(NAMESPACES.user, { user: foundUser });
      }
      setLoading(false);
      setBtnContent(<>Log out</>);
    }, FAKE_API_CALLS_MS);
  };

  const onLoginHandler = () => setOpen(true);
  const onLogOutHandler = () => {
    setLoading(true);
    setTimeout(() => {
      setLoggedUser({ user: { ...userInitialState }, isLogged: false });
      remover(NAMESPACES.user);
      setLoading(false);
      setBtnContent(<>Log in</>);
    }, FAKE_API_CALLS_MS);
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
              {btnContent}
            </Button>
          </div>
        ) : (
          <Button
            className={styles["login-btn"]}
            theme={theme}
            type="button"
            onClick={onLoginHandler}
          >
            {btnContent}
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
