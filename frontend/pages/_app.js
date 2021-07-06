import PropTypes from 'prop-types';
import NProgress from 'nprogress';
import Router from 'next/router';
import PageLayout from '../components/Page';
import '../components/styles/nprogress.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const propTypes = {
  Component: PropTypes.any,
};

function MainApp({ Component, pageProps }) {
  return (
    <PageLayout>
      <Component {...pageProps} />
    </PageLayout>
  );
}

MainApp.propTypes = propTypes;

export default MainApp;
