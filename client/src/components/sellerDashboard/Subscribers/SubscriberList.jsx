import React from "react";
import SubscriberCard from "./SubscriberCard";
import poetServices from "../../Services/PoetServices";
import authServices from "../../Services/AuthServices";

function SubscriberList() {
  const [subscribers, setSubscribers] = React.useState([]);

  const getAllSubscribers = () => {
    poetServices
      .getSubscribers(authServices.getLoggedInUser()._id)
      .then((data) => {
        if (data) {
          setSubscribers(data);
        }
        console.log(data);
      })
      .catch((err) => {
        alert.showErrorAlert(err.message);
      });
  };

  React.useEffect(getAllSubscribers, []);
  return (
    <div className="mt-14 mx-14">
      <div className="flex flex-wrap flex-row justify-between">
        {subscribers.length == 0 ? (
          <div className="items-center justify-center m-22">
            <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              Currently You have no Subscribers
            </h1>
            <p class="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
              Don't be sad you will get popularit very soon !! try yo upload poetries more 
              and more and do hardwork we will rank your account 
              for further help you can contact with us
            </p>
          </div>
        ) : (
          subscribers.map((data, index) => <SubscriberCard user={data} />)
        )}
      </div>
    </div>
  );
}

export default SubscriberList;
