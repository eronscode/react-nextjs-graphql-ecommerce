import { useMutation } from '@apollo/client';
import { Form, Formik } from 'formik';
import { Router } from 'next/router';
import React, { useState } from 'react';

import * as Yup from 'yup';
import Button from '../../components/Button';
import DisplayError from '../../components/ErrorMessage';
import FormikInput from '../../components/FormikInput';
import Input from '../../components/Input';
import { FormWrapper, FormItem } from '../../components/styles/Form';
import {
  ALL_PRODUCTS_QUERY,
  CREATE_PRODUCT_MUTATION,
} from '../../utils/graphql/products.graphql';

const getFormProps = ({ ...props }) => {
  // const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const initialValues = {
    name: '',
    price: '',
    description: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Product name must be more than 2 characters')
      .required('Product name is required'),
    price: Yup.string()
      .min(3, 'Product price must be more than 2 characters')
      .required('Product price is required'),
  });

  return {
    initialValues,
    validationSchema,
    ...props,
  };
};

function CreateProduct() {
  const [file, setFile] = useState('');

  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    }
  );

  async function handleSubmit(values) {
    const { name, price, description } = values;
    const payload = {
      name,
      price: parseInt(price),
      description,
      image: file,
    };
    const res = await createProduct({
      variables: payload,
    });
    console.log({ res });
    Router.push({
      pathname: `/product/${res.data.createProduct.id}`,
    });
  }
  function handleFileChange(e) {
    setFile(e.target.files[0]);
  }
  return (
    <div>
      <Formik
        /* eslint-disable react/jsx-props-no-spreading */
        {...getFormProps({
          onSubmit: handleSubmit,
        })}
      >
        {() => (
          <Form>
            <DisplayError error={error} />
            <FormWrapper>
              <h4>Hi there. You can create products here.</h4>
              <fieldset disabled={loading} aria-busy={loading}>
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
