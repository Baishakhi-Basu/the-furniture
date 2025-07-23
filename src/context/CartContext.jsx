import { createContext, useReducer, useState } from "react";

export const CartContext = createContext();

function reducerFunc(state, action) {
  if (action.type === "ADD_TO_CART_FROM_DISPLAY") {
    const itemIndex = state.cartProducts.findIndex(
      (cartItem) => cartItem.id === action.item.id
    );
    let allCartProducts = [...state.cartProducts];

    if (itemIndex === -1) {
      allCartProducts.push(action.item);
      return { ...state, cartProducts: allCartProducts };
    } else {
      return state;
    }
  }
  if (action.type === "HANDLE_ADD_FROM_DETAILS") {
    const itemIndex = state.cartProducts.findIndex(
      (cartItem) => cartItem.id === action.item.id
    );

    let allCartProducts = [...state.cartProducts];

    // console.log(itemIndex);
    // console.log(state.cartProducts);
    // console.log(action.item);

    if (itemIndex > -1) {
      const existingCartItem = allCartProducts[itemIndex];
      const updatedExistingItem = {
        ...existingCartItem,
        quantity: action.item.quantity,
        price: action.item.price,
        itemTotalPrice: action.item.price * action.item.quantity,
      };
      allCartProducts[itemIndex] = updatedExistingItem;
      return { ...state, cartProducts: allCartProducts };
    } else {
      let newCartItem = action.item;
      let updatedCartItem = {
        ...newCartItem,
        itemTotalPrice: newCartItem.price * newCartItem.quantity,
      };
      allCartProducts.push(updatedCartItem);
      return { ...state, cartProducts: allCartProducts };
    }
  }

  if (action.type === "ADD_TO_CART") {
    const itemIndex = state.cartProducts.findIndex(
      (cartItem) => cartItem.id === action.item.id
    );
    // console.log(state.cartProducts);
    // console.log(action.item.id);
    // console.log(itemIndex);

    let allCartProducts = [...state.cartProducts];

    if (itemIndex > -1) {
      const selectedCartItem = allCartProducts[itemIndex];
      const updatedCartItem = {
        ...selectedCartItem,
        quantity: selectedCartItem.quantity + 1,
        itemTotalPrice:
          selectedCartItem.price * (selectedCartItem.quantity + 1),
      };
      allCartProducts[itemIndex] = updatedCartItem;
      return { ...state, cartProducts: allCartProducts };
    } else {
      let newCartItem = action.item;
      let updatedCartItem = {
        ...newCartItem,
        itemTotalPrice: newCartItem.price * newCartItem.quantity,
      };
      allCartProducts.push(updatedCartItem);
      return { ...state, cartProducts: allCartProducts };
    }
  }
  if (action.type === "DECREASE_CART") {
    const itemIndex = state.cartProducts.findIndex(
      (cartItem) => cartItem.id === action.id
    );
    console.log(state.cartProducts);
    console.log(action.id);
    console.log(itemIndex);

    let allCartProducts = [...state.cartProducts];
    const selectedCartItem = allCartProducts[itemIndex];

    if (selectedCartItem.quantity > 1) {
      const updatedCartItem = {
        ...selectedCartItem,
        quantity: selectedCartItem.quantity - 1,
        itemTotalPrice:
          selectedCartItem.price * (selectedCartItem.quantity - 1),
      };
      allCartProducts[itemIndex] = updatedCartItem;
      return { ...state, cartProducts: allCartProducts };
    } else {
      return state;
    }
  }
  if (action.type === "COMPLETE_REMOVE") {
    const cartItemIndex = state.cartProducts.findIndex(
      (cartItem) => cartItem.id === action.id
    );
    let allCartProducts = [...state.cartProducts];

    const selectedItem = allCartProducts[cartItemIndex];

    // const updatedProducts = allCartProducts.slice(cartItemIndex, 1);

    const updatedProducts = allCartProducts.filter(
      (item) => item.id !== selectedItem.id
    );

    return { ...state, cartProducts: updatedProducts };
  }

  if (action.type === "REMOVE_ALL_CART") {
    return { ...state, cartProducts: [] };
  }

  return state;
}

function CartContextProvider({ children }) {
  const [cart, setCartDispatch] = useReducer(reducerFunc, { cartProducts: [] });
  const [active, setActive] = useState();

  function addCartFromDisplayBlock(item) {
    setCartDispatch({ type: "ADD_TO_CART_FROM_DISPLAY", item: item });
  }

  function addToCart(item) {
    setCartDispatch({ type: "ADD_TO_CART", item: item });
  }
  function handleProAddFromDetails(item) {
    setCartDispatch({ type: "HANDLE_ADD_FROM_DETAILS", item: item });
  }

  function completeRemoveCart(id) {
    setCartDispatch({ type: "COMPLETE_REMOVE", id: id });
  }

  function decreaseCart(id) {
    setCartDispatch({ type: "DECREASE_CART", id: id });
  }

  function removeAllFromCart() {
    setCartDispatch({ type: "REMOVE_ALL_CART" });
  }

  const totalPrice = cart.cartProducts.reduce((acc, proEl) => {
    const price = proEl.itemTotalPrice;
    return (acc = acc + price);
  }, 0);

  const cartItemCount = cart.cartProducts.length;

  const cartContextValue = {
    cartProduct: cart.cartProducts,
    addCartFromDisplayBlock,
    addToCart,
    completeRemoveCart,
    removeAllFromCart,
    decreaseCart,
    handleProAddFromDetails,
    active,
    setActive,
    totalPrice,
    cartItemCount,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;
