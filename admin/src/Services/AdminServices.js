import GenericService from "./GenericService";
import jwtDecode from "jwt-decode";
class AdminServices extends GenericService {
  constructor() {
    super();
  }
  getPoets = () => this.get("poets");

  getReaders = () => this.get("readers");
  getPoetries = () => this.get("poetries");

  deleteUser = (_id) => this.delete("user/" + _id);
  deletePoetry = (_id) => this.delete("poetries/" + _id);

  login = (data) =>
    new Promise((resolve, reject) => {
      this.post("login/", data)
        .then((token) => {
          console.log(token);
          localStorage.setItem("accessToken", token.accessToken);
          resolve(token);
        })
        .catch((err) => {
          console.log(err.message);
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
let adminServices = new AdminServices();
export default adminServices;
