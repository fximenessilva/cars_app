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

export const CarsContext = createContext<{}>({});

const CarsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return <CarsContext.Provider value={{}}>{children}</CarsContext.Provider>;
};

export const useCarsContext = () => useContext(CarsContext);

export default CarsProvider;
