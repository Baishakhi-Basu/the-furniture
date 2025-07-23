import Table from "react-bootstrap/Table";
import InnerPageBanner from "../components/innerPageBanner/InnerPageBanner";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import "./Cart.css";
import { Link, useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";

function Cart() {
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const { cartProduct, completeRemoveCart, addToCart, decreaseCart } =
    useContext(CartContext);

  const navigate = useNavigate();
  const { increaseQTY, decreaseQTY, removeQTY } = useContext(ProductContext);

  const totalPrice = cartProduct.reduce((acc, proEl) => {
    const price = proEl.itemTotalPrice;
    return (acc = acc + price);
  }, 0);

  console.log(totalPrice);

  function handleAddToCart(cartItem) {
    addToCart(cartItem);
    increaseQTY(cartItem.id);
  }
  function handleDecreaseCart(id) {
    decreaseCart(id);
    decreaseQTY(id);
  }

  function handleCompleteRemove(id) {
    completeRemoveCart(id);
    removeQTY(id);
  }

  function handleProceedCheckout() {
    let userData = JSON.parse(localStorage.getItem("activeUser"));
    if (userData !== null) {
      navigate("/checkout");
    } else {
      setShowLoginMessage(true);
    }
  }

  console.log(cartProduct);
  return (
    <>
      <InnerPageBanner>Shopping Cart</InnerPageBanner>
      <section className="cart-block py-100">
        <div className="container">
          {cartProduct.length > 0 ? (
            <>
              <div className="row">
                <div className="col-md-12">
                  <div className="cart-table-block">
                    <Table responsive="sm">
                      <thead>
                        <tr>
                          <th>Image</th>
                          <th>Product</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Subtotal</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartProduct.map((cartItem) => (
                          <tr key={cartItem.id}>
                            <td>
                              <img
                                src={cartItem.image}
                                alt=""
                                className="cartItemImg"
                              />
                            </td>
                            <td>
                              <Link
                                to={`/${cartItem.id}`}
                                className="cart-item-name"
                              >
                                {cartItem.name}
                              </Link>
                            </td>
                            <td>${cartItem.price}</td>
                            <td>
                              <div className="qty-block">
                                <span
                                  className="qty-cart "
                                  onClick={() =>
                                    handleDecreaseCart(cartItem.id)
                                  }
                                >
                                  -
                                </span>
                                <span className="qty-num">
                                  {cartItem.quantity}
                                </span>
                                <span
                                  className="qty-cart"
                                  onClick={() => handleAddToCart(cartItem)}
                                >
                                  +
                                </span>
                              </div>
                            </td>
                            <td>${cartItem.itemTotalPrice}</td>

                            <td
                              onClick={() => handleCompleteRemove(cartItem.id)}
                              className="remove-btn"
                            >
                              X
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="cart-btn-shop-block">
                    <Link to="/" className="main-button">
                      <span>
                        <i class="bi bi-bag-heart"></i>
                      </span>
                      Shop More
                    </Link>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="cartSummaryBlock">
                    <div className="cartSummaryHead">
                      <h4>Cart Totals</h4>
                    </div>
                    <div className="cartSummaryContent">
                      <p className="cart-text">
                        <b>Subtotal</b> <span>${totalPrice}</span>
                      </p>
                      <p className="cart-text">
                        <b>Shipping </b>
                        <span>
                          {totalPrice > 200 ? "Free Shipping" : `$10`}
                        </span>
                      </p>
                      <p className="cart-text">
                        <b> </b>
                        <span className="offer-txt">
                          Free Shipping over $200
                        </span>
                      </p>
                      {/* <p className="small-txt">Free Shipping over $200</p> */}
                      <p className="cart-text">
                        <b>Total </b>{" "}
                        <span>
                          ${totalPrice > 200 ? totalPrice : totalPrice + 10}
                        </span>
                      </p>
                    </div>
                    <div class="d-grid">
                      <button
                        className="w-full main-button checkout-btn"
                        onClick={handleProceedCheckout}
                      >
                        Proceed To Checkout{" "}
                        <span>
                          <i class="bi bi-arrow-right"></i>
                        </span>
                      </button>
                    </div>
                    {showLoginMessage && (
                      <p className="showLoginMsg">
                        Please log in to proceed to checkout.{" "}
                        <Link to="/login" className="showLoginLink">
                          Login
                        </Link>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center">
              <div className="empty-cart-icon">
                <i class="bi bi-cart-x"></i>
              </div>
              <h2 className="mb-4">Your cart is currently empty. </h2>
              <Link to="/" className="main-button">
                <span>
                  <i class="bi bi-arrow-left"></i>
                </span>
                Return to shop
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Cart;
