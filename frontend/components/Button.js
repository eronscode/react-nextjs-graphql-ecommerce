import React from 'react';
import styled, { css } from 'styled-components';

const defaultProps = {
  className: undefined,
  children: undefined,
  variant: 'primary',
  size: 'lg',
  disabled: false,
  isLoading: false,
  onClick: () => {},
};

const propTypes = {
  className: undefined,
  children: undefined,
  variant: 'primary',
  size: 'lg',
  disabled: false,
  isLoading: false,
  onClick: () => {},
};

const ButtonLoader = () => (
  <>
    <div className="spinner-grow spinner-grow-sm mr-2" role="status">
      <span className="sr-only">Loading...</span>
    </div>
    <div className="spinner-grow spinner-grow-sm mr-2" role="status">
      <span className="sr-only">Loading...</span>
    </div>
    <div className="spinner-grow spinner-grow-sm mr-2" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </>
);

const Button = React.forwardRef(function ButtonWrapper(
  // eslint-disable-next-line react/prop-types
  { children, variant, size, disabled, onClick, isLoading, ...restProps },
  ref
) {
  const handleClick = () => {
    if (!disabled && !isLoading) {
      onClick();
    }
  };

  return (
    <StyledButton
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restProps}
      variant={variant}
      disabled={disabled}
      size={size}
      onClick={handleClick}
      ref={ref}
    >
      {isLoading ? <ButtonLoader /> : children}
    </StyledButton>
  );
});

const buttonSizes = {
  lg: css`
    padding: 0.5rem 1rem;
    font-size: 1.25rem;
    line-height: 1.5;
    border-radius: 0.3rem;
  `,
  md: css`
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
  `,
  sm: css`
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
    line-height: 1.5;
    border-radius: 0.2rem;
  `,
};
const colored = css`
  color: #fff;
  background: ${(props) => props.theme.buttonColor[props.variant].default};

  &:not(:disabled) {
    &:hover {
      background: ${(props) => props.theme.buttonColor[props.variant].hover};
    }
    &:active {
      background: ${(props) => props.theme.buttonColor[props.variant].active};
    }
    ${(props) =>
      props.isActive &&
      css`
        background: ${props.theme.buttonColor[props.variant].active} !important;
      `}
  }
`;

const buttonVariants = {
  deafult: colored,
};

const StyledButton = styled.button`
  display: inline-block;
  font-weight: 400;
  color: #212529;
  text-align: center;
  vertical-align: middle;
  line-height: 1;
  padding: 0 12px;
  white-space: nowrap;
  border-radius: 3px;
  transition: all 0.1s;
  appearance: none;
  border: none;
  outline: 0;
  cursor: pointer;
  ${(props) => buttonVariants[props.variant]}
  ${(props) => buttonSizes[props.size]}
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

Button.defaultProps = defaultProps;

export default Button;
