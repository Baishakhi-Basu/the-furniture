import { useContext, useState } from "react";
import InnerPageBanner from "../components/innerPageBanner/InnerPageBanner";
import { FormContext } from "../context/FormContext";
import "./Checkout.css";
import { usaStates } from "../assets/assets";
import { cardTypes } from "../assets/assets";
import { CartContext } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Checkout() {
  const { setFormData } = useContext(FormContext);
  const { cartProduct, totalPrice } = useContext(CartContext);
  const { isLoggedIn, setIsLoggedIn, setShowLoginMessage, showLoginMessage } =
    useContext(AuthContext);
  console.log(isLoggedIn, showLoginMessage);
  console.log(cartProduct);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    country: "USA",
    state: "",
    city: "",
    postalCode: "",
    address: "",
    cardType: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    terms: false,
  });

  function handleChange(e) {
    // console.log(e.target);
    const { name, type, value, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    console.log(form.firstName);
  }

  const validate = () => {
    const newErrors = {};
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    if (!form.firstName.trim()) newErrors.firstName = "First name required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name required";
    if (!/^[0-9]{10}$/.test(form.phone)) newErrors.phone = "Invalid phone";
    if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email";
    if (!form.state) newErrors.state = "State required";
    if (!form.city.trim()) newErrors.city = "City required";
    if (!/^[0-9]{5}$/.test(form.postalCode))
      newErrors.postalCode = "Postal code required";
    if (!form.address.trim()) newErrors.address = "Address required";
    if (!form.cardType) newErrors.cardType = "Card type required";
    if (!/^[0-9]{16}$/.test(form.cardNumber))
      newErrors.cardNumber = "Invalid card number";
    if (!form.expiryMonth) {
      newErrors.expiryMonth = "Expiry month required";
    } else if (
      form.expiryYear &&
      parseInt(form.expiryYear) === currentYear &&
      parseInt(form.expiryMonth) < currentMonth
    ) {
      newErrors.expiryMonth = `If year is ${currentYear}, month must be ${currentMonth} or later`;
    }

    if (!form.expiryYear) {
      newErrors.expiryYear = "Expiry year required";
    } else if (parseInt(form.expiryYear) < currentYear) {
      newErrors.expiryYear = `Expiry year must be ${currentYear} or later`;
    }

    if (!/^[0-9]{3,4}$/.test(form.cvv)) newErrors.cvv = "Invalid CVV";

    if (!form.terms)
      newErrors.terms = "Please confirm and agree the terms and conditions!";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    let userData = JSON.parse(localStorage.getItem("activeUser"));
    if (userData == null) {
      setShowLoginMessage(true);
      return;
    }
    const formDataObj = new FormData();
    for (let key in form) {
      formDataObj.append(key, form[key]);
    }

    const plainObject = Object.fromEntries(formDataObj.entries());
    setFormData(plainObject);
    navigate("/thankyou");
  }

  return (
    <>
      <InnerPageBanner>Checkout</InnerPageBanner>
      <section className="checkoutBlock py-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <h2 className="section-title-small">Shipping Informations</h2>
              <div className="formBlock">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 ">
                      <div className="form-group my-2">
                        <label className="mb-2" htmlFor="firstName">
                          First name <span className="text-red">*</span>
                        </label>
                        <input
                          className="input-small form-control"
                          type="text"
                          placeholder="First Name"
                          name="firstName"
                          id="firstName"
                          value={form.firstName}
                          onChange={handleChange}
                        />
                        {errors.firstName && (
                          <div style={{ color: "red" }}>{errors.firstName}</div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6 ">
                      <div className="form-group my-2">
                        <label className="mb-2" htmlFor="lastName">
                          Last name <span className="text-red">*</span>
                        </label>
                        <input
                          className="input-small form-control"
                          type="text"
                          placeholder="Last Name"
                          name="lastName"
                          id="lastName"
                          value={form.lastName}
                          onChange={handleChange}
                        />
                        {errors.lastName && (
                          <div style={{ color: "red" }}>{errors.lastName}</div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 ">
                      <div className="form-group my-2">
                        <label className="mb-2" htmlFor="phone">
                          Phone Number <span className="text-red">*</span>
                        </label>
                        <input
                          className="input-small form-control"
                          type="text"
                          placeholder="Phone Number"
                          name="phone"
                          id="phone"
                          value={form.phone}
                          onChange={handleChange}
                        />
                        {errors.phone && (
                          <div style={{ color: "red" }}>{errors.phone}</div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6 ">
                      <div className="form-group my-2">
                        <label className="mb-2" htmlFor="email">
                          Email Address <span className="text-red">*</span>
                        </label>
                        <input
                          className="input-small form-control"
                          type="email"
                          placeholder="Email Addres"
                          name="email"
                          id="email"
                          value={form.email}
                          onChange={handleChange}
                        />
                        {errors.email && (
                          <div style={{ color: "red" }}>{errors.email}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 ">
                      <div className="form-group my-2">
                        <label className="mb-2" htmlFor="country">
                          Select Country <span className="text-red">*</span>
                        </label>
                        <select
                          name="country"
                          id="country"
                          className="input-small form-control form-select"
                          value={form.country}
                          onChange={handleChange}
                        >
                          <option value="USA">USA</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6 ">
                      <div className="form-group my-2">
                        <label className="mb-2" htmlFor="state">
                          Select State <span className="text-red">*</span>
                        </label>
                        <select
                          className="input-small form-control form-select"
                          id="state"
                          name="state"
                          value={form.state}
                          onChange={handleChange}
                        >
                          <option value="">-- Select State --</option>
                          {usaStates.map((state) => (
                            <option key={state} value={state}>
                              {state}
                            </option>
                          ))}
                        </select>
                        {errors.state && (
                          <div style={{ color: "red" }}>{errors.state}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 ">
                      <div className="form-group my-2">
                        <label className="mb-2" htmlFor="city">
                          City <span className="text-red">*</span>
                        </label>
                        <input
                          className="input-small form-control"
                          type="text"
                          placeholder="City"
                          name="city"
                          id="city"
                          value={form.city}
                          onChange={handleChange}
                        />
                        {errors.city && (
                          <div style={{ color: "red" }}>{errors.city}</div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6 ">
                      <div className="form-group my-2">
                        <label className="mb-2" htmlFor="postalCode">
                          Postcode / Zip Code{" "}
                          <span className="text-red">*</span>
                        </label>
                        <input
                          className="input-small form-control"
                          type="text"
                          placeholder="Zip Code"
                          name="postalCode"
                          id="postalCode"
                          value={form.postalCode}
                          onChange={handleChange}
                          maxLength={5}
                        />
                        {errors.postalCode && (
                          <div style={{ color: "red" }}>
                            {errors.postalCode}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 ">
                      <div className="form-group my-2">
                        <label className="mb-2" htmlFor="address">
                          Address <span className="text-red">*</span>
                        </label>
                        <input
                          className="input-small form-control"
                          type="text"
                          placeholder="Address"
                          name="address"
                          id="address"
                          value={form.address}
                          onChange={handleChange}
                        />
                        {errors.address && (
                          <div style={{ color: "red" }}>{errors.address}</div>
                        )}
                      </div>
                    </div>
                  </div>
                  <h2 className="section-title-small mt-4">Payment Details</h2>

                  <div className="row">
                    <div className="col-md-6 ">
                      <div className="form-group my-2">
                        <label className="mb-2" htmlFor="cardType">
                          Card Type <span className="text-red">*</span>
                        </label>
                        <select
                          name="cardType"
                          value={form.cardType}
                          id="cardType"
                          className="input-small form-control form-select"
                          onChange={handleChange}
                        >
                          <option value="">-- Select Card --</option>
                          {cardTypes.map((cardType) => (
                            <option key={cardType} value={cardType}>
                              {cardType}
                            </option>
                          ))}
                        </select>
                        {errors.cardType && (
                          <div style={{ color: "red" }}>{errors.cardType}</div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6 ">
                      <div className="form-group my-2">
                        <label className="mb-2" htmlFor="acardNumberddress">
                          Card Number <span className="text-red">*</span>
                        </label>
                        <input
                          className="input-small form-control"
                          type="text"
                          placeholder=" Card Number"
                          name="cardNumber"
                          id="cardNumber"
                          value={form.cardNumber}
                          onChange={handleChange}
                          maxLength={16}
                        />
                        {errors.cardNumber && (
                          <div style={{ color: "red" }}>
                            {errors.cardNumber}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4 ">
                      <div className="form-group my-2">
                        <label className="mb-2" htmlFor="expiryMonth">
                          Expiry Month <span className="text-red">*</span>
                        </label>
                        <input
                          type="text"
                          name="expiryMonth"
                          id="expiryMonth"
                          className="input-small form-control"
                          value={form.expiryMonth}
                          onChange={handleChange}
                          placeholder="06"
                        />
                        {/* <select
                          name="expiryMonth"
                          id="expiryMonth"
                          className="input-small form-control form-select"
                          value={form.expiryMonth}
                          onChange={handleChange}
                          
                        >
                          <option></option>
                        </select> */}
                        {errors.expiryMonth && (
                          <div style={{ color: "red" }}>
                            {errors.expiryMonth}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-4 ">
                      <div className="form-group my-2">
                        <label className="mb-2" htmlFor="expiryYear">
                          Expiry Year <span className="text-red">*</span>
                        </label>
                        <input
                          type="text"
                          name="expiryYear"
                          value={form.expiryYear}
                          id="expiryYear"
                          className="input-small form-control form-select"
                          onChange={handleChange}
                          placeholder="2025"
                        />
                        {/* <select
                          name="expiryYear"
                          value={form.expiryYear}
                          id="expiryYear"
                          className="input-small form-control form-select"
                          onChange={handleChange}
                          
                        >
                          <option></option>
                        </select> */}
                        {errors.expiryYear && (
                          <div style={{ color: "red" }}>
                            {errors.expiryYear}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-4 ">
                      <div className="form-group my-2">
                        <label className="mb-2" htmlFor="cvv">
                          CVV <span className="text-red">*</span>
                        </label>
                        <input
                          className="input-small form-control"
                          type="text"
                          placeholder=" CVV"
                          name="cvv"
                          id="cvv"
                          value={form.cvv}
                          onChange={handleChange}
                          maxLength={4}
                        />
                        {errors.cvv && (
                          <div style={{ color: "red" }}>{errors.cvv}</div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 my-3 form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
                        name="terms"
                        checked={form.terms}
                        onChange={handleChange}
                      />
                      {errors.terms && (
                        <div style={{ color: "red" }}>{errors.terms}</div>
                      )}
                      <label
                        className="form-check-label"
                        htmlFor="exampleCheck1"
                      >
                        I am at least 18 years of age and agree to the{" "}
                        <Link to="/terms">Terms and Conditions</Link> and{" "}
                        <Link to="/privacy">Privacy Policy</Link>. By clicking
                        the Place Order button and submitting this order, you
                        agree that your card will be charged ${totalPrice} +{" "}
                        {totalPrice > 200 ? "Free Shipping" : `$10`}(Free
                        Shipping over $200). If this product is not right for
                        you, or you have any questions, contact customer service
                        with any questions by calling 8442776483 or e-mailing
                        Standard shipping orders will be processed and shipped
                        with USPS within about 2 business day.
                      </label>
                    </div>
                  </div>
                  <button className="main-button" type="submit">
                    Place Order
                  </button>
                  {!isLoggedIn ? (
                    <span className="showLoginMsgInCheck ps-md-3 pt-3 pt-md-0">
                      Please log in before placing your order.{" "}
                      <Link to="/login" className="linkLogInText">
                        Login
                      </Link>
                    </span>
                  ) : (
                    ""
                  )}
                </form>
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <h2 className="section-title-small">Your Order</h2>
              <div className="orderBlock">
                <div className="orderBlock-inner">
                  <table className="table table-borderless">
                    <thead>
                      <tr>
                        <th>Product</th>

                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartProduct.map((product) => {
                        return (
                          <tr key={product.id}>
                            <td>
                              {product.name} X {product.quantity}
                            </td>

                            <td>${product.itemTotalPrice}</td>
                          </tr>
                        );
                      })}
                      <tr>
                        <td>
                          <b>Shipping Fees</b>
                        </td>

                        <td>{totalPrice > 200 ? "Free Shipping" : `$10`}</td>
                      </tr>
                      <tr>
                        <td>
                          <b>Total</b>
                        </td>

                        <td>
                          <b className="total-price">
                            {" "}
                            ${totalPrice > 200 ? totalPrice : totalPrice + 10}
                          </b>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Checkout;
