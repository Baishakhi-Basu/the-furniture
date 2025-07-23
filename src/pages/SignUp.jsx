import "./Login.css";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function SignUp() {
  const navigate = useNavigate();
  const userData = {
    name: "",
    email: "",
    pswd: "",
  };

  const [data, setData] = useState(userData);
  const [errors, setErrors] = useState({});

  function handleInputChange(event) {
    const userInputName = event.target.name;
    const userInputValue = event.target.value;
    console.log(userInputName);

    setData((prevData) => ({ ...prevData, [userInputName]: userInputValue }));
  }

  function validate() {
    const newErrors = {};
    if (!data.name.trim()) newErrors.name = "Name required";
    if (!/\S+@\S+\.\S+/.test(data.email)) newErrors.email = "Invalid email";
    if (!data.pswd.trim()) {
      newErrors.pswd = "Password required";
    } else if (data.pswd.trim().length < 4) {
      newErrors.pswd = "Password must be at least 4 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!validate()) return;
    const getData = JSON.parse(localStorage.getItem("user") || "[]");

    let arr = [];
    arr = [...getData];
    arr.push(data);

    localStorage.setItem("user", JSON.stringify(arr));

    navigate("/login");

    // localStorage.removeItem("user");
  }

  // console.log(data);

  return (
    <section className="loginBlock">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="loginFormBlock">
              <h2 className="section-title">Signup</h2>
              <div className="logInForm">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3 mt-3">
                    <label htmlFor="name" className="form-label">
                      Name:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Enter name"
                      name="name"
                      onChange={handleInputChange}
                    />
                    {errors.name && (
                      <div style={{ color: "red" }}>{errors.name}</div>
                    )}
                  </div>
                  <div className="mb-3 mt-3">
                    <label htmlFor="email" className="form-label">
                      Email :
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter email"
                      name="email"
                      onChange={handleInputChange}
                    />
                    {errors.email && (
                      <div style={{ color: "red" }}>{errors.email}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="pwd" className="form-label">
                      Password :
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="pwd"
                      placeholder="Enter password"
                      name="pswd"
                      onChange={handleInputChange}
                      minLength={3}
                    />
                    {errors.pswd && (
                      <div style={{ color: "red" }}>{errors.pswd}</div>
                    )}
                  </div>

                  <button type="submit" className="main-button">
                    Sign up
                  </button>
                  <p className="mt-4">
                    Already have an account ?
                    <Link to="/login" className="link ps-1">
                      Login
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="loginImageBlock">
              <img src={assets.security} alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
