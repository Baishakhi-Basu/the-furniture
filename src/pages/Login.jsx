import { useContext, useState } from "react";
import "./Login.css";
import { assets } from "../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const prevPage = location.state?.from;
  const beforePrevPage = location.state?.beforeFro;

  let redirectPage = "/";

  if (prevPage && prevPage !== "/login" && prevPage !== "/signup") {
    redirectPage = prevPage;
  } else if (
    beforePrevPage &&
    beforePrevPage !== "/login" &&
    beforePrevPage !== "/signup"
  ) {
    redirectPage = beforePrevPage;
  }

  const userData = {
    email: "",
    pswd: "",
  };
  const [userInput, setUserInput] = useState(userData);
  const [errMsg, setErrMsg] = useState("");
  const [empMsg, setEmpMsg] = useState("");

  function handleChange(event) {
    const userInputKey = event.target.name;
    const userInputValue = event.target.value;
    setUserInput((prevData) => ({
      ...prevData,
      [userInputKey]: userInputValue,
    }));
  }
  function handleSubmit(event) {
    event.preventDefault();

    if (userInput.email.trim() === "" || userInput.pswd.trim() === "") {
      setEmpMsg("Please enter your email and password!");
      return;
    }

    let getData = JSON.parse(localStorage.getItem("user"));
    //console.log(getData);
    if (!getData) {
      setEmpMsg("Please create your account first!");
      navigate("/signup");
      return;
    }
    getData.map((curEl) => {
      setEmpMsg("");
      if (curEl.email === userInput.email && curEl.pswd === userInput.pswd) {
        // const activeUserInfo = JSON.parse(localStorage.getItem("activeUser"));
        // console.log(activeUserInfo === true);
        // if (activeUserInfo) {
        //   setErrMsg(
        //     "You're currently logged into an account. To switch to a different account, please log out first and then log in with the new credentials."
        //   );
        //   return;
        // }
        localStorage.setItem("activeUser", JSON.stringify(curEl));
        // alert("login successfully.");
        setIsLoggedIn(true);
        setErrMsg("");
        navigate(redirectPage, { replace: true });
      } else {
        setErrMsg("Invalid email or password!");
      }
    });
  }

  return (
    <section className="loginBlock">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="loginFormBlock">
              <h2 class="section-title">Login</h2>
              {errMsg && (
                <p style={{ color: "red", fontSize: "20px" }}>{errMsg}</p>
              )}
              {empMsg && (
                <p style={{ color: "red", fontSize: "20px" }}>{empMsg}</p>
              )}
              <div className="logInForm">
                <form onSubmit={handleSubmit}>
                  {/* <div className="mb-3 mt-3">
                  <label for="name" className="form-label">
                    Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter name"
                    name="name"
                  />
                </div> */}
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
                      onChange={handleChange}
                    />
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
                      onChange={handleChange}
                    />
                  </div>

                  <button type="submit" className="main-button">
                    Login
                  </button>
                  <p className="mt-4">
                    Don't have account?{" "}
                    <Link to="/signup" className="link">
                      Sign up
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

export default Login;
