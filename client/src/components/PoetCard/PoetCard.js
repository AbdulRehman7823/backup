import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import alert from "../Services/Alert";
import authServices from "../Services/AuthServices";

function PoetCard({ poet }) {
  const navigation = useNavigate();
  const hadleNavigation = (e) => {
    e.preventDefault();
    navigation("/poet/poetries", { state: { poetId: poet } });
    console.log("method called");
  };
  function chatHandler(e, poet) {
    e.preventDefault();
    navigation("/reader/chat", {
      state: { poet: poet },
    });
  }

  return (
    <div>
      <div className="w-full bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-end px-4 pt-4"></div>
        <div className="flex flex-col items-center pb-10">
          {console.log(poet.img)}
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src={
              poet && poet.img !== undefined
                ? poet.img
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcdsC6_g4tHOfg6UsEMCzvW4cqwK6nXUCljg&usqp=CAU"
            }
            alt="Poet Image"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {poet?.username}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {poet?.details}
          </span>
          <div className="flex mt-4 space-x-3 md:mt-6">
            <a
              onClick={hadleNavigation}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              View Poetries
            </a>
            {poet.poetCustomers.find(
              (data) => data.readerId === authServices.getLoggedInUser()._id
            ) && (
              <a
                onClick={(e) => chatHandler(e, poet)}
                href="#"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
              >
                Contact?
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PoetCard;
