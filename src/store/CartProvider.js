import CartContext from './cart-context';

//to manage all cart context data and provide to components who need access
const CartProvider = props => {
    const addItemToCartHandler = item => {};
    const removeItemFromCartHandler = id => {};

    const cartContext = {
      items: [],
      totalAmount: 0,
      addItem: addItemToCartHandler, //just pointers to the function
      removeItem: removeItemFromCartHandler //also a pointer
    };
    
    return (
        <CartContext.Provider>{props.children}</CartContext.Provider>
    )
};

export default CartProvider;