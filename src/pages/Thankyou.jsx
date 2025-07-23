import { useContext, useEffect } from "react";
import InnerPageBanner from "../components/innerPageBanner/InnerPageBanner";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

function Thankyou() {
  const { isLoggedIn, setIsLoggedIn, activeUser } = useContext(AuthContext);
  const { removeAllFromCart } = useContext(CartContext);
  useEffect(() => {
    removeAllFromCart();
  }, []);
  return (
    <>
      <InnerPageBanner>Thank you</InnerPageBanner>
      <section className="py-100">
        <div className="section-heading">
          <div className="container">
            <h2 className="mb-3 text-capitalize">
              Hi {activeUser?.name}, thank you for your order!
            </h2>
            <p>
              Your order has been successfully placed. You can expect delivery
              within 4 to 5 business days.
            </p>
            <p></p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Thankyou;
