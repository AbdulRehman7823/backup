import { id } from "date-fns/locale";
import GenericService from "./GenericService";
class ReaderServices extends GenericService {
  constructor() {
    super();
  }

  getPoets = () => this.get("admin/poets");
  getPoetries = () => this.get("admin/poetries");
  requestPoet = (_id, data) =>
    this.post("reader/request/poet/" + _id, data);
    
    buySubscription = (data) => this.post("checkout/create-checkout", data);
  
    checkout = (data) => this.post("checkout/create-checkout", data);
    validateRequest = (id, data) =>
      this.post("/patient/checkdoctor/availability/" + id, data);
}
let readerServices = new ReaderServices();
export default readerServices;
