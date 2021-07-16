import Link from 'next/link';
import { useCart } from '../context/cart.context';
import { useUser } from '../utils/hooks/api/useUser';
import SignOut from './SignOut';
import NavStyles from './styles/NavStyles';

export default function Nav() {
  const user = useUser();
  const { openCart } = useCart();
  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {user && (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
          <SignOut />
          <button type="button" onClick={openCart}>
            My Cart
          </button>
        </>
      )}
      {!user && (
        <>
          <Link href="/signin">Sign In</Link>
          <Link href="/signup">Create Account</Link>
        </>
      )}
    </NavStyles>
  );
}
