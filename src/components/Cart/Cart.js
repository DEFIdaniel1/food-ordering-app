import {useContext} from 'react';

import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';


const Cart = props => {
  const cartCtx = useContext(CartContext);
  const totalAmount = cartCtx.totalAmount;
  const hasItems = cartCtx.items.length > 0;
  
  const removeCartItemHandler = () => {};
  const addCartItemHandler = () => {};

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          //need to bind below and give the item to pass through -id and item respectively
          onRemove={removeCartItemHandler.bind(null, item.id)}
          onAdd={addCartItemHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
 
    return (
      <Modal onClose={props.onClose}>
        {cartItems}
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{`$${totalAmount.toFixed(2)}`}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={props.onClose} className={classes["button--alt"]}>
            Close
          </button>
          {hasItems && <button className={classes.button}>
            Order
          </button>}
        </div>
      </Modal>
    );
};

export default Cart;