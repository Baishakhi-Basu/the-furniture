import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";

import { ClipLoader } from "react-spinners";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "animate.css";

import { ToastContainer } from "react-toastify";

import Home from "./pages/Home";
import Product from "./pages/Product";
import Checkout from "./pages/Checkout";
import Cart from "./pages/Cart";
import RootLayout from "./pages/RootLayout";
import ProducContextProvider from "./context/ProductContext";
import LatestContextProvider from "./context/LatestNewsContext";
import ProductDetails from "./pages/ProductDetails";
import { CartContext } from "./context/CartContext";
import CartContextProvider from "./context/CartContext";
import Contact from "./pages/Contact";
import DisplayPoductPerCategory from "./components/displayProductPerCategory/DisplayPoductPerCategory";
import FormContextProvider from "./context/FormContext";
import LatestNewsPage from "./pages/LatestNewsPage";
import Thankyou from "./pages/Thankyou";
import TermsAndCondition from "./pages/TermsAndCondition";
import Privacy from "./pages/Privacy";
import WishListPage from "./pages/WishListPage";
import WishlistContextProvider from "./context/WishlistContext";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AuthContextProvider from "./context/AuthContext";

function ProductRedirect() {
  return <Navigate to="/product/table" replace />;
}
function App() {
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setAppLoading(false), 1500);
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <SignUp /> },
        { path: "/product", element: <ProductRedirect /> },
        // { path: "/product/:id", element: <ProductDetails /> },
        { path: "/:id", element: <ProductDetails /> },
        { path: "/product/:category", element: <DisplayPoductPerCategory /> },
        { path: "/cart", element: <Cart /> },
        { path: "/checkout", element: <Checkout /> },
        { path: "/latestNews/:id", element: <LatestNewsPage /> },
        { path: "/contact", element: <Contact /> },
        { path: "/thankyou", element: <Thankyou /> },
        { path: "/terms", element: <TermsAndCondition /> },
        { path: "/privacy", element: <Privacy /> },
        { path: "/shopWishList", element: <WishListPage /> },
      ],
    },
  ]);

  if (appLoading) {
    return (
      <div className="loader-container">
        <ClipLoader size={60} color="#ba4b40" />
      </div>
    );
  }
  return (
    <AuthContextProvider>
      <ProducContextProvider>
        <CartContextProvider>
          <WishlistContextProvider>
            <LatestContextProvider>
              <FormContextProvider>
                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick={false}
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
                <RouterProvider router={router} />
              </FormContextProvider>
            </LatestContextProvider>
          </WishlistContextProvider>
        </CartContextProvider>
      </ProducContextProvider>
    </AuthContextProvider>
  );
}

export default App;
