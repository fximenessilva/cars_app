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

export const AppContext = createContext<{
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
  loggedUser: LoggedUser;
  setLoggedUser: Dispatch<SetStateAction<LoggedUser>>;
  userInitialState: User;
}>({
  darkMode: false,
  setDarkMode: () => {},
  loggedUser: {
    isLogged: false,
    user: {
      id: null,
      name: "",
      email: "",
      favorite_cars: [],
    },
  },
  setLoggedUser: () => {},
  userInitialState: USER_INITIAL_STATE,
});

const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(THEME_SELECTED);

  const [loggedUser, setLoggedUser] = useState<LoggedUser>({
    isLogged: false,
    user: { ...USER_INITIAL_STATE },
  });

  useEffect(() => {
    if (!THEME_SELECTED) {
      setter(NAMESPACES.theme, darkMode);
    }
  }, []);

  useEffect(() => {
    if (LOGGED_USER) {
      setLoggedUser({ isLogged: true, user: LOGGED_USER.user });
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
          userInitialState: USER_INITIAL_STATE,
        }}
      >
        {children}
      </AppContext.Provider>
    </div>
  );
};

export const useAppContext = () => useContext(AppContext);

export default AppProvider;
