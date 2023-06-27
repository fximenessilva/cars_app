import dataCars from "@data/cars.json";

import Table from "@components/common/Table";
import PageHead from "@components/common/PageHead/PageHead";
import styles from "./carsList.module.scss";

const { coches: cars } = dataCars;

const columns = [...Object.keys(cars[0]).filter((el) => el !== "id"), " "];

const CarsList = () => {
  const wrapperClassName = `${styles.wrapper} container`;

  return (
    <section className={wrapperClassName}>
      <PageHead title="Cars" />
      <Table columns={columns} data={cars} />
    </section>
  );
};

export default CarsList;
