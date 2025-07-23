import { useContext, useState } from "react";
import InnerPageBanner from "../components/innerPageBanner/InnerPageBanner";
import { FormContext } from "../context/FormContext";
import "./Checkout.css";

const usaStates = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

const cardTypes = ["Visa", "MasterCard", "Amex", "Discover"];

function Checkout() {
  const { setFormData } = useContext(FormContext);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
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
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = "First name required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name required";
    if (!/^[0-9]{10}$/.test(form.phone)) newErrors.phone = "Invalid phone";
    if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email";
    if (!form.state) newErrors.state = "State required";
    if (!form.city.trim()) newErrors.city = "City required";
    if (!form.postalCode.trim()) newErrors.postalCode = "Postal code required";
    if (!form.address.trim()) newErrors.address = "Address required";
    if (!form.cardType) newErrors.cardType = "Card type required";
    if (!/^[0-9]{16}$/.test(form.cardNumber))
      newErrors.cardNumber = "Invalid card number";
    if (!form.expiryMonth) newErrors.expiryMonth = "Expiry month required";
    if (!form.expiryYear) newErrors.expiryYear = "Expiry year required";
    if (!/^[0-9]{3,4}$/.test(form.cvv)) newErrors.cvv = "Invalid CVV";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  function handleSubmit(e) {
    e.preventDefault();
    if (validate()) {
      setFormData(form);
      alert("Form submitted successfully!");
    } else {
      alert("Error!");
    }
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
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 ">
                      <div className="form-group my-2">
                        <label className="mb-2" htmlFor="phoneNumber">
                          Phone Number <span className="text-red">*</span>
                        </label>
                        <input
                          className="input-small form-control"
                          type="text"
                          placeholder="Phone Number"
                          name="phoneNumber"
                          id="phoneNumber"
                          value={form.phone}
                          onChange={handleChange}
                          required
                        />
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
                          required
                        />
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
                          required
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
                          required
                        >
                          <option value="">-- Select State --</option>
                          {usaStates.map((state) => (
                            <option key={state} value={state}>
                              {state}
                            </option>
                          ))}
                        </select>
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
                          required
                        />
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
                          required
                        />
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
                          required
                        />
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
                          required
                        >
                          {cardTypes.map((card) => (
                            <option key={card} value={card}>
                              {card}
                            </option>
                          ))}
                        </select>
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
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4 ">
                      <div className="form-group my-2">
                        <label className="mb-2" htmlFor="expiryMonth">
                          Expiry Month <span className="text-red">*</span>
                        </label>
                        <select
                          name="expiryMonth"
                          id="expiryMonth"
                          className="input-small form-control form-select"
                          value={form.expiryMonth}
                          onChange={handleChange}
                          required
                        >
                          <option></option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-4 ">
                      <div className="form-group my-2">
                        <label className="mb-2" htmlFor="expiryYear">
                          Expiry Year <span className="text-red">*</span>
                        </label>
                        <select
                          name="expiryYear"
                          value={form.expiryYear}
                          id="expiryYear"
                          className="input-small form-control form-select"
                          onChange={handleChange}
                          required
                        >
                          <option></option>
                        </select>
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
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 my-3 form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="exampleCheck1"
                      >
                        I am at least 18 years of age and agree to the Terms and
                        Conditions and Privacy Policy. By clicking the Place
                        Order button and submitting this order, you agree that
                        your card will be charged $ (Free Shipping sent via
                        United States Postal Service First Class Mail). If this
                        product is not right for you, or you have any questions,
                        contact customer service with any questions by calling
                        8442776483 or e-mailing Standard shipping orders will be
                        processed and shipped with USPS within about 2 business
                        day.
                      </label>
                    </div>
                  </div>
                  <button className="main-button">Place Order</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Checkout;
