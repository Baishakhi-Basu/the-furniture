import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

import "./Header.css";
import { WishListContext } from "../../context/WishlistContext";
import Search from "../search/Search";
import { assets } from "../../assets/assets";
import { AuthContext } from "../../context/AuthContext";

function Header() {
  const { cartItemCount, cartProduct, completeRemoveCart } =
    useContext(CartContext);
  const { wishList, wishListCount, removeFromWishList } =
    useContext(WishListContext);

  const { isLoggedIn, setIsLoggedIn, activeUser } = useContext(AuthContext);

  const [sidebarType, setSidebarType] = useState(null);

  const [showSearch, setShowSearch] = useState(null);

  const [userInput, setuserInput] = useState("");

  const [notFoundInput, setnotFound] = useState(false);

  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();

  const { pathname } = location;

  const splitLocation = pathname.split("/");

  // useEffect(() => {
  //   const user = localStorage.getItem("activeUser");
  //   setIsLoggedIn(user !== null);
  // }, []);

  function handleAuthClick() {
    if (isLoggedIn) {
      localStorage.removeItem("activeUser");
      setIsLoggedIn(false);
      navigate("/");
    } else {
      navigate("/login");
    }
  }

  function openSidebar(type) {
    setSidebarType(type);
  }

  function closeSidebar() {
    setSidebarType(null);
    setShowSearch(null);
    setnotFound(false);
    setuserInput("");
  }

  function goToPage(pageName) {
    if (pageName === "checkout") {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData && userData.length > 0) {
        navigate("/checkout");
        setSidebarType(null);
        return;
      } else {
        navigate("/login");
        setSidebarType(null);
        return;
      }
    }
    navigate(`/${pageName}`);
    setSidebarType(null);
  }

  function removeItem(id, type) {
    if (type === "cart") {
      completeRemoveCart(id);
    }
    if (type === "wishlist") {
      removeFromWishList(id);
    }
  }
  function handleSearchShow() {
    setShowSearch(true);
  }

  function renderItems(items, type) {
    if (items.length === 0) {
      return (
        <div className="no-product-block">
          <h4 className="text-center text-muted">
            No product added yet in {type === "cart" ? "cart" : "wishlist"}.
          </h4>
          <Link
            to="/product"
            className="main-button"
            onClick={() => setSidebarType(null)}
          >
            <i className="bi bi-bag-heart"></i> Continue Shopping
          </Link>
        </div>
      );
    }
    return items.map((item) => {
      console.log(item);
      return (
        <div className="list-pro-display-block">
          <ul>
            <li>
              <div className="list-pro-img">
                <img src={`/${item.image}`} alt="" />
              </div>
              <div className="list-pro-name">{item.name}</div>

              <div className="cross" onClick={() => removeItem(item.id, type)}>
                <span>X</span>
              </div>
            </li>
          </ul>
        </div>
      );
    });
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light px-3 border-bottom position-relative">
        <div className="container">
          <div className="navbar-brand fw-bold" href="#">
            <Link to="/">
              <img src={assets.logo} alt="" className="logo" />
            </Link>
          </div>

          <button
            className="btn d-lg-none"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileMenu"
          >
            <i className="bi bi-list fs-3"></i>
          </button>

          <div className="d-none d-lg-block center-menu ms-auto">
            <ul className="navbar-nav flex-row center-nav">
              <li className="nav-item px-2">
                {/* <NavLink
                  to="/"
                  // className="nav-link"
                  className={({ isActive }) =>
                    isActive ? "nav-link active-link" : "nav-link"
                  }
                >
                  Home
                </NavLink> */}
                <NavLink
                  to="/"
                  // className="nav-link"
                  className={
                    splitLocation[1] === ""
                      ? "nav-link active-link"
                      : "nav-link"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item px-2">
                <NavLink
                  to="/product/table"
                  className={
                    splitLocation[1] === "product"
                      ? "nav-link active-link"
                      : "nav-link"
                  }
                >
                  Shop
                </NavLink>
              </li>
              <li className="nav-item px-2">
                <NavLink
                  to="/cart"
                  className={
                    splitLocation[1] === "cart"
                      ? "nav-link active-link"
                      : "nav-link"
                  }
                >
                  Cart
                </NavLink>
              </li>
              <li className="nav-item px-2">
                <NavLink
                  to="/latestNews/1"
                  className={
                    splitLocation[1] === "latestNews"
                      ? "nav-link active-link"
                      : "nav-link"
                  }
                >
                  Latest News
                </NavLink>
              </li>
              <li className="nav-item px-2">
                <NavLink
                  to="/contact"
                  className={
                    splitLocation[1] === "contact"
                      ? "nav-link active-link"
                      : "nav-link"
                  }
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="d-flex align-items-center gap-4 ms-md-auto me-md-0 m-auto header-item-right">
            <a
              href="#"
              className="text-dark"
              // data-bs-toggle="offcanvas"
              // data-bs-target="#search"
              onClick={handleSearchShow}
            >
              <i className="bi bi-search fs-5"></i>
            </a>
            <a
              href="#"
              className="text-dark itemCountBlock"
              onClick={() => openSidebar("wishlist")}
              data-bs-toggle="offcanvas"
            >
              <i className="bi bi-heart"></i>
              {wishListCount ? (
                <span className="item-count">{wishListCount}</span>
              ) : (
                ""
              )}
            </a>
            <a
              href="#"
              className="text-dark itemCountBlock"
              onClick={() => openSidebar("cart")}
              data-bs-toggle="offcanvas"
            >
              <i className="bi bi-basket"></i>
              {cartItemCount ? (
                <span className="item-count">{cartItemCount}</span>
              ) : (
                ""
              )}
            </a>
            {/* <Link to="/login" href="#" className="text-dark">
              <i className="bi bi-person fs-5"></i>
            </Link> */}
            <button onClick={handleAuthClick} className="loginOutBtn">
              {isLoggedIn ? "Logout" : "Login"}
            </button>
            {activeUser !== null ? (
              <p className="welcomeTxt">Hi {activeUser.name}</p>
            ) : (
              ""
            )}
          </div>
        </div>
      </nav>
      <div className="offcanvas offcanvas-start" tabIndex="-1" id="mobileMenu">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Menu</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav">
            <li className="nav-item ">
              {/* <NavLink
                  to="/"
                  // className="nav-link"
                  className={({ isActive }) =>
                    isActive ? "nav-link active-link" : "nav-link"
                  }
                >
                  Home
                </NavLink> */}
              <NavLink
                to="/"
                // className="nav-link"
                className={
                  splitLocation[1] === "" ? "nav-link active-link" : "nav-link"
                }
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink
                to="/product"
                className={
                  splitLocation[1] === "product"
                    ? "nav-link active-link"
                    : "nav-link"
                }
              >
                Shop
              </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink
                to="/cart"
                className={
                  splitLocation[1] === "cart"
                    ? "nav-link active-link"
                    : "nav-link"
                }
              >
                Cart
              </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink
                to="/latestNews/1"
                className={
                  splitLocation[1] === "latestNews"
                    ? "nav-link active-link"
                    : "nav-link"
                }
              >
                Latest News
              </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink
                to="/contact"
                className={
                  splitLocation[1] === "contact"
                    ? "nav-link active-link"
                    : "nav-link"
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      <div
        className={`offcanvas offcanvas-top ${showSearch ? "show" : ""}`}
        tabIndex="-1"
        id="search"
        style={{
          // visibility: sidebarType ? "visible" : "hidden",
          height: "300px",
        }}
        // data-bs-backdrop={true}
      >
        <div className="offcanvas-header ">
          <h4 className="offcanvas-title "></h4>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            onClick={closeSidebar}
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="row justify-content-center">
            <div className="col-md-7">
              <div className="search-heading">
                <h3 className="text-center mb-4">What are you looking for?</h3>
              </div>
              <Search
                showSearch={showSearch}
                setShowSearch={setShowSearch}
                notFoundInput={notFoundInput}
                setnotFound={setnotFound}
                userInput={userInput}
                setuserInput={setuserInput}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className={`offcanvas offcanvas-end ${sidebarType ? "show" : ""}`}
        tabIndex="-1"
        style={{
          visibility: sidebarType ? "visible" : "hidden",
        }}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title sideBar-header text-center">
            {sidebarType === "cart" ? "Your Cart" : "Your Wishlist"}
          </h5>
          <button
            type="button"
            className="btn-close"
            onClick={closeSidebar}
          ></button>
        </div>
        <div className="offcanvas-body">
          {sidebarType === "cart"
            ? renderItems(cartProduct, "cart")
            : renderItems(wishList, "wishlist")}

          {sidebarType === "cart" && cartProduct.length > 0 && (
            <div className="mt-auto mb-4">
              <button
                className="main-button w-100 mb-2"
                onClick={() => goToPage("cart")}
              >
                Go to Cart
              </button>
              <button
                className="main-button main-button-bg-dark w-100"
                onClick={() => goToPage("checkout")}
              >
                Checkout
              </button>
            </div>
          )}
          {sidebarType === "wishlist" && wishList.length > 0 && (
            <div className="mt-auto mb-4">
              <button
                className="main-button w-100 mb-2"
                onClick={() => goToPage("shopWishList")}
              >
                Check your favourite
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
