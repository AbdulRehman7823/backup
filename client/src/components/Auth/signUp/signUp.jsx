import React, { useState } from "react";
import "./style.css";
import { FaKickstarter } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import authServices from "../../Services/AuthServices";
import { Link, useNavigate } from "react-router-dom";
import alert from "../../Services/Alert";
import convertImageToBase64 from "../../ImageBase64";
import { uploadImage } from "../../ImageUpload";
import FileUploader from "../../FileUploader";

function SignUp() {
  const navigate = useNavigate();
  const [data, setData] = React.useState({
    username: "",
    email: "",
    password: "",
    userType: "",
    img: "",
  });
  const [imgUrl, setImgUrl] = useState("");

  const signUp = (e) => {
    e.preventDefault();

    authServices
      .registerUser(data)
      .then((data) => {
        alert.showSuccessAlert("The user registered successfully!");
        navigate("/login");
      })
      .catch((err) => {
        alert.showErrorAlert(err.response.data.message);
        console.log(err.response.data.message);
      });
  };
  function handleData(key, value) {
    setData({ ...data, [key]: value });
  }
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
              setImgUrl(acceptedFiles[0].name);
            }
          });
        }
      });
    }
  };
  const signUpWithGoogle = (e) => {
    e.preventDefault();
    authServices
      .googleAuth()
      .then((data) => {
        alert.showSuccessAlert("you are authenticated successfully");
      })
      .catch((err) => {
        alert.showErrorAlert(err);
      });
  };
  return (
    <section className=" flex flex-col md:flex-row mt-28 items-center ">
      <div
        className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
          flex items-center justify-center "
      >
        <div className="w-full h-100">
          <div className="inline-flex items-center mt-4">
            <FaKickstarter className="mr-4 text-3xl block text-blue-700" />
            <h1 className="text-xl text-skin-base font-bold">
              Poet Prime SignIn
            </h1>
          </div>
          <h1 className="text-xl md:text-2xl font-bold leading-tight text-skin-base mt-6">
            Sign in with Us!
          </h1>

          <form className="mt-6">
            <div>
              <label className="block text-skin-base">Username</label>
              <input
                user="text"
                name=""
                id=""
                placeholder="Enter Email Address"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                autofocus
                autocomplete
                required
                onChange={(e) => {
                  handleData("username", e.target.value);
                }}
              />
            </div>
            <div>
              <label className="block text-skin-base">Email Address</label>
              <input
                type="email"
                name=""
                id=""
                placeholder="Enter Email Address"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                autofocus
                autocomplete
                required
                onChange={(e) => {
                  handleData("email", e.target.value);
                }}
              />
            </div>
            <div className="mt-4">
              <label className="block text-skin-base ">
                Select Account Type
              </label>
              <select
                id="userType"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                  focus:bg-white focus:outline-none"
                onChange={(e) => {
                  handleData("userType", e.target.value);
                }}
                required
              >
                <option value="poet">Poet</option>
                <option value="reader">Reader</option>
              </select>
            </div>

            <div className="mt-4">
              <label className="block text-skin-base">Password</label>
              <input
                type="password"
                name=""
                id=""
                placeholder="Enter Password"
                minlength="8"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                  focus:bg-white focus:outline-none"
                required
                onChange={(e) => {
                  handleData("password", e.target.value);
                }}
              />
            </div>
            <div className="mt-4">
              <label className="block text-skin-base">Upload an image</label>
              <FileUploader
                placeholder={imgUrl ? imgUrl : "Click here to upload"}
                accept={["image/jpeg", "image/png", "image/bmp"]}
                maxFiles={1}
                maxSize={1000000}
                onDrop={(acceptedFiles, rejectedFiles) =>
                  onDrop(acceptedFiles, rejectedFiles, "frontSideImage")
                }
              />
            </div>
            <button
              onClick={signUp}
              className="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg
                px-4 py-3 mt-6"
            >
              Sign In
            </button>
            <div className=" my-2 font-medium text-center">or</div>
          </form>
          <a
            href="http://localhost:4000/api/auth/googleAuth/?userType=reader"
            className="w-full block border text-center bg-gray-200 hover:bg-gray-300 focus:bg-blue-400  font-semibold rounded-lg
                px-4 py-2 mt-6"
          >
            <FcGoogle size={30} className="inline" />
            <span> Sign In with google</span>
          </a>
          <hr className="my-6 border-gray-300 w-full" />

          <p className="mt-2">
            Already have an account?
            <Link to="/login">
              <a
                type="button"
                className="text-blue-500 hover:text-blue-700 font-semibold"
              >
                Login
              </a>
            </Link>
          </p>

          <p className="text-sm text-gray-500 mt-4">
            &copy; 2022 Poet Prime - All Rights Reserved.
          </p>
        </div>
      </div>

      <div className="main-bg-top hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
        <div className="main-bg w-full h-full justify-center p-32"></div>
      </div>
    </section>
  );
}

export default SignUp;
