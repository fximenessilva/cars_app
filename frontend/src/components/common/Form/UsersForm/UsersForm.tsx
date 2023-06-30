import { FC } from "react";
import * as Yup from "yup";

import styles from "../form.module.scss";
import Form from "../Form";

interface FormProps {
  theme: "light" | "dark";
  onClose: () => void;
  onSubmit: (values: any) => void;
  emailsArr: string[];
  isEdit: any;
  carsList: { value: number; label: string }[];
  favoritesLimit: number;
}

const UsersForm: FC<FormProps> = ({
  theme,
  onClose,
  onSubmit,
  emailsArr,
  isEdit,
  carsList,
}) => {
  const INITIAL_VALUES = {
    name: isEdit.edit ? isEdit.values.name : "",
    email: isEdit.edit ? isEdit.values.email : "",
    favorite_cars: isEdit.edit ? isEdit.values.favorite_cars : [],
    ...(isEdit.edit && { id: isEdit.values.id }),
  };

  const inputsList = Object.keys(INITIAL_VALUES).filter(
    (el) => !["id", "favorite_cars"].includes(el)
  );

  const categoryEmail = (value: string) => {
    const modelsIncludeValue =
      emailsArr.includes(value?.toLowerCase()) && !isEdit.edit;
    return !modelsIncludeValue;
  };

  const favoriteCarsLimit = (value: any) => {
    return !(value && value.length > 3);
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("*Name is required"),
    email: Yup.string()
      .required("*Email is required")
      .test("email", "*Email already exists", categoryEmail)
      .email("*Please choose a valid email address"),
    favorite_cars: Yup.array().test(
      "favorite_cars",
      "*You can't add more than 3 cars",
      favoriteCarsLimit
    ),
  });

  const submitHandler = (values: any) => {
    onSubmit(values);
    onClose();
  };

  return (
    <Form
      initialValues={INITIAL_VALUES}
      validationSchema={validationSchema}
      submitHandler={submitHandler}
      inputsList={inputsList}
      styles={styles}
      onClose={onClose}
      theme={theme}
      page="users"
      carsList={carsList}
    />
  );
};

export default UsersForm;
