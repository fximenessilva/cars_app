import { useUsersContext } from "@contexts/UsersContext";
import { useCarsContext } from "@contexts/CarsContext";
import Table from "@components/common/Table";
import PageHead from "@components/common/PageHead/PageHead";
import styles from "./usersList.module.scss";

const UsersList = () => {
  const { state: usersState } = useUsersContext();
  const { state: carsState } = useCarsContext();

  const { users } = usersState;
  const { cars } = carsState;

  const data = users.map(({ coches_favoritos, id, ...props }) => ({
    coches_favoritos: cars
      .filter(({ id }) => coches_favoritos.includes(id))
      .map(({ marca, nombre }) => `${marca} ${nombre}`),
    ...props,
  }));

  const columns = users.length
    ? [...Object.keys(users[0]).filter((el) => el !== "id"), " "]
    : [];

  const wrapperClassName = `${styles.wrapper} container`;

  return (
    <section className={wrapperClassName}>
      <PageHead title="Users" />
      <Table columns={columns} data={data} />
    </section>
  );
};

export default UsersList;
