import {
  createContext,
  useState,
  SetStateAction,
  useContext,
  useEffect,
  FC,
  ReactNode,
  Dispatch,
} from "react";

import { NAMESPACES } from "@utils/constants";
import { setter, getter } from "@utils/localStorageHelpers";

interface User {
  name: string;
  email: string;
  favorite_cars: number[];
  id: number | null;
}

interface LoggedUser {
  isLogged: boolean;
  user: User;
}

const THEME_SELECTED = getter(NAMESPACES.theme);
const LOGGED_USER = getter(NAMESPACES.user);

const USER_INITIAL_STATE: User = {
  id: null,
  name: "",
  email: "",
  favorite_cars: [],
};

const SNACKBAR_INITIAL_STATE = {
  open: false,
  onClose: () => {},
  message: "",
  error: false,
  success: false,
};

export const AppContext = createContext<{
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
  loggedUser: LoggedUser;
  setLoggedUser: Dispatch<SetStateAction<LoggedUser>>;
  userInitialState: User;
  loading: any;
  setLoading: Dispatch<SetStateAction<any>>;
  btnContent: any;
  setBtnContent: Dispatch<SetStateAction<any>>;
  snackbarProps: any;
  setSnackbarProps: Dispatch<SetStateAction<any>>;
}>({
  darkMode: false,
  setDarkMode: () => {},
  loggedUser: {
    isLogged: false,
    user: USER_INITIAL_STATE,
  },
  setLoggedUser: () => {},
  userInitialState: USER_INITIAL_STATE,
  loading: false,
  setLoading: () => {},
  btnContent: <></>,
  setBtnContent: () => {},
  snackbarProps: SNACKBAR_INITIAL_STATE,
  setSnackbarProps: () => {},
});

const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(THEME_SELECTED);
  const [loading, setLoading] = useState({ primary: false, secondary: false });
  const [btnContent, setBtnContent] = useState({
    primary: <>Log in</>,
    secondary: <>Initial data</>,
  });
  const [loggedUser, setLoggedUser] = useState<LoggedUser>({
    isLogged: false,
    user: { ...USER_INITIAL_STATE },
  });

  const [snackbarProps, setSnackbarProps] = useState(SNACKBAR_INITIAL_STATE);

  useEffect(() => {
    if (!THEME_SELECTED) {
      setter(NAMESPACES.theme, darkMode);
    }
  }, []);

  useEffect(() => {
    if (LOGGED_USER) {
      setLoggedUser({ isLogged: true, user: LOGGED_USER.user });
      setBtnContent({ primary: <>Log out</>, secondary: <>Initial data</> });
    }
  }, []);

  const appClassName = `app ${darkMode ? "dark-mode" : "light-mode"}`;
  return (
    <div className={appClassName}>
      <AppContext.Provider
        value={{
          darkMode,
          setDarkMode,
          loggedUser,
          setLoggedUser,
          loading,
          setLoading,
          btnContent,
          setBtnContent,
          userInitialState: USER_INITIAL_STATE,
          snackbarProps,
          setSnackbarProps,
        }}
      >
        {children}
      </AppContext.Provider>
    </div>
  );
};

export const useAppContext = () => useContext(AppContext);

export default AppProvider;
