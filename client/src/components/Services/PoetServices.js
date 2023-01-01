import GenericService from "./GenericService";
class PoetServices extends GenericService {
  constructor() {
    super();
  }

  getReaders = (_id) => this.get("poet/readers/" + _id);

  getSubscribers = (_id) => this.get("poet/acceptedReaders/" + _id);
  addPoetry = (data) => this.post("poetries/", data);
  getAllPoetries = (_id) => this.get("poet/poetries/" + _id);
  deletePoetry = (_id) => this.delete("poetries/" + _id);
  getPoet = (_id) => this.get("/poet/" + _id);
  updatePoet = (_id, data) => this.put("/poet/" + _id, data);
}
let poetServices = new PoetServices();
export default poetServices;
