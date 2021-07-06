import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.any,
};

function PageLayout({ children }) {
  return <div>{children}</div>;
}

PageLayout.propTypes = propTypes;

export default PageLayout;
