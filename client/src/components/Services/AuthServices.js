import GenericService from "./GenericService";
import jwtDecode from "jwt-decode";
class AuthServices extends GenericService {
  constructor() {
    super();
  }

  registerUser = (data) => this.post("auth/register/", data);
  login = (data) =>
    new Promise((resolve, reject) => {
      this.post("auth/login/", data)
        .then((token) => {
          console.log(token.accessToken);
          localStorage.setItem("accessToken", token.accessToken);
          resolve(jwtDecode(token.accessToken));
        })
        .catch((err) => {
          reject(err);
        });
    });

  logout = () => {
    localStorage.removeItem("accessToken");
  };
  isLoggedIn = () => {
    return localStorage.getItem("accessToken") ? true : false;
  };
  getLoggedInUser = () => {
    try {
      const jwt = localStorage.getItem("accessToken");
      if (jwt != null) return jwtDecode(jwt);
    } catch (ex) {
      return null;
    }
  };
}
let authServices = new AuthServices();
export default authServices;
