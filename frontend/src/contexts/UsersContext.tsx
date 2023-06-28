import {
  createContext,
  useReducer,
  SetStateAction,
  useContext,
  useEffect,
  FC,
  ReactNode,
  Dispatch,
} from "react";

import { setter, getter } from "@utils/localStorageHelpers";
import { NAMESPACES } from "@utils/constants";

import dataUsers from "@data/users.json";

interface User {
  id: number;
  name: string;
  email: string;
  coches_favoritos: number[];
}

interface UsersState {
  users: User[];
}

interface UsersContextProps {
  state: UsersState;
  dispatch: Dispatch<any>;
}

const UsersContext = createContext<UsersContextProps | undefined>(undefined);

type UsersAction = { type: "SET_USERS"; payload: any };

const usersReducer = (state: UsersState, action: UsersAction): UsersState => {
  switch (action.type) {
    case "SET_USERS":
      return {
        ...state,
        users: action.payload,
      };

    default:
      return { ...state };
  }
};

const INITIAL_STATE: UsersState = {
  users: [],
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

  return (
    <UsersContext.Provider value={{ state, dispatch }}>
      {children}
    </UsersContext.Provider>
  );
};

const useUsersContext = (): UsersContextProps => {
  const context = useContext(UsersContext);
  if (!context) {
    return { state: { users: [] }, dispatch: () => {} };
  }
  return context;
};

export { UsersProvider, useUsersContext };
export default UsersProvider;
