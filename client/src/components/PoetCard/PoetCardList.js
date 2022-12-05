import React from "react";
import readerServices from "../Services/ReaderServices";
import RiseLoader from "react-spinners/RiseLoader";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import PoetCard from "./PoetCard";
import "./style.css";
const PoetCardList = () => {
  const [loading, setLoading] = React.useState(false);
  const [poets, setPoets] = React.useState([]);
  function getData() {
    setLoading(true);
    readerServices
      .getPoets()
      .then((data) => {
        console.log(data);
        setPoets(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const handleOnSearch = (string, results) => {
    console.log(string, results);
  };
  const handleOnSelect = (poet) => {
    setPoets([poet]);
  };
  const handleClear = () => {
    setPoets([]);
    getData();
  };
  const formatResult = (poet) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>
          {poet.username}
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
                  items={poets}
                  fuseOptions={{ keys: ["username"] }}
                  resultStringKeyName="username"
                  onSelect={handleOnSelect}
                  onClear={handleClear}
                  formatResult={formatResult}
                  onSearch={handleOnSearch}
                  styling={{ zIndex: 4 }}
                  autoFocus
                  placeholder="Search poet"
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
        {poets.length === 0 && !loading ? (
          <p>There is no poet yet!</p>
        ) : (
          <div class="flex flex-wrap -m-4">
            {poets.map((poet) => (
              <div class="xl:w-1/4 md:w-1/2 w-full p-4">
                <PoetCard poet={poet}></PoetCard>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PoetCardList;
