import React from 'react'
import authServices from '../../Services/AuthServices';
import poetServices from '../../Services/PoetServices';
import PoetryCard from './PoetryCard'
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useState } from "react";
import { ReactTransliterate } from "react-transliterate";

function PoetryList() {
  const [poetries, setPoetries] = React.useState([]);
  const [isUrdu, setUrdu] = useState(false);
  const [a, b] = useState("");
  const getAllPoetries = () => {
    poetServices
      .getAllPoetries(authServices.getLoggedInUser()._id)
      .then((data) => {
        setPoetries(data);
      });
  };

  const handleOnSelect = (poet) => {
    setPoetries([poet]);
  };
  const handleClear = () => {
    setPoetries([]);
    getAllPoetries();
  };
  const formatResult = (poetry) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>
          {poetry.title}
        </span>
      </>
    );
  };
  React.useEffect(getAllPoetries, []);
  return (
    <>
      <div>
        <div className="flex">
          <div style={{ width: 300 }}>
            <ReactSearchAutocomplete
              items={poetries}
              fuseOptions={{ keys: ["title"] }}
              resultStringKeyName="title"
              onSelect={handleOnSelect}
              onClear={handleClear}
              formatResult={formatResult}
              styling={{ zIndex: 4 }}
              autoFocus
              inputSearchString={a}
              placeholder="Search poetry"
            />
          </div>
          {isUrdu && (
            <ReactTransliterate
              renderComponent={(props) => (
                <input
                  placeholder="Type to get urdu suggestions"
                  {...props}
                  className="mb-6 mx-4 block p-2.5 w-full text-m text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                ></input>
              )}
              value={a}
              onChangeText={(text) => b(text)}
              lang="ur"
            />
          )}
          <label class="inline-flex relative mx-8 mt-2 cursor-pointer ">
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
        </div>
      </div>
      <div className="flex flex-row flex-wrap justify-between">
        {poetries.map((data, index) => {
          return <PoetryCard poetry={data} key={index} />;
        })}
      </div>
    </>
  );
}

export default PoetryList