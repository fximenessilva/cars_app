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

import dataCars from "@data/cars.json";

interface Car {
  id: number;
  nombre: string;
  marca: string;
}

interface CarsState {
  cars: Car[];
}

interface CarsContextProps {
  state: CarsState;
  dispatch: Dispatch<any>;
}

const CarsContext = createContext<CarsContextProps | undefined>(undefined);

type CarsAction = { type: "SET_CARS"; payload: any };

const carsReducer = (state: CarsState, action: CarsAction): CarsState => {
  switch (action.type) {
    case "SET_CARS":
      return {
        ...state,
        cars: action.payload,
      };

    default:
      return { ...state };
  }
};

const INITIAL_STATE: CarsState = {
  cars: [],
};

interface CarsProviderProps {
  children: ReactNode;
}

const CarsProvider: FC<CarsProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(carsReducer, INITIAL_STATE);

  useEffect(() => {
    const cars = getter(NAMESPACES.cars);
    if (cars) {
      dispatch({ type: "SET_CARS", payload: cars });
    } else {
      setter(NAMESPACES.cars, dataCars.coches);
    }
  }, []);

  return (
    <CarsContext.Provider value={{ state, dispatch }}>
      {children}
    </CarsContext.Provider>
  );
};

const useCarsContext = (): CarsContextProps => {
  const context = useContext(CarsContext);
  if (!context) {
    return { state: { cars: [] }, dispatch: () => {} };
  }
  return context;
};

export { CarsProvider, useCarsContext };

export default CarsProvider;