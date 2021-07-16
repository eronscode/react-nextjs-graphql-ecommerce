import { useMutation } from '@apollo/client';
import { Form, Formik } from 'formik';
import Router from 'next/router';
import React from 'react';

import * as Yup from 'yup';
import Button from '../components/Button';
import DisplayError from '../components/ErrorMessage';
import FormikInput from '../components/FormikInput';
import { FormWrapper, FormItem } from '../components/styles/Form';

import { RESET_MUTATION } from '../utils/graphql/user.graphql';

const getFormProps = ({ ...props }) => {
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Invalid email address'),
    password: Yup.string().required('New Password is required'),
  });

  return {
    initialValues,
    validationSchema,
    ...props,
  };
};

function ResetPassword({ token }) {
  const [resetPassword, { data, loading, error }] = useMutation(RESET_MUTATION);

  async function handleSubmit(values, actions) {
    const { email, password } = values;
    const payload = {
      email,
      password,
      token,
    };

    const res = await resetPassword({
      variables: payload,
    }).catch(console.error);
    actions.resetForm();
    console.log({ res });
  }

  const successfulError = data?.redeemUserPasswordResetToken?.code
    ? data?.redeemUserPasswordResetToken
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
            <DisplayError error={error || successfulError} />
            <FormWrapper>
              <h4>Reset your password!</h4>
              <fieldset disabled={loading} aria-busy={loading}>
                {data?.redeemUserPasswordResetToken === null && (
                  <p>Success! You can Now sign in</p>
                )}
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
                    Reset!
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

export default ResetPassword;
