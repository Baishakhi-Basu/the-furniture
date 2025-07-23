import { Outlet } from "react-router-dom";
import { ScrollRestoration, useLocation } from "react-router";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

function RootLayout() {
  const location = useLocation();
  const path = location.pathname;
  // const enableScrollOn = ["/:id", "/cart"];
  // const shouldRestoreScroll = enableScrollOn.some((path) =>
  //   location.pathname.startsWith(path)
  // );
  // const shouldRestoreScroll = !location.pathname.startsWith("/product");

  const isProductDetail = /^\/[^\/]+$/.test(path) && path !== "/cart"; // Matches /something but not /cart
  const isCartPage = path === "/cart";

  const shouldRestoreScroll = isProductDetail || isCartPage;
  return (
    <>
      <Header />

      <main>
        <Outlet />
        {shouldRestoreScroll && <ScrollRestoration />}
      </main>
      <Footer />
    </>
  );
}

export default RootLayout;
