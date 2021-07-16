import * as React from 'react';

const CartContext = React.createContext();

function CartProvider(params) {
  const [cartOpen, setCartOpen] = React.useState(false);

  function toggleCart() {
    setCartOpen(!cartOpen);
  }

  function closeCart() {
    setCartOpen(false);
  }

  function openCart() {
    setCartOpen(true);
  }

  const value = {
    toggleCart,
    closeCart,
    openCart,
    cartOpen,
  };

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <CartContext.Provider value={value} {...params} />;
}

function useCart() {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error('CartContext must be used within the CartContext Provoder');
  }
  return context;
}

export { useCart, CartProvider };
