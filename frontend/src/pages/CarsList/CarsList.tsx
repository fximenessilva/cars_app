import { useState, lazy, useMemo, ChangeEvent } from "react";

import { NAMESPACES } from "@utils/constants";
import { setter } from "@utils/localStorageHelpers";
import { useCarsContext } from "@contexts/CarsContext";
import { useAppContext } from "@contexts/AppContext";
import List from "@components/common/List";
import PageHead from "@components/common/PageHead";
import styles from "./carsList.module.scss";

const Snackbar = lazy(() => import("@components/common/Modal/Snackbar"));
const FormModal = lazy(() => import("@components/common/Modal/FormModal"));
const CarsForm = lazy(() =>
  import("@components/common/Form").then((module) => ({
    default: module.CarsForm,
  }))
);

interface Car {
  id?: number;
  brand: string;
  model: string;
}

const ALL_OPTIONS = "all options";

const CarsList = () => {
  const [open, setOpen] = useState(false);

  const {
    darkMode,
    loggedUser: { isLogged, user },
    snackbarProps,
  } = useAppContext();
  const { state, dispatch } = useCarsContext();

  const { cars, searchTerm = "", activeFilter = "", isEdit } = state;

  const theme = darkMode ? "dark" : "light";

  const removeDuplicatesSortCallback = (
    a: { brand: string },
    b: { brand: string }
  ) => {
    const labelA = a.brand.toUpperCase();
    const labelB = b.brand.toUpperCase();

    return labelA.localeCompare(labelB);
  };

  const removeDuplicatesMapCallback = ({ id, brand }: Car) => ({
    value: id ?? -1,
    label: brand,
  });

  const removeDuplicatesByBrand = (
    array: any
  ): { value: number; label: string }[] => {
    const uniquebrands: string[] = [];
    return array
      .filter((obj: any) => {
        if (!uniquebrands.includes(obj.brand)) {
          uniquebrands.push(obj.brand);
          return true;
        }
        return false;
      })
      .sort(removeDuplicatesSortCallback)
      .map(removeDuplicatesMapCallback);
  };

  const carBrands = useMemo(() => removeDuplicatesByBrand(cars), [cars]);

  const columns = cars.length ? [...Object.keys(cars[0]), " "] : [];

  const wrapperClassName = `${styles.wrapper} container`;

  const filterByNameCallback = (car: { name: string; brand: string }) => {
    const name = car.name?.toLowerCase();
    const brand = car.brand?.toLowerCase();
    const key = searchTerm?.toLowerCase();
    if (searchTerm !== "") {
      return name.includes(key) || brand.includes(key);
    } else {
      return car;
    }
  };

  const filterByBrandCallback = (car: { brand: string }) => {
    const brand = car.brand?.toLowerCase();
    const key = activeFilter?.toLowerCase() ?? "";

    if ([null, undefined, ALL_OPTIONS].includes(key)) {
      return car;
    }
    return brand.includes(key);
  };

  const filteredCars = useMemo(
    () => cars.filter(filterByNameCallback).filter(filterByBrandCallback),
    [searchTerm, activeFilter, cars]
  );

  const onTextChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: "SET_SEARCHTERM", payload: e.target.value });

  const dropdownHandler = (e: any) =>
    dispatch({ type: "SET_ACTIVE_FILTER", payload: e.label });

  const closeHandler = () => {
    setOpen(false);
    if (isEdit.edit) {
      dispatch({ type: "SET_EDIT", payload: { edit: false, values: {} } });
    }
  };

  const createNewCar = (values: Car) => {
    //get the id of the last item on the array
    const lastId = cars?.[cars.length - 1]?.id + 1 || 1;
    const setVals = { id: lastId, name: values.model, brand: values.brand };
    const newArr = [...cars, setVals];
    dispatch({ type: "SET_CARS", payload: newArr });
    setter(NAMESPACES.cars, newArr);
  };

  const updateCar = (values: Car) => {
    const filteredList = cars.filter((el) => el.id !== values.id);
    const setVals = {
      id: values.id,
      name: values.model,
      brand: values.brand,
    };
    const newArr = [setVals, ...filteredList];
    dispatch({ type: "SET_CARS", payload: newArr });
    setter(NAMESPACES.cars, newArr);
  };

  const submitHandler = (values: Car) => {
    if (!isEdit.edit) {
      createNewCar(values);
    } else {
      updateCar(values);
    }
  };

  const setEditHandler = (obj: any) => {
    dispatch({ type: "SET_EDIT", payload: { ...obj } });
    setOpen(true);
  };

  const modelsArr = useMemo(
    () => cars.map(({ name }): string => name.toLowerCase()),
    [cars]
  );

  return (
    <section className={wrapperClassName}>
      <PageHead
        onClick={() => setOpen(true)}
        title="Cars"
        onTextChange={onTextChangeHandler}
        textValue={searchTerm}
        typeOfData="cars"
        dropdownOptions={[{ label: ALL_OPTIONS, value: 0 }, ...carBrands]}
        dropdownHandler={dropdownHandler}
        isUserLogged={isLogged}
      />

      <List
        list={filteredCars}
        columns={columns}
        searchTerm={searchTerm}
        setEdit={setEditHandler}
        isEdit={isEdit.edit}
        typeOfData="car"
        user={user || {}}
      />
      {open && (
        <FormModal isOpen={open} onClose={closeHandler} title="Create new car">
          <CarsForm
            onSubmit={submitHandler}
            onClose={closeHandler}
            theme={theme}
            modelsArr={modelsArr}
            isEdit={isEdit}
          ></CarsForm>
        </FormModal>
      )}
      {snackbarProps.open && <Snackbar {...snackbarProps} />}
    </section>
  );
};

export default CarsList;
