import alert from "./Services/Alert";

const convertImageToBase64 = (img, cb) => {
  let reader = new FileReader();
  reader.readAsDataURL(img);
  reader.onload = function () {
    cb(reader.result, true);
  };
  reader.onerror = function (error) {
    alert.showErrorAlert("Error occured while parsing your image\nTry again");
    cb(reader.result, false);
  };
};

export default convertImageToBase64;
