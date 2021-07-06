import PropTypes from 'prop-types';
import PageLayout from '../components/Page';

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
