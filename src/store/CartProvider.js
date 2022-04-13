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
      const updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;
        //calculates total cart amount

      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id);
      //findIndex returns true if exists when it matches the item.id we're currenly adding
      const existingCartItem = state.items[existingCartItemIndex];
      //positions index at the point of the existing item
      let updatedItems;

      if(existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.item.amount
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
          updatedItems = state.items.concat(action.item);//like push, but outputs a NEW array
      }

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