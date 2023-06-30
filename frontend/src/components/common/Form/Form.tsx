import { ReactNode, FC } from "react";
import {
  Formik,
  Form as FormikForm,
  Field,
  ErrorMessage,
  FormikProps,
} from "formik";
import Dropdown from "./Dropdown";

import Button from "../Button";
import TextInput from "./TextInput";

interface CarsList {}

interface FormProps {
  initialValues: any;
  validationSchema: any;
  submitHandler: (values: any) => void;
  inputsList: string[];
  styles: any;
  onClose: () => void;
  theme: "light" | "dark";
  page: string;
  carsList?: { value: number; label: string }[];
}

const Form: FC<FormProps> = ({
  initialValues,
  validationSchema,
  submitHandler,
  inputsList,
  styles,
  onClose,
  theme,
  page,
  carsList,
}) => {
  const isUsers = page === "users";

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        submitHandler(values);
        resetForm();
        setSubmitting(false);
      }}
    >
      {({ values, errors, handleChange, handleSubmit, setFieldValue }) => {
        const handleChangeDropdown = (
          values: { label: string; value: number }[]
        ) => {
          setFieldValue("favorite_cars", values);
        };
        return (
          <FormikForm noValidate onSubmit={handleSubmit}>
            {inputsList.map((el) => (
              <TextInput
                key={el}
                onChange={handleChange}
                label={el}
                variant="form"
                value={values[el] as string}
                name={el}
                error={errors[el] as string}
              />
            ))}
            {isUsers && (
              <Dropdown
                label="Favorite cars"
                isMulti
                options={carsList}
                handleChange={handleChangeDropdown}
                value={values.favorite_cars}
                error={errors.favorite_cars}
              />
            )}
            <div className={styles.actions}>
              <Button
                onClick={onClose}
                className={styles.submitBtn}
                theme={theme}
                type="button"
              >
                Close
              </Button>

              <Button type="submit" className={styles.submitBtn} theme={theme}>
                Submit
              </Button>
            </div>
          </FormikForm>
        );
      }}
    </Formik>
  );
};

export default Form;
