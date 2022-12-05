import React from "react";
import { useNavigate } from "react-router-dom";
import adminServices from "../Services/AdminServices";
import alert from "../Services/Alert";
const SignIn = () => {
  let navigate = useNavigate();
  const [data, setData] = React.useState({
    username: "",
    password: "",
  });
  function handleData(key, value) {
    setData({ ...data, [key]: value });
  }
  function login() {
    adminServices
      .login(data)
      .then((data) => {
        debugger;
        if (adminServices.isLoggedIn()) {
          alert.showSuccessAlert("you are logged in successfully!");
          navigate("/dashboard");
          window.location.reload(false);
        } else {
          alert.showErrorAlert(data.message);
        }
      })
      .catch((err) => alert.showErrorAlert(err.response.data.message));
  }
  return (
    <section className="login-form shadow-lg">
      <div className="container">
        <div className="row from-row">
          <div className="col-lg-5 form-brand">
            <h1>Poet Prime</h1>
            <h3>Poetry is nearer to vital truth than history</h3>
          </div>
          <div className="col-lg-7 px-5">
            <h2 className="mt-3">Login</h2>

            <form onSubmit={(e) => e.preventDefault()}>
              <div class="mb-3 col-lg-9">
                <label for="exampleInputEmail1" class="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e) => handleData("username", e.target.value)}
                  required
                />
                <div className="invalid-feedback">username is required</div>
                <div id="emailHelp" class="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div class="mb-3 col-lg-9">
                <label for="exampleInputPassword1" class="form-label">
                  Password
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  onChange={(e) => handleData("password", e.target.value)}
                  required
                />
                <div className="invalid-feedback">password is required</div>
              </div>
              <button
                type="submit"
                class="btn btn-primary signIn-btn mb-5"
                onClick={() => {
                  login();
                }}
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
