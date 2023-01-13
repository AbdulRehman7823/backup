import React, { useEffect, useState } from "react";
import RiseLoader from "react-spinners/RiseLoader";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

import PoetryCard from "../Poetries/PoetryCard";
import { useLocation, useNavigate } from "react-router-dom";
import poetServices from "../Services/PoetServices";
const PoetPoetryList = () => {
  const location = useLocation();
  const [loading, setLoading] = React.useState(false);
  const [poetId, setPoetId] = useState(location.state.poetId);
  const [poet, setPoet] = useState({});
  const navigate = useNavigate();
  const [poetries, setPoetries] = React.useState([]);
  useEffect(() => {
    getData();

    getPoet();
  }, [poetId]);
  function getData() {
    setLoading(true);
    poetServices
      .getAllPoetries(poetId._id)
      .then((data) => {
        console.log(data);
        setPoetries(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  const getPoet = () => {
    poetServices.getPoet(poetId._id).then((response) => {
      console.log(response);
      setPoet(response);
    });
  };

  const handleOnSearch = (string, results) => {
    console.log(string, results);
  };
  const handleOnSelect = (poetry) => {
    setPoetries([poetry]);
  };
  const handleClear = () => {
    setPoetries([]);
    getData();
  };
  const formatResult = (poet) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>
          {poet.title}
        </span>
      </>
    );
  };
  const handleSubscription = (e) => {
    e.preventDefault();
    console.log("clck")
    let fee = poet.subscriptionfee?poet.subscriptionfee:5;
    if (fee == 0) {
      fee = 5;
    }
    navigate("/payment", {
      state: { amount: fee, poetId: poet._id },
    });
  };
  return (
    <section class="text-gray-600 body-font">
      <div class="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap justify-center md:justify-between m-6">
          <div>
            <div className="">
              <div style={{ width: 300 }}>
                <ReactSearchAutocomplete
                  items={poetries}
                  fuseOptions={{ keys: ["title"] }}
                  resultStringKeyName="title"
                  onSelect={handleOnSelect}
                  onClear={handleClear}
                  formatResult={formatResult}
                  onSearch={handleOnSearch}
                  styling={{ zIndex: 4 }}
                  autoFocus
                  placeholder="Search poetry by title"
                />
              </div>
            </div>
          </div>
          <div className="header_text mt-24">
            <h1 class="w-full items-center mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              Poets of the new Generation
            </h1>
            <p class="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
              An unhappy person who conceals profound anguish in his heart but
              whose lips are so formed that as sighs and cries pass over them
              they sound like beautiful music
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <RiseLoader
            color={"#2237ac"}
            loading={loading}
            css={"margin-top:400px"}
          />
        </div>
        {poetries.length === 0 && !loading ? (
          <p>There is poetry yet!</p>
        ) : (
          <div class="flex bg-gray-100 py-8 px-4 flex-wrap justify-between flex-row">
            {poetries.map((poetry, index) => (
              <PoetryCard key={index} poetry={poetry}></PoetryCard>
            ))}
          </div>
        )}
        <div className="flex justify-center my-10">
          <button
            onClick={(e)=>handleSubscription(e)}
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Buy subscription
          </button>
        </div>
      </div>
    </section>
  );
};

export default PoetPoetryList;
