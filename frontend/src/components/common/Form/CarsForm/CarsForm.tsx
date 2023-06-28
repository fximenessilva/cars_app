import { FC } from "react";
import * as Yup from "yup";

import Form from "../Form";
import styles from "../form.module.scss";

interface FormProps {
  theme: "light" | "dark";
  onClose: () => void;
  onSubmit: (values: any) => void;
  modelsArr: string[];
}

const INITIAL_VALUES = {
  brand: "",
  model: "",
};

const inputsList = Object.keys(INITIAL_VALUES);

const CarsForm: FC<FormProps> = ({ theme, onClose, onSubmit, modelsArr }) => {
  const categoryName = (value: string) => {
    const modelsIncludeValue = modelsArr.includes(value?.toLowerCase());
    return !modelsIncludeValue;
  };

  const validationSchema = Yup.object().shape({
    brand: Yup.string().required("*Brand is required"),
    model: Yup.string()
      .required("*Model is required")
      .test("title", "*Model name already exists", categoryName),
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

export default CarsForm;
