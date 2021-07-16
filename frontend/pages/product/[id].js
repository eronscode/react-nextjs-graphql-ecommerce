import SingleProduct from '../../containers/products/SinglePoduct';

export default function SingleProductPage({ query }) {
  return <SingleProduct id={query.id} />;
}
