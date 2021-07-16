/* eslint-disable react/jsx-props-no-spreading */
import { Form, Formik } from 'formik';
import React, { useState } from 'react';

import * as Yup from 'yup';
import Button from '../../components/Button';
import FormikInput from '../../components/FormikInput';
import Input from '../../components/Input';
import { FormWrapper, FormItem } from '../../components/styles/Form';
import { CREATE_PRODUCT_MUTATION } from '../../lib/graphql/products.graphql';

const getFormProps = ({ ...props }) => {
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const initialValues = {
    name: '',
    price: '',
    image: '',
    // lastName: '',
    // email: '',
    // phone: '',
    // password: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Product name must be more than 2 characters')
      .required('Product name is required'),
    price: Yup.string()
      .min(3, 'Product price must be more than 2 characters')
      .required('Product price is required'),
    // image: Yup.string().required('Product image is required'),
    // lastName: Yup.string()
    //   .min(3, 'Last name must be more than 2 characters')
    //   .required('Last name is required'),
    // email: Yup.string()
    //   .email('Invalid email address')
    //   .required('Email is required'),
    // phone: Yup.string()
    //   .matches(phoneRegExp, 'Phone number is not valid')
    //   .min(10, 'Phone number is short. Should be 11 characters')
    //   .max(11, 'Phone number is long. Should be 11 characters')
    //   .required('Phone number is required'),
    // password: Yup.string()
    //   .min(6, 'Password should be at least six characters')
    //   .required('Password is required'),
  });

  return {
    initialValues,
    validationSchema,
    ...props,
  };
};

function CreateProduct() {
  const [file, setFile] = useState('');

  async function handleSubmit(values, actions) {
    const { name, price, image } = values;
    console.log('', values);
    console.log('', file);
  }

  function handleFileChange(e) {
    setFile(e.target.files[0]);
  }
  return (
    <div>
      <Formik
        {...getFormProps({
          onSubmit: handleSubmit,
        })}
      >
        {() => (
          <Form>
            <FormWrapper>
              <h4>Hi there. You can create products here.</h4>
              <fieldset aria-busy>
                <FormItem>
                  <FormikInput.Input
                    label="Product Name"
                    name="name"
                    type="text"
                    placeholder="Product Name"
                  />
                </FormItem>
                <FormItem>
                  <FormikInput.Input
                    label="Product Price"
                    name="price"
                    type="number"
                    placeholder="Product Price"
                  />
                </FormItem>
                <FormItem>
                  <Input
                    label="Product Image"
                    name="image"
                    type="file"
                    onChange={(e) => {
                      handleFileChange(e);
                    }}
                  />
                </FormItem>
                <FormItem>
                  <FormikInput.Input
                    label="Product Description"
                    name="description"
                    type="text"
                    placeholder="Product Description"
                  />
                </FormItem>
                <FormItem>
                  <Button type="style" variant="primary">
                    Create Product
                  </Button>
                </FormItem>
              </fieldset>
            </FormWrapper>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CreateProduct;
