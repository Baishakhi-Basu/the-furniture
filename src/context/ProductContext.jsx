import { createContext, useEffect, useReducer, useState } from "react";
import { cat_list, assets } from "../assets/assets";
import productsData from "../data/available-products.json";

export const ProductContext = createContext();

function reducerFun(state, action) {
  if (action.type === "LOAD_PRODUCT") {
    const product = action.value;
    const updatedProducts = product.map((proEl) => ({ ...proEl, quantity: 1 }));
    // console.log(updatedProducts);
    return { ...state, product: updatedProducts };
  }

  if (action.type === "INCREASE_QTY") {
    let productId = state.product.findIndex(
      (element) => element.id === action.id
    );

    const allProducts = [...state.product];

    let selectedProduct = allProducts[productId];

    let updatedProduct = {
      ...selectedProduct,
      quantity: selectedProduct.quantity + 1,
      // totalPrice: (selectedProduct.quantity + 1) * selectedProduct.price,
    };

    allProducts[productId] = updatedProduct;

    // console.log(allProducts[productId]);

    return { ...state, product: allProducts };
  }

  if (action.type === "DECREASE_QTY") {
    let productId = state.product.findIndex(
      (element) => element.id === action.id
    );

    const allProducts = [...state.product];

    let selectedProduct = allProducts[productId];

    let updatedProduct;

    if (selectedProduct.quantity > 1) {
      updatedProduct = {
        ...selectedProduct,
        quantity: selectedProduct.quantity - 1,
        // totalPrice: (selectedProduct.quantity - 1) * selectedProduct.price,
      };
      allProducts[productId] = updatedProduct;
      return { ...state, product: allProducts };
    } else {
      return state;
    }

    // console.log(allProducts[productId]);
  }
  if (action.type === "REMOVE_QTY") {
    let productId = state.product.findIndex(
      (element) => element.id === action.id
    );
    const allProducts = [...state.product];

    let selectedProduct = allProducts[productId];

    const updateSelectedProduct = {
      ...selectedProduct,
      quantity: 1,
      price: selectedProduct.price * 1,
    };

    allProducts[productId] = updateSelectedProduct;

    return { ...state, product: allProducts };
  }
  return state;
}

function ProducContextProvider({ children }) {
  const [products, setProDispatch] = useReducer(reducerFun, { product: [] });
  // const [products, setProducts] = useState([]);

  useEffect(() => {
    setProDispatch({ type: "LOAD_PRODUCT", value: productsData });
  }, []);

  const categoryCount = products.product.reduce((acc, product) => {
    const category = product.category;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const priceRanges = [
    { label: "All", min: 0, max: Infinity },
    { label: "Under $50", min: 0, max: 50 },
    { label: "$51 - $100", min: 51, max: 100 },
    { label: "$101 - $150", min: 101, max: 150 },
    { label: "$151 - $200", min: 151, max: 200 },
    { label: "$201 - $250", min: 201, max: 250 },
    { label: "Above $250", min: 251, max: Infinity },
  ];

  function increaseQTY(id) {
    setProDispatch({ type: "INCREASE_QTY", id: id });
  }

  function decreaseQTY(id) {
    setProDispatch({ type: "DECREASE_QTY", id: id });
  }

  function removeQTY(id) {
    setProDispatch({ type: "REMOVE_QTY", id: id });
  }

  const prodContextValue = {
    products: products.product,
    cat_list,
    assets,
    increaseQTY,
    decreaseQTY,
    categoryCount,
    removeQTY,
    priceRanges,
  };

  return (
    <ProductContext.Provider value={prodContextValue}>
      {children}
    </ProductContext.Provider>
  );
}

export default ProducContextProvider;
