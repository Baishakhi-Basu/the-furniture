import { useContext } from "react";
import "./Footer.css";
import { ProductContext } from "../../context/ProductContext";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";

function Footer() {
  const { cat_list } = useContext(ProductContext);
  return (
    <div className="footer ">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="footer-logo-block">
              <div className="footer-logo">
                <h2 className="">
                  <Link to="/">
                    <img src={assets["logo_footer"]} alt="" className="logo" />
                  </Link>
                </h2>
              </div>
              <div>
                <p>
                  Our handpicked products may offer easy setup and a perfect fit
                  for your home’s aesthetic.
                </p>
              </div>

              <div className="social-link">
                <ul>
                  <li>
                    <h5>Instagram</h5>
                  </li>
                  <li>
                    <h5>Facebook</h5>
                  </li>
                </ul>
              </div>
              <div className="mt-3 copyText">
                <p>© The Furniture. All Rights Reserved.</p>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-4">
                <div className="footer-link-block">
                  <div className="link-block-header">
                    <h4>Useful Links</h4>
                  </div>
                  <div className="footer-link-content">
                    <ul>
                      <li>
                        <Link to="/">Home</Link>
                      </li>
                      <li>
                        <Link to="/product">Products</Link>
                      </li>
                      <li>
                        <Link to="/cart">Cart</Link>
                      </li>
                      <li>
                        <Link to="/terms">Terms & Conditions</Link>
                      </li>
                      <li>
                        <Link to="/privacy">Privacy</Link>
                      </li>
                      <li>
                        <Link to="/contact">Contact</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="footer-link-block">
                  <div className="link-block-header">
                    <h4>Products</h4>
                  </div>
                  <div className="footer-link-content">
                    <ul>
                      {cat_list.slice(0, 6).map((catItem, index) => (
                        <li key={index}>
                          <Link to={`/product/${catItem.cat_name}`}>
                            {catItem.cat_name}
                          </Link>
                        </li>
                      ))}
                      {/* <li>Table</li>
                      <li>Produccts</li>
                      <li>Terms & Conditions</li>
                      <li>Privacy</li>
                      <li>Contact</li> */}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="footer-link-block">
                  <div className="link-block-header">
                    <h4>Contact Us</h4>
                  </div>
                  <div className="footer-link-content">
                    <ul>
                      <li>
                        2593 Timbercrest Road, Chisana, Alaska Badalas United
                        State
                      </li>
                      <li>(+91)7-723-4608</li>
                      <li>example@domain.com</li>
                      <li>Mon – Fri: 8 am – 8 pm</li>
                      <li>Sat – Sun: 8 am – 7 pm</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
