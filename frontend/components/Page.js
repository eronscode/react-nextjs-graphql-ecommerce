import PropTypes from 'prop-types';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import useThemeMode from '../lib/hooks/useThemeMode';
import Header from './Header';
import ScrollButton from './ScrollButton';
import {
  darkTheme,
  GlobalStyles,
  InnerStyles,
  lightTheme,
} from './styles/GlobalStyling';

const propTypes = {
  children: PropTypes.any,
};

function PageLayout({ children }) {
  const [theme, setTheme, mountedComponent] = useThemeMode();
  const appTheme = theme === 'light' ? lightTheme : darkTheme;
  console.log({ theme });
  if (!mountedComponent) return <div />;
  return (
    <ThemeProvider theme={appTheme}>
      <ScrollButton theme={theme} onClick={setTheme} />
      <div>
        <GlobalStyles />
        <Header />
        <InnerStyles>{children}</InnerStyles>
      </div>
    </ThemeProvider>
  );
}

PageLayout.propTypes = propTypes;

export default PageLayout;
