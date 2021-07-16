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
  SIGNUP_MUTATION,
} from '../utils/graphql/user.graphql';

const getFormProps = ({ ...props }) => {
  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Full name is required'),
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

function SignUp() {
  const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
    // refetch the currently logged in user
    // refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  async function handleSubmit(values) {
    const { name, email, password } = values;
    const payload = {
      name,
      email,
      password,
    };

    const res = await signup({
      variables: payload,
    }).catch(console.error);
    console.log({ res });
    if (res?.data.createUser.__typename === 'User') {
      Router.push({
        pathname: `/signin`,
      });
    }
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
              <h4>Create an accout!</h4>
              <fieldset disabled={loading} aria-busy={loading}>
                <FormItem>
                  <FormikInput.Input
                    label="Full Name"
                    name="name"
                    type="text"
                    placeholder="Full Name"
                  />
                </FormItem>
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

export default SignUp;
