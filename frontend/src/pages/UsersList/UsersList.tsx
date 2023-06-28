import { useState, lazy, ChangeEvent, useMemo } from "react";

import { NAMESPACES } from "@utils/constants";
import { setter, getter } from "@utils/localStorageHelpers";
import { useUsersContext } from "@contexts/UsersContext";
import { useCarsContext } from "@contexts/CarsContext";
import { useAppContext } from "@contexts/AppContext";
import PageHead from "@components/common/PageHead";
import List from "@components/common/List";

import styles from "./usersList.module.scss";

const FormModal = lazy(() => import("@components/common/Modal/FormModal"));
const UsersForm = lazy(() =>
  import("@components/common/Form").then((module) => ({
    default: module.UsersForm,
  }))
);

const NotFoundData = lazy(() => import("@components/common/NotFoundData"));
const Modal = lazy(() => import("@components/common/Modal"));

const UsersList = () => {
  const [open, setOpen] = useState(false);

  const { darkMode } = useAppContext();
  const { state: usersState, dispatch } = useUsersContext();
  const { state: carsState } = useCarsContext();

  const { users, searchTerm } = usersState;
  const { cars } = carsState;

  const theme = darkMode ? "dark" : "light";

  const data = users.map(({ favorite_cars, id, ...props }) => ({
    favorite_cars: cars
      .filter(({ id }) => favorite_cars.includes(id))
      .map(({ brand, name }) => `${brand} ${name}`),
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

  const filteredUsers = useMemo(
    () => data.filter(filterCallback),
    [searchTerm, users]
  );

  const emailsArr = useMemo(
    () => users.map(({ email }): string => email.toLowerCase()),
    [users]
  );

  const closeHandler = () => setOpen(false);

  const submitHandler = (values: { email: string; name: string }) => {
    //get the id of the last item on the array
    const lastId = users[users.length - 1].id + 1;
    const setVals = { id: lastId, name: values.name, email: values.email };
    const newArr = [...users, setVals];
    dispatch({ type: "SET_USERS", payload: newArr });
    setter(NAMESPACES.users, newArr);
  };

  const onTextChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: "SET_SEARCHTERM", payload: e.target.value });

  return (
    <section className={wrapperClassName}>
      <PageHead
        onClick={() => setOpen(true)}
        title="Users"
        onTextChange={onTextChangeHandler}
        textValue={searchTerm}
        typeOfData="users"
      />

      <List list={filteredUsers} columns={columns} searchTerm={searchTerm} />

      {open && (
        <FormModal isOpen={open} onClose={closeHandler} title="Create new user">
          <UsersForm
            onSubmit={submitHandler}
            onClose={closeHandler}
            theme={theme}
            emailsArr={emailsArr}
          ></UsersForm>
        </FormModal>
      )}
    </section>
  );
};

export default UsersList;
