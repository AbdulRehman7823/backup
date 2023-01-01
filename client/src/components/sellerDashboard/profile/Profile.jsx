import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import FileUploader from "../../FileUploader";
import convertImageToBase64 from "../../ImageBase64";
import { uploadImage } from "../../ImageUpload";
import authServices from "../../Services/AuthServices";
import poetServices from "../../Services/PoetServices";
import alert from "../../Services/Alert";
const Profile = () => {
  const [isEdit, setEdit] = useState(false);
  const [data, setData] = useState({
    img: "",
    username: "",
    password: "",
    fee: 0,
    email: "",
  });
  const handleData = (key, value) => {
    setData({ ...data, [key]: value });
  };
  const onDrop = (acceptedFiles, rejectedFiles, imgName) => {
    if (rejectedFiles.length > 0) {
      alert.showWarningAlert("Upload only one image and size limit of 1 MB");
      return;
    } else if (acceptedFiles) {
      convertImageToBase64(acceptedFiles[0], (result, success) => {
        if (success) {
          uploadImage(result, (url, success) => {
            if (success) {
              handleData("img", `${url}`);
            }
          });
        }
      });
    }
  };
  const updatePoet = (e) => {
    e.preventDefault();
    const payload = {
      img: data.img,
      username: data.username,
      password: data.password,
      fee: data.fee,
    };
    poetServices
      .updatePoet(authServices.getLoggedInUser()._id, payload)
      .then((data) => {
        alert.showSuccessAlert("Your profile has beed updated successfully!");
      })
      .catch((err) => alert.showErrorAlert(err));
  };
  useEffect(() => {
    poetServices
      .getPoet(authServices.getLoggedInUser()._id)
      .then((data) => {
        console.log(data);
        setData({
          img: data.img,
          email: data.email,
          password: data.password,
          fee: data.fee,
          username: data.username,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section class="text-gray-600 py-24 body-font">
      <div className="flex mx-8 mb-4 justify-between">
        <h3 className="text-3xl font-medium">Your Personal Info</h3>
        <label class="inline-flex relative items-center mb-4 cursor-pointer">
          <input
            type="checkbox"
            value=""
            class="sr-only peer"
            onChange={(e) => setEdit(e.target.checked)}
          />
          <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Edit profile
          </span>
        </label>
      </div>
      <div class="container mx-auto flex px-5  md:flex-row flex-col justify-center">
        <div class=" lg:w-sm md:w-1/4 w-5/6 mb-10 md:mb-0">
          <img
            class="object-cover object-center rounded w-full h-2/3"
            alt="profile pic"
            src={data.img}
          />
          {isEdit && (
            <FileUploader
              placeholder={"Click here to change pic"}
              accept={["image/jpeg", "image/png", "image/bmp"]}
              maxFiles={1}
              maxSize={1000000}
              onDrop={(acceptedFiles, rejectedFiles) =>
                onDrop(acceptedFiles, rejectedFiles, "frontSideImage")
              }
            />
          )}
        </div>
        <div class="md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
          <form className="w-full" onSubmit={updatePoet}>
            <div class="mb-2">
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                value={data.email}
                className={
                  "border-transparent focus:border-transparent focus:ring-0 w-full disabled"
                }
                required
                disabled={!isEdit}
              />
            </div>
            <div class="mb-2">
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your password
              </label>
              <input
                onChange={(e) => handleData("password", e.target.value)}
                value={data.password}
                type="password"
                id="password"
                className={
                  isEdit
                    ? "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    : "border-transparent focus:border-transparent focus:ring-0 w-full "
                }
                disabled={!isEdit}
                required
              />
            </div>
            <div class="mb-2">
              <label
                for="username"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your username
              </label>
              <input
                onChange={(e) => handleData("username", e.target.value)}
                value={data.username}
                type="text"
                id="username"
                className={
                  isEdit
                    ? "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    : "border-transparent focus:border-transparent focus:ring-0 w-full"
                }
                required
                disabled={!isEdit}
              />
            </div>
            <div class="mb-2">
              <label
                for="fee"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your fee
              </label>
              <input
                onChange={(e) => handleData("fee", e.target.value)}
                value={data.fee}
                type="number"
                id="fee"
                className={
                  isEdit
                    ? "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    : "border-transparent focus:border-transparent focus:ring-0 w-full"
                }
                disabled={!isEdit}
                required
              />
            </div>

            {isEdit && (
              <button
                type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Profile;
