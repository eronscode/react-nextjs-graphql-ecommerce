import { useMutation } from '@apollo/client';
import { Form, Formik } from 'formik';
import Router from 'next/router';
import React from 'react';

import * as Yup from 'yup';
import Button from '../components/Button';
import DisplayError from '../components/ErrorMessage';
import FormikInput from '../components/FormikInput';
import Input from '../components/Input';
import { FormWrapper, FormItem } from '../components/styles/Form';

import {
  CURRENT_USER_QUERY,
  SIGNIN_MUTATION,
} from '../utils/graphql/user.graphql';

const getFormProps = ({ ...props }) => {
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Invalid email address'),
    password: Yup.string().required('Password is required'),
  });

  return {
    initialValues,
    validationSchema,
    ...props,
  };
};

function SignIn() {
  const [signin, { data, loading }] = useMutation(SIGNIN_MUTATION, {
    // refetch the currently logged in user
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  async function handleSubmit(values) {
    const { email, password } = values;
    const payload = {
      email,
      password,
    };
    const res = await signin({
      variables: payload,
    });
    console.log({ res });
    // Router.push({
    //   pathname: `/product/${res.data.createProduct.id}`,
    // });
  }

  const error =
    data?.authenticateUserWithPassword.__typename ===
    'UserAuthenticationWithPasswordFailure'
      ? data?.authenticateUserWithPassword
      : undefined;
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
              <h4>Welcome back. Pick up from where you stopped!</h4>
              <fieldset disabled={loading} aria-busy={loading}>
                <FormItem>
                  <FormikInput.Input
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="Email Address"
                  />
                </FormItem>
                <FormItem>
                  <FormikInput.Input
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Password"
                  />
                </FormItem>
                <FormItem>
                  <Button type="style" variant="primary">
                    Sign In
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

export default SignIn;
