import { FC } from "react";
import * as Yup from "yup";

import Form from "../Form";
import styles from "../form.module.scss";

interface FormProps {
  theme: "light" | "dark";
  onClose: () => void;
  onSubmit: (values: any) => void;
  emailsArr: string[];
}

const INITIAL_VALUES = {
  email: "",
};

const inputsList = Object.keys(INITIAL_VALUES);

const LoginForm: FC<FormProps> = ({ theme, onClose, onSubmit, emailsArr }) => {
  const emailExists = (value: string) => {
    const modelsIncludeValue = emailsArr.includes(value?.toLowerCase());
    return modelsIncludeValue;
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("*Please choose a valid email address")
      .required("*Email is required")
      .test("email", "*Email does not exist in our db", emailExists),
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

export default LoginForm;
