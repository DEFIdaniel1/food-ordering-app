import React, { useState } from 'react';

import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';
import CheckoutForm from './components/Checkout/CheckoutForm';


function App() {
  const [showCart, setShowCart] = useState(false);
  const showCartHandler = () => {
    setShowCart(true);
  }
  const closeCartHandler = () => {
    setShowCart(false);
  }

    const [showCheckout, setShowCheckout] = useState(false);
    const showCheckoutHandler = () => {
      setShowCheckout(true);
    };
    const closeCheckoutHandler = () => {
      setShowCheckout(false);
    };

  return (
    <div>
      <CartProvider>
        {showCart && (
          <Cart
            onClose={closeCartHandler}
            onShowCheckout={showCheckoutHandler}
          />
        )}
        {showCheckout && <CheckoutForm onClose={closeCheckoutHandler} />}
        <Header onShowCart={showCartHandler} />
        <main>
          <Meals />
        </main>
      </CartProvider>
    </div>
  );
}

export default App;
