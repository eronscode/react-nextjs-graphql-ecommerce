import { useMutation, useQuery } from '@apollo/client';
import { Form, Formik } from 'formik';
import { Router } from 'next/router';
import React from 'react';

import * as Yup from 'yup';
import Button from '../../components/Button';
import DisplayError from '../../components/ErrorMessage';
import FormikInput from '../../components/FormikInput';
import { FormWrapper, FormItem } from '../../components/styles/Form';
import {
  SINGLE_PRODUCT_QUERY,
  UPDATE_PRODUCT_MUTATION,
} from '../../utils/graphql/products.graphql';

const getFormProps = ({ ...props }) => {
  // const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Product name must be more than 2 characters')
      .required('Product name is required'),
    price: Yup.string()
      .min(3, 'Product price must be more than 2 characters')
      .required('Product price is required'),
  });

  return {
    validationSchema,
    ...props,
  };
};

function UpdateProduct({ id }) {
  const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id },
  });

  const [
    updateProduct,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_PRODUCT_MUTATION);

  async function handleSubmit(values) {
    console.log({ values });
    const { name, price, description } = values;
    const res = await updateProduct({
      variables: {
        id,
        name,
        description,
        price: parseInt(price),
      },
    });
    console.log({ res });
  }
  if (loading) return <p>loading...</p>;
  return (
    <div>
      <Formik
        /* eslint-disable react/jsx-props-no-spreading */
        {...getFormProps({
          onSubmit: handleSubmit,
          enableReinitialize: true,
          initialValues: data?.Product || {
            name: '',
            price: '',
            description: '',
          },
        })}
      >
        {() => (
          <Form>
            <DisplayError error={error || updateError} />
            <FormWrapper>
              <h4>Edit Product</h4>
              <fieldset disabled={updateLoading} aria-busy={updateLoading}>
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
                  <FormikInput.Input
                    label="Product Description"
                    name="description"
                    type="text"
                    placeholder="Product Description"
                  />
                </FormItem>
                <FormItem>
                  <Button type="style" variant="primary">
                    Update Product
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

export default UpdateProduct;
