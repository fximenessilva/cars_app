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

import { useAppContext } from "./AppContext";
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
  isEdit: { edit: boolean; values: any };
}

interface UsersContextProps {
  state: UsersState;
  dispatch: Dispatch<any>;
  emailsArr: string[];
  setInitialUsers: () => void;
  setFavorite: (carId: number, userFavorites: number[], user: any) => void;
}

const UsersContext = createContext<UsersContextProps | undefined>(undefined);

type UsersAction =
  | { type: "SET_USERS"; payload: any }
  | { type: "SET_SEARCHTERM"; payload: string }
  | { type: "SET_EDIT"; payload: any };

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

    case "SET_EDIT":
      return {
        ...state,
        isEdit: { values: action.payload.values, edit: action.payload.edit },
      };

    default:
      return { ...state };
  }
};

const INITIAL_STATE: UsersState = {
  users: [],
  searchTerm: "",
  isEdit: { edit: false, values: {} },
};

interface UsersProviderProps {
  children: ReactNode;
}

const FAVORITES_LIMIT = 3;

const UsersProvider: FC<UsersProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(usersReducer, INITIAL_STATE);

  const { setLoggedUser, setSnackbarProps, snackbarProps } = useAppContext();

  const users = getter(NAMESPACES.users);

  const setInitialUsers = () => {
    setter(NAMESPACES.users, dataUsers.usuarios);
    dispatch({ type: "SET_USERS", payload: dataUsers.usuarios });
  };

  useEffect(() => {
    if (users) {
      dispatch({ type: "SET_USERS", payload: users });
    } else {
      setInitialUsers();
    }
  }, []);

  const getUsersEmails = (list: any) =>
    list.map(({ email }: any) => email.toLowerCase());

  const emailsArr = state.users.length
    ? getUsersEmails(state.users)
    : getUsersEmails(dataUsers.usuarios);

  const setData = ({ newUserObj, newUsersList }: any) => {
    setLoggedUser({ isLogged: true, user: newUserObj });
    setter(NAMESPACES.users, newUsersList);
    setter(NAMESPACES.user, { user: newUserObj });
    dispatch({ type: "SET_USERS", payload: newUsersList });
  };

  const removeFavorite = (carId: number, user: any) => {
    const newFavorites = user.favorite_cars.filter(
      (el: number) => el !== carId
    );
    const usersListCopy = [...users.filter((el: any) => el.id !== user.id)];
    const newUserObj = { ...user, favorite_cars: newFavorites };
    const newUsersList = [...usersListCopy, newUserObj];

    setData({ newUserObj, newUsersList });
  };

  const addFavorite = (carId: number, user: any) => {
    user.favorite_cars.push(carId);

    const usersListCopy = [...users.filter((el: any) => el.id !== user.id)];
    const newUserObj = { ...user, favorite_cars: user.favorite_cars };
    const newUsersList = [...usersListCopy, newUserObj];

    setData({ newUserObj, newUsersList });
  };

  const setFavorite = (carId: number, user: any, isFavorite?: boolean) => {
    const { favorite_cars } = user;
    if (favorite_cars && favorite_cars.length < FAVORITES_LIMIT) {
      if (isFavorite) {
        removeFavorite(carId, user);
      } else {
        addFavorite(carId, user);
      }
    } else if (
      favorite_cars &&
      favorite_cars.length === FAVORITES_LIMIT &&
      isFavorite
    ) {
      removeFavorite(carId, user);
    } else {
      setSnackbarProps({
        ...snackbarProps,
        open: true,
        message: "You reached the limit of favorites",
        error: true,
        onClose: () => setSnackbarProps({ ...snackbarProps, open: false }),
      });
    }
  };

  return (
    <UsersContext.Provider
      value={{ state, dispatch, emailsArr, setFavorite, setInitialUsers }}
    >
      {children}
    </UsersContext.Provider>
  );
};

const useUsersContext = (): UsersContextProps => {
  const context = useContext(UsersContext);
  if (!context) {
    return {
      state: { users: [], searchTerm: "", isEdit: { edit: false, values: {} } },
      dispatch: () => {},
      setFavorite: () => {},
      setInitialUsers: () => {},
      emailsArr: [],
    };
  }
  return context;
};

export { UsersProvider, useUsersContext };
export default UsersProvider;
