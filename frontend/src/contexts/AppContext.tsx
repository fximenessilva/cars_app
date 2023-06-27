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

import { THEME_NAMESPACE } from "@utils/constants";

export const AppContext = createContext<{
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
}>({
  darkMode: false,
  setDarkMode: () => {},
});
const THEME_SELECTED = localStorage.getItem(THEME_NAMESPACE);
const DARK_MODE_INITIAL_VALUE = THEME_SELECTED === "true";

const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(DARK_MODE_INITIAL_VALUE);

  useEffect(() => {
    if (!THEME_SELECTED) {
      localStorage.setItem(THEME_NAMESPACE, JSON.stringify(darkMode));
    }
  }, []);

  const appClassName = `app ${darkMode ? "dark-mode" : "light-mode"}`;
  return (
    <div className={appClassName}>
      <AppContext.Provider value={{ darkMode, setDarkMode }}>
        {children}
      </AppContext.Provider>
    </div>
  );
};

export const useAppContext = () => useContext(AppContext);

export default AppProvider;
