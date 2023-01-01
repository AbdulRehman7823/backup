import React from "react";
import FileUploader from "../../FileUploader";
import convertImageToBase64 from "../../ImageBase64";
import { uploadImage } from "../../ImageUpload";
import { useNavigate } from "react-router-dom";
import alert from "../../Services/Alert";
import poetServices from "../../Services/PoetServices";
import authServices from "../../Services/AuthServices";
import { ReactTransliterate } from "react-transliterate";
import "react-transliterate/dist/index.css";
import { useState } from "react";

function AddComponent() {
  const navigate = useNavigate();
  const [imgUrl, setImgUrl] = React.useState();
  const [iurl, setIurl] = React.useState("");
  const [isUrdu, setUrdu] = useState(false);
  const [data, setData] = React.useState({
    poetId: authServices.getLoggedInUser()._id,
    title: "",
    description: "",
    img: "",
    poetryType: "sad",
  });
  function handleData(key, value) {
    setData({ ...data, [key]: value });
  }
  const addPoetry = (e) => {
    e.preventDefault();
    if (!data.img) {
      alert.showErrorAlert("Please upload image");
      return;
    }
    if (data.title === "" || data.description === "") {
      alert.showErrorAlert("please give all details");
      return;
    }

    handleData("poetId", authServices.getLoggedInUser()._id);
    console.log(data);
    poetServices
      .addPoetry(data)
      .then((res) => {
        alert.showSuccessAlert("Poetry Added Successfully");
        navigate("/app/seller/home");
      })
      .catch((err) => {
        alert.showErrorAlert(err.response.data.message);
        console.log(err.response.data.message);
      });
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
              setIurl(`${url}`);
              setImgUrl(acceptedFiles[0].name);
            }
          });
        }
      });
    }
  };
  return (
    <div className="p-14 justify-center">
      <h1 className="text-3xl font-lg text-gray-700 underline">ADD POETRY</h1>

      <div className="flex flex-row justify-around shadow-xl rounded-xl mt-14 p-10">
        <div className="w-2/3">
          <div>
            <label class="inline-flex relative items-center mb-4 cursor-pointer">
              <input
                type="checkbox"
                value=""
                class="sr-only peer"
                onChange={(e) => setUrdu(e.target.checked)}
              />
              <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Type Urdu
              </span>
            </label>
            <label
              for="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Poetry Title
            </label>
            {isUrdu ? (
              <ReactTransliterate
                className="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={data.title}
                onChangeText={(text) => handleData("title", text)}
                lang="ur"
              />
            ) : (
              <input
                type="text"
                onChange={(e) => {
                  handleData("title", e.target.value);
                }}
                id="title"
                className="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Title"
                required
              />
            )}
          </div>
          <div>
            <label
              for="countries"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select an Poetry Type
            </label>
            <select
              id="countries"
              onChange={(e) => {
                handleData("poetryType", e.target.value);
              }}
              className=" mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Select Category</option>
              <option value="Sad">Sad</option>
              <option value="Love">Love</option>
              <option value="Attitude">Attitude</option>
              <option value="Life">Life</option>
            </select>
          </div>

          <div>
            <label
              for="detaile"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Poetry
            </label>
            {isUrdu ? (
              <ReactTransliterate
                renderComponent={(props) => (
                  <textarea
                    {...props}
                    rows="4"
                    className="mb-6 block p-2.5 w-full text-m text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  ></textarea>
                )}
                value={data.description}
                onChangeText={(text) => handleData("description", text)}
                lang="ur"
              />
            ) : (
              <textarea
                id=""
                onChange={(e) => {
                  handleData("description", e.target.value);
                }}
                rows="4"
                className="mb-6 block p-2.5 w-full text-m text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your Poetry or Poetry related here...."
              ></textarea>
            )}
          </div>
          <button
            onClick={addPoetry}
            className="px-16 py-2 rounded-lg hover:bg-blue-500  bg-blue-600 text-white"
          >
            ADD
          </button>
        </div>

        <div className="flex items-center justify-center w-1/2 px-14">
          {iurl == "" ? (
            <label
              for="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <FileUploader
                placeholder={imgUrl ? imgUrl : "Click here to upload"}
                accept={["image/jpeg", "image/png", "image/bmp"]}
                maxFiles={1}
                maxSize={1000000}
                onDrop={(acceptedFiles, rejectedFiles) =>
                  onDrop(acceptedFiles, rejectedFiles, "frontSideImage")
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
    </div>
  );
}

export default AddComponent;
