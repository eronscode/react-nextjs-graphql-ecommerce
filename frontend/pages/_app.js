/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import NProgress from 'nprogress';
import Router from 'next/router';
import { ApolloProvider } from '@apollo/client';
import PageLayout from '../components/Page';
import '../components/styles/nprogress.css';
import withData from '../utils/withData';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const propTypes = {
  Component: PropTypes.any,
};

function MainApp({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
    </ApolloProvider>
  );
}
MainApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  return { pageProps };
};

MainApp.propTypes = propTypes;

export default withData(MainApp);
