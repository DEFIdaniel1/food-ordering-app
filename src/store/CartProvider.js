import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0
};

//dispatchFun for useReducer - outside component b/c it doesn't need anything in the
//comp and shouldn't be recreated everytime the state is evaluated
const cartReducer = (state, action) => {
  switch(action.type) {
    case 'ADD_ITEM': 
      const updatedItems = state.items.concat(action.item);//like push, but outputs a NEW array
      const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount
      };
    case 'REMOVE_ITEM':
      return{};
    default:
      return state
  };
};

//to manage all cart context data and provide to components who need access
const CartProvider = props => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({type: 'ADD_ITEM', item: item}); //forwards item
  }

  const removeItemFromCartHandler = id => {
    dispatchCartAction({type: 'REMOVE_ITEM', id: id}) //forward ID
  };

    const cartContext = {
      items: cartState.items,
      totalAmount: cartState.totalAmount,
      addItem: addItemToCartHandler, 
      removeItem: removeItemFromCartHandler 
    };
    
    return (
        <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>
    )
};

export default CartProvider;