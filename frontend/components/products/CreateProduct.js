import { Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import FormikInput from '../FormikInput';

const getFormProps = ({ ...props }) => {
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, 'First name must be more than 2 characters')
      .required('First name is required'),
    lastName: Yup.string()
      .min(3, 'Last name must be more than 2 characters')
      .required('Last name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    phone: Yup.string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .min(10, 'Phone number is short. Should be 11 characters')
      .max(11, 'Phone number is long. Should be 11 characters')
      .required('Phone number is required'),
    password: Yup.string()
      .min(6, 'Password should be at least six characters')
      .required('Password is required'),
  });

  return {
    initialValues,
    validationSchema,
    ...props,
  };
};

function CreateProduct() {
  return (
    <div>
      <Formik>
        <Form>
          <FormikInput />
        </Form>
      </Formik>
    </div>
  );
}

export default CreateProduct;
