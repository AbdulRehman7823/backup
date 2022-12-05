import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import readerServices from "../Services/ReaderServices";
import { loadStripe } from "@stripe/stripe-js";
const key =
  "pk_test_51KuvSGJ5s3GMFY7xlZh5LhxrdAGBfMyV3nFZ0EK8WzhxtLWUCpqM20izoZyCNj7NhoTKNfsR3ZBv9ASdsnbYRlyy00uoK5gUmJ";
const data = { plan: "Standard", price: 20 };
export default function BuySubscription() {
  const location = useLocation();
  const [poet, setPoet] = useState(location.state.poet);

  const makeRequest = async () => {
    const stripePromise = loadStripe(key);
    try {
      const stripe = await stripePromise;
      readerServices
        .buySubscription({
          order: data,
        })
        .then(async (data) => {
          const result = await stripe?.redirectToCheckout({
            sessionId: data.id,
          });
        })
        .catch((error) => {
          console.log(error.message);
        });
    } catch (error) {}
  };

  return (
    <>
      <div className="container px-16 mt-24">
        <h1 className="text-4xl font-extrabold dark:text-white">
          Subscription plan
        </h1>
      </div>
      <div className="flex justify-center mt-8 ">
        <div class="w-full max-w-sm p-4 bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700 ">
          <h5 class="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
            Standard plan
          </h5>
          <div class="flex items-baseline text-gray-900 dark:text-white">
            <span class="text-3xl font-semibold">$</span>
            <span class="text-5xl font-extrabold tracking-tight">20</span>
            <span class="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">
              /Life time
            </span>
          </div>

          <ul role="list" class="space-y-5 my-7">
            <li class="flex space-x-3">
              <svg
                aria-hidden="true"
                class="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Check icon</title>
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                Life time Free posts
              </span>
            </li>
            <li class="flex space-x-3">
              <svg
                aria-hidden="true"
                class="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Check icon</title>
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                Poet Guidance
              </span>
            </li>
            <li class="flex space-x-3">
              <svg
                aria-hidden="true"
                class="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Check icon</title>
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                Free Poetry books
              </span>
            </li>

           
          </ul>
          <button
            onClick={makeRequest}
            type="button"
            class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
          >
            Buy Subscription
          </button>
        </div>
      </div>
    </>
  );
}
