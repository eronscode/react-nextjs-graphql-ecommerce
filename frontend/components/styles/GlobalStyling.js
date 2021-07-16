import styled, { createGlobalStyle } from 'styled-components';

const buttonColor = {
  primary: {
    default: '#172a3a',
    hover: '#172a3a',
    active: '#172a3a',
  },
};
const lightTheme = {
  default: '#ffffff',
  primary: '#FFAb44',
  secondary: '#393939',
  danger: 'red',
  buttonColor,
};

const darkTheme = {
  default: '#172a3a',
  primary: '#FFAb44',
  secondary: '#fff',
  danger: 'red',
  buttonColor,
};

const GlobalStyles = createGlobalStyle`
    @font-face {
    font-family: 'radnika_next';
    src: url('/static/radnikanext-medium-webfont.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  html {
    --primary: ${(props) => props.theme.primary};
    --secondary: ${(props) => props.theme.secondary};
    --grey: #3A3A3A;
    --gray: var(--grey);
    --lightGrey: #e1e1e1;
    --lightGray: var(--lightGrey);
    --offWhite: #ededed;
    --maxWidth: 1000px;
    --bs: 0 12px 24px 0 rgba(0,0,0,0.09);
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    font-family: 'radnika_next', --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height:2;
    background: ${(props) => props.theme.default};
    transition: all 0.25s linear;
  }
  a {
    text-decoration: none;
    color: var(--secondary);
  }
  p {
    text-decoration: none;
    color: var(--secondary);
  }
  h1,h2,h3,h4,h5{
    color: var(--secondary);
  
  }
  a:hover {
    text-decoration: underline;
  }
  button {
    font-family: 'radnika_next', --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

const InnerStyles = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 2rem;
`;

export { GlobalStyles, InnerStyles, lightTheme, darkTheme };
