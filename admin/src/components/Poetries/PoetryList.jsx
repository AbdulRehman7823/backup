import React, { useState } from "react";
import readerServices from "../Services/ReaderServices";
import RiseLoader from "react-spinners/RiseLoader";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

import PoetryCard from "./PoetryCard";

const PoetryList = () => {
  const [loading, setLoading] = React.useState(false);

  const [poetries, setPoetries] = React.useState([]);
  function getData() {
    setLoading(true);

    readerServices
      .getPoetries()
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

  React.useEffect(getData, []);
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
        <div className="flexjustify-center">
          <RiseLoader
            color={"#2237ac"}
            loading={loading}
            css={"margin-top:400px"}
          />
        </div>
        {poetries.length === 0 && !loading ? (
          <p>There is no poetry yet!</p>
        ) : (
          <div class="flex py-6 rounded-xl bg-gray-100 flex-wrap justify-between flex-row">
            {poetries.map((poetry, index) => (
              
                <PoetryCard key={index} poetry={poetry}></PoetryCard>
            
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PoetryList;
