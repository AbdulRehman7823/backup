import alert from "./Services/Alert";

export const uploadImage = (img, cb) => {
  if (img != null) {
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", "ardoctor");
    data.append("cloud_name", "dcqgorede");
    alert.showinfoAlert("Please wait, image is uploading");
    return fetch("https://api.cloudinary.com/v1_1/dcqgorede/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        alert.showSuccessAlert("Your Image Uploaded Successfully");
        cb(data.url, true);
      })
      .catch((err) => {
        console.log(err);
        alert.showErrorAlert(
          "Error occured while uploading your image\nTry again"
        );

        cb("", false);
      });
  }
};
