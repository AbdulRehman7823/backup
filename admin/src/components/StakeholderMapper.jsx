import React from "react";
import adminServices from "../Services/AdminServices";
import Stakeholder from "./Stakeholder";
import { RiseLoader } from "react-spinners";
import { useState } from "react";
const StakeholderMapper = ({ method, dataType }) => {
  const [stakeholders, setStakeholders] = React.useState([]);
  const [loading, setLoading] = useState(false);
  function getData() {
    setLoading(true);
    method()
      .then((data) => {
        console.log(data);
        setStakeholders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }
  React.useEffect(getData, []);
  return (
    <div className="container">
      <h1 style={{ marginTop: "5rem" }}>{dataType}</h1>

      <div className="d-flex justify-content-center">
        <RiseLoader
          color={"#2237ac"}
          loading={loading}
          css={"margin-top:300px"}
        />
      </div>
      {stakeholders.length == 0 && !loading ? (
        <p>There is no data </p>
      ) : (
        <div className="row cardLayOut justify-content-center">
          {stakeholders.map((stakeholder, key) => (
            <div className="col-lg-5 ">
              <Stakeholder
                key={key}
                stakeholder={stakeholder}
                dataType={dataType}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StakeholderMapper;
