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
import { useUsersContext } from "./UsersContext";
import { useAppContext } from "./AppContext";
import { NAMESPACES } from "@utils/constants";

import dataCars from "@data/cars.json";

interface Car {
  id: number;
  name: string;
  brand: string;
}

interface CarsState {
  cars: Car[];
  searchTerm: string;
  activeFilter: string | null;
  isEdit: { edit: boolean; values: any };
}

interface CarsContextProps {
  state: CarsState;
  dispatch: Dispatch<any>;
  deleteCar: (carId: number) => void;
}

const CarsContext = createContext<CarsContextProps | undefined>(undefined);

type CarsAction =
  | { type: "SET_CARS"; payload: any }
  | { type: "SET_SEARCHTERM"; payload: string }
  | { type: "SET_ACTIVE_FILTER"; payload: string }
  | { type: "SET_EDIT"; payload: any };

const carsReducer = (state: CarsState, action: CarsAction): CarsState => {
  switch (action.type) {
    case "SET_CARS":
      return {
        ...state,
        cars: action.payload,
      };

    case "SET_SEARCHTERM":
      return {
        ...state,
        searchTerm: action.payload,
      };

    case "SET_ACTIVE_FILTER":
      return {
        ...state,
        activeFilter: action.payload,
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

const INITIAL_STATE: CarsState = {
  cars: [],
  searchTerm: "",
  activeFilter: null,
  isEdit: { edit: false, values: {} },
};

interface CarsProviderProps {
  children: ReactNode;
}

const CarsProvider: FC<CarsProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(carsReducer, INITIAL_STATE);

  const {
    state: { users },
    dispatch: usersDispatch,
  } = useUsersContext();

  const {
    loggedUser: { user },
    setLoggedUser,
  } = useAppContext();

  useEffect(() => {
    const cars = getter(NAMESPACES.cars);
    if (cars) {
      dispatch({ type: "SET_CARS", payload: cars });
    } else {
      setter(NAMESPACES.cars, dataCars.coches);
      dispatch({ type: "SET_CARS", payload: dataCars.coches });
    }
  }, []);

  const deleteCar = (carId: number) => {
    const filteredCars = state.cars.filter((car) => car.id !== carId);
    dispatch({ type: "SET_CARS", payload: filteredCars });
    setter(NAMESPACES.cars, filteredCars);
    removeCarFromFavorites(carId);
  };

  const removeCarFromFavorites = (carId?: number) => {
    const newUsersList = users.map((user) => ({
      ...user,
      favorite_cars: user.favorite_cars.filter((id) => id !== carId),
    }));
    const newUserObj = {
      ...user,
      favorite_cars: user.favorite_cars.filter((id) => id !== carId),
    };
    usersDispatch({ type: "SET_USERS", payload: newUsersList });
    setter(NAMESPACES.users, newUsersList);
    setter(NAMESPACES.user, { user: newUserObj });
    setLoggedUser({ isLogged: true, user: newUserObj });
  };

  return (
    <CarsContext.Provider value={{ state, dispatch, deleteCar }}>
      {children}
    </CarsContext.Provider>
  );
};

const useCarsContext = (): CarsContextProps => {
  const context = useContext(CarsContext);
  if (!context) {
    return {
      state: {
        cars: [],
        searchTerm: "",
        activeFilter: null,
        isEdit: { edit: false, values: {} },
      },
      dispatch: () => {},
      deleteCar: () => {},
    };
  }
  return context;
};

export { CarsProvider, useCarsContext };

export default CarsProvider;
