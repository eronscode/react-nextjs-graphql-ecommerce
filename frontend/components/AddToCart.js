import { useMutation } from '@apollo/client';
import { ADD_TO_CART_MUTATION } from '../utils/graphql/cart.graphql';
import { CURRENT_USER_QUERY } from '../utils/graphql/user.graphql';

export default function AddToCart({ id }) {
  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: { id },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  return (
    <button disabled={loading} type="button" onClick={addToCart}>
      Add{loading && 'ing'} To Cart 🛒
    </button>
  );
}
