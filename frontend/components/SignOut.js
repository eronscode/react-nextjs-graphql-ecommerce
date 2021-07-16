import { useMutation } from '@apollo/client';
import {
  CURRENT_USER_QUERY,
  SIGN_OUT_MUTATION,
} from '../utils/graphql/user.graphql';

export default function SignOut() {
  const [signout] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  return (
    <button style={{ cursor: 'pointer' }} type="button" onClick={signout}>
      Sign Out
    </button>
  );
}
