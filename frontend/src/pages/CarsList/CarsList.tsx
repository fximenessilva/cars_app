import { useState, lazy, useMemo, ChangeEvent } from "react";

import { useCarsContext } from "@contexts/CarsContext";
import Table from "@components/common/Table";
import PageHead from "@components/common/PageHead";
import styles from "./carsList.module.scss";

const NotFoundData = lazy(() => import("@components/common/NotFoundData"));
const Modal = lazy(() => import("@components/common/Modal"));

interface Car {
  id: number;
  marca: string;
}

const ALL_OPTIONS = "all options";

const CarsList = () => {
  const [open, setOpen] = useState(false);

  const { state, dispatch } = useCarsContext();

  const { cars, searchTerm = "", activeFilter = "" } = state;

  const removeDuplicatesSortCallback = (
    a: { marca: string },
    b: { marca: string }
  ) => {
    const labelA = a.marca.toUpperCase();
    const labelB = b.marca.toUpperCase();

    return labelA.localeCompare(labelB);
  };

  const removeDuplicatesMapCallback = ({
    id,
    marca,
  }: {
    id: number;
    marca: string;
  }) => ({
    value: id,
    label: marca,
  });

  const removeDuplicatesByBrand = (
    array: Car[]
  ): { value: number; label: string }[] => {
    const uniqueMarcas: string[] = [];
    return array
      .filter((obj) => {
        if (!uniqueMarcas.includes(obj.marca)) {
          uniqueMarcas.push(obj.marca);
          return true;
        }
        return false;
      })
      .sort(removeDuplicatesSortCallback)
      .map(removeDuplicatesMapCallback);
  };

  const carBrands = removeDuplicatesByBrand(cars);

  const columns = cars.length
    ? [...Object.keys(cars[0]).filter((el) => el !== "id"), " "]
    : [];

  const wrapperClassName = `${styles.wrapper} container`;

  const filterByNameCallback = (car: { nombre: string; marca: string }) => {
    const nombre = car.nombre?.toLowerCase();
    const marca = car.marca?.toLowerCase();
    const key = searchTerm?.toLowerCase();
    if (searchTerm !== "") {
      return nombre.includes(key) || marca.includes(key);
    } else {
      return car;
    }
  };

  const filterByBrandCallback = (car: { marca: string }) => {
    const marca = car.marca?.toLowerCase();
    const key = activeFilter?.toLowerCase() ?? "";

    if ([null, undefined, ALL_OPTIONS].includes(key)) {
      return car;
    }
    return marca.includes(key);
  };

  const filteredCars = cars
    .filter(filterByNameCallback)
    .filter(filterByBrandCallback);

  const onTextChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: "SET_SEARCHTERM", payload: e.target.value });

  const dropdownHandler = (e: any) =>
    dispatch({ type: "SET_ACTIVE_FILTER", payload: e.label });

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
      />

      {filteredCars.length ? (
        <Table columns={columns} data={filteredCars} />
      ) : (
        <NotFoundData typeOfData="cars" searchTerm={searchTerm} />
      )}
      {open && (
        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Create new car"
          leftBtnTxt="Delete"
          rightBtnTxt="Cancel"
        >
          aaaaasdlk asdjasd
        </Modal>
      )}
    </section>
  );
};

export default CarsList;
