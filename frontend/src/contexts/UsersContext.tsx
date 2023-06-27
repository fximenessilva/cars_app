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

export const UsersContext = createContext<{}>({});

const UsersProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return <UsersContext.Provider value={{}}>{children}</UsersContext.Provider>;
};

export const useUsersContext = () => useContext(UsersContext);

export default UsersProvider;
