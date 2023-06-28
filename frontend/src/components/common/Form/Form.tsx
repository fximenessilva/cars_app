import { ReactNode, FC } from "react";
import {
  Formik,
  Form as FormikForm,
  Field,
  ErrorMessage,
  FormikProps,
} from "formik";
import * as Yup from "yup";

import Button from "../Button";
import TextInput from "./TextInput";

interface FormProps {
  initialValues: any;
  validationSchema: any;
  submitHandler: (values: any) => void;
  inputsList: string[];
  styles: any;
  onClose: () => void;
  theme: "light" | "dark";
}

const Form: FC<FormProps> = ({
  initialValues,
  validationSchema,
  submitHandler,
  inputsList,
  styles,
  onClose,
  theme,
}) => {
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
      {({ values, errors, handleChange, handleSubmit }) => (
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
      )}
    </Formik>
  );
};

export default Form;
