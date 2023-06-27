import dataUsers from "@data/users.json";
import dataCars from "@data/cars.json";

import Table from "@components/common/Table";
import PageHead from "@components/common/PageHead/PageHead";
import styles from "./carsList.module.scss";

const { usuarios: users } = dataUsers;
const { coches: cars } = dataCars;

const data = users.map(({ coches_favoritos, id, ...props }) => ({
  coches_favoritos: cars
    .filter(({ id }) => coches_favoritos.includes(id))
    .map(({ marca, nombre }) => `${marca} ${nombre}`),
  ...props,
}));
const columns = [...Object.keys(users[0]).filter((el) => el !== "id"), " "];

const CarsList = () => {
  const wrapperClassName = `${styles.wrapper} container`;

  return (
    <section className={wrapperClassName}>
      <PageHead title="Cars" />
      <Table columns={columns} data={data} />
    </section>
  );
};

export default CarsList;
