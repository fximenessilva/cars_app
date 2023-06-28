import {
  createContext,
  useReducer,
  SetStateAction,
  useContext,
  useEffect,
  FC,
  ReactNode,
  Dispatch,
  useMemo,
} from "react";

import { setter, getter } from "@utils/localStorageHelpers";
import { NAMESPACES } from "@utils/constants";

import dataUsers from "@data/users.json";

interface User {
  id: number;
  name: string;
  email: string;
  favorite_cars: number[];
}

interface UsersState {
  users: User[];
  searchTerm: string;
}

interface UsersContextProps {
  state: UsersState;
  dispatch: Dispatch<any>;
  emailsArr: string[];
}

const UsersContext = createContext<UsersContextProps | undefined>(undefined);

type UsersAction =
  | { type: "SET_USERS"; payload: any }
  | { type: "SET_SEARCHTERM"; payload: string };

const usersReducer = (state: UsersState, action: UsersAction): UsersState => {
  switch (action.type) {
    case "SET_USERS":
      return {
        ...state,
        users: action.payload,
      };

    case "SET_SEARCHTERM":
      return {
        ...state,
        searchTerm: action.payload,
      };

    default:
      return { ...state };
  }
};

const INITIAL_STATE: UsersState = {
  users: [],
  searchTerm: "",
};

interface UsersProviderProps {
  children: ReactNode;
}

const UsersProvider: FC<UsersProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(usersReducer, INITIAL_STATE);

  useEffect(() => {
    const users = getter(NAMESPACES.users);
    if (users) {
      dispatch({ type: "SET_USERS", payload: users });
    } else {
      setter(NAMESPACES.users, dataUsers.usuarios);
    }
  }, []);

  const emailsArr = useMemo(
    () => state.users.map(({ email }): string => email.toLowerCase()),
    [state.users]
  );

  return (
    <UsersContext.Provider value={{ state, dispatch, emailsArr }}>
      {children}
    </UsersContext.Provider>
  );
};

const useUsersContext = (): UsersContextProps => {
  const context = useContext(UsersContext);
  if (!context) {
    return {
      state: { users: [], searchTerm: "" },
      dispatch: () => {},
      emailsArr: [],
    };
  }
  return context;
};

export { UsersProvider, useUsersContext };
export default UsersProvider;
