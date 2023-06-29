import { useState, lazy, useEffect } from "react";
import { Link } from "react-router-dom";

import Button from "@components/common/Button";
import { setter, remover } from "@utils/localStorageHelpers";
import { NAMESPACES } from "@utils/constants";
import { useAppContext } from "@contexts/AppContext";
import { useCarsContext } from "@contexts/CarsContext";
import { useUsersContext } from "@contexts/UsersContext";
import { ROUTES_LINKS } from "@utils/constants";

import styles from "./home.module.scss";

const Snackbar = lazy(() => import("@components/common/Modal/Snackbar"));
const FormModal = lazy(() => import("@components/common/Modal/FormModal"));
const LoginForm = lazy(() =>
  import("@components/common/Form").then((module) => ({
    default: module.LoginForm,
  }))
);

const FAKE_API_CALLS_MS = 600;

const Home = () => {
  const {
    darkMode,
    setLoggedUser,
    loggedUser,
    userInitialState,
    loading,
    setLoading,
    btnContent,
    setBtnContent,
    snackbarProps,
    setSnackbarProps,
  } = useAppContext();

  const { emailsArr, state, setInitialUsers } = useUsersContext();

  const { setInitialCars } = useCarsContext();

  const { users } = state;

  const primaryTheme = darkMode ? "dark" : "light";
  const secondaryTheme = darkMode ? "light" : "dark";

  const [hover, setHover] = useState("mid");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (loading.primary) {
      setBtnContent({
        ...btnContent,
        primary: <i className="fa-solid fa-spinner fa-spin" />,
      });
    }
    if (loading.secondary) {
      setBtnContent({
        ...btnContent,
        secondary: <i className="fa-solid fa-spinner fa-spin" />,
      });
    }
  }, [loading.primary, loading.secondary]);

  const closeHandler = () => setOpen(false);

  const submitHandler = (values: { email: string }) => {
    setLoading({ ...loading, primary: true });
    setTimeout(() => {
      const foundUser = findUser(values.email);
      if (foundUser) {
        setLoggedUser({ user: foundUser, isLogged: true });
        setter(NAMESPACES.user, { user: foundUser });
      }
      setLoading({ ...loading, primary: false });
      setBtnContent({ ...btnContent, primary: <>Log out</> });
    }, FAKE_API_CALLS_MS);
  };

  const onLoginHandler = () => setOpen(true);
  const onLogOutHandler = () => {
    setLoading({ ...loading, primary: true });
    setTimeout(() => {
      setLoggedUser({ user: { ...userInitialState }, isLogged: false });
      remover(NAMESPACES.user);
      setLoading({ ...loading, primary: false });
      setBtnContent({ ...btnContent, primary: <>Log in</> });
    }, FAKE_API_CALLS_MS);
  };

  const handleInitialData = () => {
    setLoading({ ...loading, secondary: true });
    setTimeout(() => {
      setInitialUsers();
      setInitialCars();
      setLoading({ ...loading, secondary: false });
      setBtnContent({ ...btnContent, secondary: <>Initial data</> });

      setSnackbarProps({
        ...snackbarProps,
        open: true,
        message: "Success setting the data",
        success: true,
        onClose: () => setSnackbarProps({ ...snackbarProps, open: false }),
      });
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
              Welcome, {loggedUser.user?.name} 👋
            </h2>
            <div className={styles["buttons-wrapper"]}>
              <Button
                theme={secondaryTheme}
                type="button"
                onClick={handleInitialData}
              >
                {btnContent.secondary}
              </Button>
              <Button
                theme={primaryTheme}
                type="button"
                onClick={onLogOutHandler}
              >
                {btnContent.primary}
              </Button>
            </div>
          </div>
        ) : (
          <Button
            className={styles["login-btn"]}
            theme={primaryTheme}
            type="button"
            onClick={onLoginHandler}
          >
            {btnContent.primary}
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
            theme={primaryTheme}
            emailsArr={emailsArr}
          />
        </FormModal>
      )}
      <Snackbar {...snackbarProps} />
    </section>
  );
};

export default Home;
