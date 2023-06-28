import { useCarsContext } from "@contexts/CarsContext";
import Table from "@components/common/Table";
import PageHead from "@components/common/PageHead/PageHead";
import styles from "./carsList.module.scss";

const CarsList = () => {
  const { state } = useCarsContext();

  const { cars } = state;

  const columns = cars.length
    ? [...Object.keys(cars[0]).filter((el) => el !== "id"), " "]
    : [];

  const wrapperClassName = `${styles.wrapper} container`;

  return (
    <section className={wrapperClassName}>
      <PageHead title="Cars" />
      <Table columns={columns} data={cars} />
    </section>
  );
};

export default CarsList;
