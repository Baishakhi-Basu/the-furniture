import Table from "react-bootstrap/Table";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { WishListContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import InnerPageBanner from "../components/innerPageBanner/InnerPageBanner";
import "./WishListPage.css";

function WishListPage() {
  const { wishList, removeFromWishList } = useContext(WishListContext);
  const { cartProduct, handleProAddFromDetails } = useContext(CartContext);

  const notifyCart = () =>
    toast("🛒 Product added to cart !", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  const notifyCart2 = () =>
    toast("This product already is in cart !", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  function handleAddtoCartFrmWishlist(wishItem) {
    const alreadyInCart = cartProduct.findIndex(
      (cartPro) => cartPro.id === wishItem.id
    );
    if (alreadyInCart === -1) {
      handleProAddFromDetails(wishItem);
      notifyCart();
    } else {
      notifyCart2();
    }
  }

  // console.log(wishList);
  return (
    <>
      <InnerPageBanner>Your Favourite Product</InnerPageBanner>
      <section className="py-100">
        <div className="container">
          {wishList.length > 0 ? (
            <>
              <div className="row">
                <div className="col-md-12">
                  <div className="shop-wish-block">
                    <Table>
                      <thead>
                        <tr>
                          <th></th>
                          <th>Product</th>
                          <th>Price</th>

                          <th></th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {wishList.map((wishItem) => {
                          return (
                            <tr key={wishItem.id}>
                              <td>
                                <img
                                  src={wishItem.image}
                                  alt={wishItem.name}
                                  className="wishItemImg"
                                />
                              </td>
                              <td>{wishItem.name}</td>
                              <td>${wishItem.price}</td>
                              <td>
                                <button
                                  className="Wish-add-cart-btn"
                                  onClick={() =>
                                    handleAddtoCartFrmWishlist(wishItem)
                                  }
                                >
                                  <i class="bi bi-basket"></i>
                                  <span>Add to cart</span>
                                </button>
                              </td>
                              <td>
                                <span
                                  className="cross"
                                  onClick={() =>
                                    removeFromWishList(wishItem.id)
                                  }
                                >
                                  X
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="wish-page-btn-block mt-4">
                    {/* <Link to="/cart" className="main-button">
                      Go to Cart
                    </Link> */}
                    <Link to="/product" className="main-button">
                      <i class="bi bi-bag-heart"></i> Shop More
                    </Link>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center">
              <div className="empty-cart-icon">
                <i class="bi bi-heartbreak"></i>
              </div>
              <h2 className="mb-4">
                Your Wish lis is Empty. Select Your Favourite Item.
              </h2>
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

export default WishListPage;
