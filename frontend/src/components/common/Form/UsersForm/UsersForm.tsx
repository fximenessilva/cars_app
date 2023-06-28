import { FC } from "react";
import * as Yup from "yup";

import styles from "../form.module.scss";
import Form from "../Form";

interface FormProps {
  theme: "light" | "dark";
  onClose: () => void;
  onSubmit: (values: any) => void;
  emailsArr: string[];
}

const INITIAL_VALUES = {
  name: "",
  email: "",
};

const inputsList = Object.keys(INITIAL_VALUES);

const UsersForm: FC<FormProps> = ({ theme, onClose, onSubmit, emailsArr }) => {
  const categoryEmail = (value: string) => {
    const modelsIncludeValue = emailsArr.includes(value?.toLowerCase());
    return !modelsIncludeValue;
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("*Name is required"),
    email: Yup.string()
      .required("*Email is required")
      .test("email", "*Email name already exists", categoryEmail),
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
    />
  );
};

export default UsersForm;
