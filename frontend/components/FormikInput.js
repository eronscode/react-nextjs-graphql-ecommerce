/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useField } from 'formik';
import Input from './Input';

const propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  invalid: PropTypes.string,
};

const defaultProps = {
  className: undefined,
  label: undefined,
  invalid: undefined,
};

const generateField = (FormComponent) => {
  const FieldComponent = ({ className, label, invalid, ...otherProps }) => {
    const [field, meta] = useField(otherProps);
    const [isError, setIsError] = useState(null);
    const customlabel = label || null;

    useEffect(() => {
      if (meta.touched && meta.error) {
        setIsError(meta.error);
      } else {
        setIsError(null);
      }
    }, [meta]);

    return (
      <FormComponent
        className={className}
        label={customlabel}
        invalid={isError}
        {...field}
        {...otherProps}
      />
    );
  };

  FieldComponent.propTypes = propTypes;
  FieldComponent.defaultProps = defaultProps;

  return FieldComponent;
};

export default {
  Input: generateField(Input),
};
