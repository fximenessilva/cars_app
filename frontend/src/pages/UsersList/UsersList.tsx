import { useState, lazy, ChangeEvent, useMemo, useEffect } from "react";

import { NAMESPACES } from "@utils/constants";
import { setter } from "@utils/localStorageHelpers";
import { useUsersContext } from "@contexts/UsersContext";
import { useCarsContext } from "@contexts/CarsContext";
import { useAppContext } from "@contexts/AppContext";
import { sortArrayByIdAscending } from "@utils/index";
import PageHead from "@components/common/PageHead";
import List from "@components/common/List";

import styles from "./usersList.module.scss";

const FormModal = lazy(() => import("@components/common/Modal/FormModal"));
const UsersForm = lazy(() =>
  import("@components/common/Form").then((module) => ({
    default: module.UsersForm,
  }))
);

interface User {
  id?: number;
  email: string;
  name: string;
  favorite_cars: { value: number }[];
}

const UsersList = () => {
  const [open, setOpen] = useState(false);

  const {
    darkMode,
    loggedUser: { isLogged, user },
  } = useAppContext();
  const { state: usersState, dispatch, emailsArr } = useUsersContext();
  const { state: carsState } = useCarsContext();

  const { users, searchTerm, isEdit } = usersState;
  const { cars } = carsState;

  const carsList = useMemo(
    () =>
      cars?.map(({ id, brand, name }) => ({
        value: id,
        label: `${brand} ${name}`,
      })),
    [cars]
  );

  const theme = darkMode ? "dark" : "light";

  const data = users.map(({ favorite_cars, id, ...props }) => ({
    favorite_cars: cars.filter(({ id }) => favorite_cars.includes(id)),
    id,
    ...props,
  }));

  const columns = users.length ? [...Object.keys(users[0]), " "] : [];

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

  const closeHandler = () => {
    setOpen(false);
    if (isEdit.edit) {
      dispatch({ type: "SET_EDIT", payload: { edit: false, values: {} } });
    }
  };

  const updateUsersState = (list: any) => {
    dispatch({ type: "SET_USERS", payload: list });
    setter(NAMESPACES.users, list);
  };

  const createNewUser = (values: User) => {
    //get the id of the last item on the array after sorting it by id ascending
    const lastId = sortArrayByIdAscending(users)?.[users.length - 1].id + 1;
    const setVals = {
      id: lastId,
      ...values,
      favorite_cars: values.favorite_cars.map(({ value }) => value),
    };
    const newArr = [...users, setVals];

    updateUsersState(newArr);
  };

  const updateUser = (values: User) => {
    const filteredList = users.filter((el) => el.id !== values.id);
    const setVals = {
      ...values,
      favorite_cars: values.favorite_cars.map(({ value }) => value),
    };
    const newArr = [setVals, ...filteredList];
    updateUsersState(newArr);
  };

  const submitHandler = (values: User) => {
    if (!isEdit.edit) {
      createNewUser(values);
    } else {
      updateUser(values);
    }
  };

  const onTextChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: "SET_SEARCHTERM", payload: e.target.value });

  const setEditHandler = (obj: any) => {
    dispatch({ type: "SET_EDIT", payload: { ...obj } });
    setOpen(true);
  };

  return (
    <section className={wrapperClassName}>
      <PageHead
        onClick={() => setOpen(true)}
        title="Users"
        onTextChange={onTextChangeHandler}
        textValue={searchTerm}
        typeOfData="users"
        isUserLogged={isLogged}
      />

      <List
        list={filteredUsers}
        columns={columns}
        searchTerm={searchTerm}
        setEdit={setEditHandler}
        isEdit={isEdit.edit}
        typeOfData="user"
        user={user || {}}
      />

      {open && (
        <FormModal isOpen={open} onClose={closeHandler} title="Create new user">
          <UsersForm
            onSubmit={submitHandler}
            onClose={closeHandler}
            theme={theme}
            emailsArr={emailsArr}
            isEdit={isEdit}
            carsList={carsList}
          ></UsersForm>
        </FormModal>
      )}
    </section>
  );
};

export default UsersList;
