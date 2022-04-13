import { useContext } from 'react';

import classes from './HeaderCartButton.module.css';
import CartIcon from '../../assets/CartIcon';
import CartContext from '../../store/cart-context';

const HeaderCartButton = props => {
    const cartCtx = useContext(CartContext);
    
    const cartItemQuantity = cartCtx.items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0);

    return (
      <button onClick={props.onClick} className={classes.button}>
        <span className={classes.icon}>
          <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{cartItemQuantity}</span>
      </button>
    );
};

export default HeaderCartButton; 