import { useMutation } from '@apollo/client';
import { Form, Formik } from 'formik';
import Router from 'next/router';
import React from 'react';

import * as Yup from 'yup';
import Button from '../components/Button';
import DisplayError from '../components/ErrorMessage';
import FormikInput from '../components/FormikInput';
import { FormWrapper, FormItem } from '../components/styles/Form';

import { REQUEST_RESET_MUTATION } from '../utils/graphql/user.graphql';

const getFormProps = ({ ...props }) => {
  const initialValues = {
    email: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Invalid email address'),
  });

  return {
    initialValues,
    validationSchema,
    ...props,
  };
};

function ForgetPassword() {
  const [requestPassword, { data, loading, error }] = useMutation(
    REQUEST_RESET_MUTATION
  );

  async function handleSubmit(values, actions) {
    const { email } = values;
    const payload = {
      email,
    };

    const res = await requestPassword({
      variables: payload,
    }).catch(console.error);
    actions.resetForm();
    console.log({ res });
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
              <h4>Forget Password? Reqeust for password reset</h4>
              <fieldset disabled={loading} aria-busy={loading}>
                {data?.sendUserPasswordResetLink === null && (
                  <p>Success! Check your email for a link!</p>
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
                  <Button type="style" variant="primary">
                    Request Password Reset!
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

export default ForgetPassword;
