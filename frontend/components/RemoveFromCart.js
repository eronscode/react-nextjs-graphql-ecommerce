import { useMutation } from '@apollo/client';
import styled from 'styled-components';
import { REMOVE_FROM_CART_MUTATION } from '../utils/graphql/cart.graphql';

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  color: var(--secondary);
  &:hover {
    color: var(--primary);
    cursor: pointer;
  }
`;

const RemoveBtn = styled.span`
  font-size: 15px;
  color: var(--secondary);
`;

function update(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteCartItem));
}

export default function RemoveFromCart({ id }) {
  const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_CART_MUTATION, {
    variables: { id },
    update,
    // optimisticResponse: {
    //   deleteCartItem: {
    //     __typename: 'CartItem',
    //     id,
    //   },
    // },
  });
  return (
    <BigButton
      onClick={removeFromCart}
      disabled={loading}
      type="button"
      title="Remove This Item from Cart"
    >
      <RemoveBtn>Remov{loading ? 'ing...' : 'e'}</RemoveBtn>
    </BigButton>
  );
}
