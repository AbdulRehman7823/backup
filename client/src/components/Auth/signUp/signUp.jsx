import React, { useState } from "react";
import "../signUp/style.css";
import { FaKickstarter } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import authServices from "../../Services/AuthServices";
import { Link, useNavigate } from "react-router-dom";
import alert from "../../Services/Alert";
import convertImageToBase64 from "../../ImageBase64";
import { uploadImage } from "../../ImageUpload";
import FileUploader from "../../FileUploader";
import ScaleLoader from "react-spinners/ScaleLoader";

function SignUp() {

  //all states
  const [imgUrl, setImgUrl] = React.useState();
  const [iurl, setIurl] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [isValidPassword, setIsValidPassword] = React.useState(false);
  const [isValidEmail, setIsValidEmail] = React.useState(false);

  const [error, setError] = useState("");
	const [msg, setMsg] = useState("");

  const [data, setData] = React.useState({
    username: "",
    email: "",
    password: "",
    userType: "",
    img: "",
  });

  // functions
  const navigate = useNavigate();
  const signUp = (e) => {
    e.preventDefault();
    if (
      data.email === "" ||
      data.password === "" ||
      data.img === "" ||
      data.userType === ""
    ) {
      alert.showErrorAlert("All Details are Required");
    } else {
      setLoading(true);
      console.log(data);
    
      authServices
        .registerUser(data)
        .then((data) => {
          alert.showSuccessAlert("The user registered successfully!");
          setLoading(false);
          setError("");
          setMsg(data.message);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          if (
            err.response &&
            err.response.status >= 400 &&
            err.response.status <= 500
          ) {
            setError(err.response.data.message);
            alert.showErrorAlert(err.response.data.message);
            
          }
                 });
    }
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
              setIurl(`${url}`);
              setImgUrl(acceptedFiles[0].name);
            }
          });
        }
      });
    }
  };
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

  

  return (
    <div>
      {loading ? (
        <div
          style={{ textAlign: "center" }}
          className="main-bg flex justify-center w-full bg-gray-300 h-screen mx-auto py-32"
        >
           <ScaleLoader color="#3d49fc" size="150"  />
        </div>
      ) : (
        <section className="main-bg px-64 py-4  flex justify-center  h-screen items-center">
          <div
            className="shadow-3xl rounded-xl bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0  px-6 lg:px-6 xl:px-6
          flex items-center justify-center py-16"
          >
            <div className="w-full bg-gray">
              <form className="flex flex-row justify-around">
                <div className="w-96">
                  <div>
                    <div className="inline-flex items-center ">
                      <img src="/logo.png" alt="img" />
                      <h1 className="text-xl text-skin-base font-bold pl-2">
                        Poet Prime
                      </h1>
                    </div>
                    <h1 className="text-xl md:text-2xl font-bold leading-tight text-skin-base mt-6">
                      Sign in with Us!
                    </h1>
                    <label className="block text-skin-base">Username</label>
                    <input
                      user="text"
                      name=""
                      id=""
                      placeholder="Username"
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
                    <label className="block text-skin-base">
                      Email Address
                    </label>
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
                        emailValidation(e.target.value);
                      }}
                    />
                    {isValidEmail ? (
                      <b className="text-red-700 text-sm">
                        Please Enter Correct Email
                      </b>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="mt-4 w-full">
                    <label className="block text-skin-base ">
                      Select Account Type
                    </label>
                    <select
                      id="userType"
                      className="form-control dropdownMenu"
                      onChange={(e) => {
                        handleData("userType", e.target.value);
                      }}
                      
                      required
                    >
                      <option value="reader">Reader</option>
                      <option value="poet">Poet</option>
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
                        passwordValidation(e.target.value);
                      }}
                    />
                    {isValidPassword ? (
                      <b className="text-red-700 text-sm">
                        Please Enter 8 digits password
                      </b>
                    ) : (
                      <></>
                    )}
                  </div>

                  <button
                    onClick={signUp}
                    className="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg
                px-4 py-3 mt-6"
                  >
                    Sign In
                  </button>
                  {error && <div className="error_msg">{error}</div>}
					{msg && <div className="success_msg">{msg}</div>}
                </div>
                <div></div>
                <div className="flex flex-col justify-around">
                  <div className="flex items-center justify-center w-full">
                    {iurl == "" ? (
                      <label
                        for="dropzone-file"
                        className="px-12 py-4 flex flex-col items-center justify-center w-full h-72 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            aria-hidden="true"
                            className="w-10 h-10 mb-3 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            ></path>
                          </svg>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                              Upload your Profile Image here!
                            </span>{" "}
                            or drag and drop
                          </p>
                        </div>
                        <FileUploader
                          placeholder={imgUrl ? imgUrl : "Click here to upload"}
                          accept={["image/jpeg", "image/png", "image/bmp"]}
                          maxFiles={1}
                          maxSize={1000000}
                          onDrop={(acceptedFiles, rejectedFiles) =>
                            onDrop(
                              acceptedFiles,
                              rejectedFiles,
                              "frontSideImage"
                            )
                          }
                        />
                      </label>
                    ) : (
                      <img
                        className=" w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        src={iurl}
                        alt="no image"
                      />
                    )}
                  </div>
                 
                </div>
                
              </form>
             
              <a
            href="http://localhost:4000/api/auth/google/callback"
            className="w-full block border text-center bg-gray-200 hover:bg-gray-300 focus:bg-blue-400  font-semibold rounded-lg
                px-4 py-2 mt-6"
          >
            <FcGoogle size={30} className="inline" />
            <span> Sign In with google</span>
          </a>
         
              <hr className="border-gray-300 w-full mt-4" />

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

              <p className="text-sm text-gray-500 ">
                &copy; 2022 Poet-Prime - All Rights Reserved.
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default SignUp;
