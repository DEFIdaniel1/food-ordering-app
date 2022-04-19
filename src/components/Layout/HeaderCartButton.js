import { useContext, useEffect, useState } from 'react';

import classes from './HeaderCartButton.module.css';
import CartIcon from '../../assets/CartIcon';
import CartContext from '../../store/cart-context';

const HeaderCartButton = props => {
    const [cartButtonBump, setCartButtonBump] = useState(false);  
    const cartCtx = useContext(CartContext);
    const {items} = cartCtx;

    const cartItemQuantity = cartCtx.items.reduce((curNumber, item) => {
      return curNumber + item.amount;
    }, 0);

//Button bump animation code
    const btnClasses = `${classes.button} ${cartButtonBump ? classes.bump : ""}`;
    //will only add the button bump when cartButtonBump = true
    useEffect(() => {
      if (items.length === 0) {
        return;
      }
      setCartButtonBump(true);
      const timer = setTimeout(() => { //clear classes.bump from cart so it can be reused again
        setCartButtonBump(false);
      }, 300)
      return () => {
        clearTimeout(timer); //cleanup function
      }
    }, [items]);//initiates anytime item value changes - upon add to cart

    return (
      <button onClick={props.onClick} className={btnClasses}>
        <span className={classes.icon}>
          <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{cartItemQuantity}</span>
      </button>
    );
};

export default HeaderCartButton; 