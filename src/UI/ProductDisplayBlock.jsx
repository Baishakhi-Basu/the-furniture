import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { CartContext } from "../context/CartContext";
import { ProductContext } from "../context/ProductContext";
import { WishListContext } from "../context/WishlistContext";

function ProductDisplayBlock({ product, className }) {
  const {
    cartProduct,
    addToCart,
    handleProAddFromDetails,
    completeRemoveCart,
    active,
    setActive,
  } = useContext(CartContext);
  const { increaseQTY } = useContext(ProductContext);
  const { wishList, addWishlist, removeFromWishList } =
    useContext(WishListContext);
  const [clickedOnce, setClickedOnce] = useState(true);
  const [productId, setProductId] = useState();

  const notifyCart = () =>
    toast("🛒 Product added to cart !", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const notifyWish = () =>
    toast("💖 Product added to wishlist !", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const notifyRemoveCart = () =>
    toast("Product removed from cart !", { theme: "dark", autoClose: 3000 });

  const notifyRemoveWish = () =>
    toast("Product removed from wishlist !", {
      theme: "dark",
      autoClose: 3000,
    });

  const AddclassName = className ? className : "";

  const alreadyAddedToWishlist = wishList.findIndex(
    (list) => list.id === product.id
  );

  const alreadyInCart = cartProduct.findIndex(
    (cartList) => cartList.id === product.id
  );

  function handleAddToWish() {
    addWishlist(product);
    notifyWish();
  }
  function handleRemoveWish() {
    removeFromWishList(product.id);
    notifyRemoveWish();
  }

  function handleAddToCart() {
    // setActive(product.id);
    handleProAddFromDetails(product);
    notifyCart();

    // console.log(active);
    // if (clickedOnce) {
    //   addToCart(product);
    //   setClickedOnce(false);
    // }

    // if (!clickedOnce) {
    //   setClickedOnce(true);
    // } else {
    //   increaseQTY(product.id);
    // }
    // if (product.quantity > 1) {
    //   increaseQTY(product.id);
    // }
  }
  function handleRemoveToCart() {
    completeRemoveCart(product.id);
    notifyRemoveCart();
  }
  return (
    <div className={`productBlock ${AddclassName}`}>
      <div className="product-block-inner">
        <div className="product-img-block">
          <div className="product-img">
            <Link to={`/${product.id}`}>
              <img src={`/${product.image}`} alt="" />
            </Link>
          </div>
          <div className="product-button">
            <ul>
              <li>
                <Link>
                  {alreadyInCart === -1 ? (
                    <span onClick={handleAddToCart}>
                      <i className="bi bi-basket"></i>
                    </span>
                  ) : (
                    <span onClick={handleRemoveToCart}>
                      <i class="bi bi-basket-fill text-fill-color"></i>
                    </span>
                  )}
                </Link>
              </li>
              <li>
                <Link to={`/${product.id}`}>
                  <span>
                    <i className="bi bi-eye"></i>
                  </span>
                </Link>
              </li>
              <li>
                <Link>
                  {alreadyAddedToWishlist === -1 ? (
                    <span onClick={handleAddToWish}>
                      <i className="bi bi-heart"></i>
                    </span>
                  ) : (
                    <span onClick={handleRemoveWish}>
                      <i class="bi bi-heart-fill text-fill-color"></i>
                    </span>
                  )}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="product-content">
          <h4>
            <Link to={`/${product.id}`}>{product.name}</Link>
          </h4>
          <p>${product.price}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDisplayBlock;
