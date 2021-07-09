/* eslint-disable react/jsx-props-no-spreading */
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const propTypes = {
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  info: PropTypes.string,
  invalid: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
};

const defaultProps = {
  className: undefined,
  value: undefined,
  label: undefined,
  name: undefined,
  info: undefined,
  invalid: undefined,
  onChange: () => {},
};

const Input = forwardRef(function InputFunc(
  { className, label, name, invalid, info, ...inputProps },
  ref
) {
  return (
    <div>
      <StyledInput className={className}>
        {label && (
          <label htmlFor={name}>
            {label} {info && <InfoText>{info}</InfoText>}
          </label>
        )}
        <InputElement invalid={invalid} name={name} ref={ref} {...inputProps} />
        {invalid && <ErrorText>{invalid}</ErrorText>}
      </StyledInput>
    </div>
  );
});

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

const StyledInput = styled.div`
  position: relative;
  display: inline-block;
  height: 46px;
  width: 100%;
  border-radius: 4px;
`;

const InputElement = styled.input`
  height: 100%;
  width: 100%;
  padding: 0 7px;
  border-radius: 3px;
  height: 46px;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.secondary};
  color: ${(props) => props.theme.secondary};
  background: ${(props) => props.theme.secondary};
  transition: background 0.1s;
  &:hover {
    background: ${(props) => props.theme.secondary};
  }
  &:focus {
    background: #fff;
    /* border: 1px solid ${(props) => props.theme.secondary};
    box-shadow: 0 0 0 1px ${(props) => props.theme.secondary}; */
  }
  ${(props) =>
    props.invalid &&
    css`
      border: 1px solid ${props.theme.danger};
      &,
      &:focus {
        border: 1px solid ${props.theme.danger};
        box-shadow: none;
      }
    `}
`;

const ErrorText = styled.p`
  color: ${(props) => props.theme.danger};
`;
const InfoText = styled.small`
  color: ${(props) => props.theme.primary};
`;

export default Input;
