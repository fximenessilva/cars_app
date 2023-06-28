import { useState, lazy } from "react";

import { useUsersContext } from "@contexts/UsersContext";
import { useCarsContext } from "@contexts/CarsContext";
import Table from "@components/common/Table";
import PageHead from "@components/common/PageHead";

import styles from "./usersList.module.scss";

const NotFoundData = lazy(() => import("@components/common/NotFoundData"));
const Modal = lazy(() => import("@components/common/Modal"));

const UsersList = () => {
  const [open, setOpen] = useState(false);

  const { state: usersState, dispatch } = useUsersContext();
  const { state: carsState } = useCarsContext();

  const { users, searchTerm } = usersState;
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

  const filterCallback = (user: { name: string; email: string }) => {
    const name = user.name?.toLowerCase();
    const email = user.email?.toLowerCase();
    const key = searchTerm?.toLowerCase();
    if (searchTerm !== "") {
      return name.includes(key) || email.includes(key);
    } else {
      return user;
    }
  };

  const filteredUsers = data.filter(filterCallback);

  return (
    <section className={wrapperClassName}>
      <PageHead
        onClick={() => setOpen(true)}
        title="Users"
        onTextChange={(e) =>
          dispatch({ type: "SET_SEARCHTERM", payload: e.target.value })
        }
        textValue={searchTerm}
        typeOfData="users"
      />
      {filteredUsers.length ? (
        <Table columns={columns} data={filteredUsers} />
      ) : (
        <NotFoundData typeOfData="users" searchTerm={searchTerm} />
      )}

      {open && (
        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Create new user"
          leftBtnTxt="Delete"
          rightBtnTxt="Cancel"
        >
          askdjhasdjl asldlas
        </Modal>
      )}
    </section>
  );
};

export default UsersList;
