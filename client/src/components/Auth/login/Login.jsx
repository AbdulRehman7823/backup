import React from "react";
import "./style.css";
import { FcGoogle } from "react-icons/fc";
import { GoMarkGithub } from "react-icons/go";
import { FaKickstarter } from "react-icons/fa";
import authServices from "../../Services/AuthServices";
import { Link, useNavigate } from "react-router-dom";
import alert from "../../Services/Alert";
import ScaleLoader from "react-spinners/ScaleLoader";

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const [isValidPassword, setIsValidPassword] = React.useState(false);
  const [isValidEmail, setIsValidEmail] = React.useState(false);
  const [error, setError] = React.useState("");

  const [data, setData] = React.useState({
    email: "",
    password: "",
  });

  function handleData(key, value) {
    setData({ ...data, [key]: value });
  }

  const passwordValidation = (pass) => {
    if (pass.length < 8) {
      setIsValidPassword(true);
    } else {
      setIsValidPassword(false);
    }
  };

  const emailValidation = (email) => {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
  };

  const login = (e) => {
    e.preventDefault();

    if (
      data.email === "" ||
      data.password === "" ||
      isValidEmail === true ||
      isValidPassword === true
    ) {
      alert.showErrorAlert("All details are required!");
    } else {
      setLoading(true);
      authServices
        .login(data)
        .then((data) => {
          if (data.userType == "reader") {
            navigate("/");
          } else if (data.userType == "poet") {
            navigate("/app/seller/home");
          }
          setLoading(false);
          alert.showSuccessAlert("Successfully Logged in!");
          window.location.reload(false);
        })
        .catch((err) => {
          if (
            error.response &&
            error.response.status >= 400 &&
            error.response.status <= 500
          ) {
            setError(err.response.data.message);
            alert.showErrorAlert(err.response.data.message);
          }
          setLoading(false);
        });
    }
  };
  return (
    <div>
      {loading ? (
        <div
          style={{ textAlign: "center" }}
          className="main-bg flex justify-center w-full bg-gray-300 h-screen mx-auto py-32"
        >
         <ScaleLoader color="#2f50e6" />
        </div>
      ) : (
        <section className="main-bg flex justify-center  h-screen items-center">
          <div
            className="shadow-3xl rounded-xl py-16 bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/2 px-6 lg:px-16 xl:px-12
          flex items-center justify-center"
          >
            <div className="w-full h-100">
              <div className="inline-flex items-center mt-4">
                <FaKickstarter className="mr-4 text-3xl block text-blue-700" />
                <h1 className="text-xl text-skin-base font-bold">
                  Career Span
                </h1>
              </div>
              <h1 className="text-xl md:text-2xl font-bold leading-tight text-skin-base mt-6">
                Log in to your account
              </h1>

              <form className="mt-6">
                <div>
                  <label className="block text-skin-base">Email Address</label>
                  <input
                    type="email"
                    name=""
                    id=""
                    onChange={(e) => {
                      handleData("email", e.target.value);
                      emailValidation(e.target.value);
                    }}
                    placeholder="Enter Email Address"
                    className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                    autofocus
                    autocomplete
                    required
                  />
                  {isValidEmail ? (
                    <p className="text-red-800 text-sm">
                      Please enter correct email address
                    </p>
                  ) : (
                    <></>
                  )}
                </div>

                <div className="mt-4">
                  <label className="block text-skin-base">Password</label>
                  <input
                    type="password"
                    name=""
                    id=""
                    placeholder="Enter Password"
                    onChange={(e) => {
                      handleData("password", e.target.value);
                      passwordValidation(e.target.value);
                    }}
                    minlength="6"
                    className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                  focus:bg-white focus:outline-none"
                    required
                  />
                  {isValidPassword ? (
                    <p className="text-red-800 text-sm">
                      Password must be at least 8 digits
                    </p>
                  ) : (
                    <></>
                  )}
                </div>

                <div className="text-right mt-2">
                  <a className="text-sm font-semibold text-skin-base hover:text-blue-700 focus:text-blue-700">
                    Forgot Password?
                  </a>
                </div>
                {error && <div className="error_msg">{error}</div>}
                <button
                  className="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg
                px-4 py-3 mt-6"
                  onClick={login}
                >
                  Log In
                </button>
              </form>

              <hr className="my-6 border-gray-300 w-full" />

              <p className="mt-8">
                Need an account?
                <Link to="/register">
                  <a className="text-blue-500 hover:text-blue-700 font-semibold">
                    Create an account
                  </a>
                </Link>
              </p>

              <p className="text-sm text-gray-500 mt-4">
                &copy; 2022 CareerSpan - All Rights Reserved.
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default Login;
