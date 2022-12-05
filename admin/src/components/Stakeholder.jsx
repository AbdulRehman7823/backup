import React from "react";
import adminServices from "../Services/AdminServices";
import StakeholderMapper from "./StakeholderMapper";
import alert from "../Services/Alert";
const Stakeholder = ({ stakeholder, dataType }) => {
  function deleteData(_id) {
    adminServices
      .deleteUser(_id)
      .then((data) => {
        console.log(data.message);
        alert.showSuccessAlert(data.message);
      })
      .catch((err) => {
        console.log(err);
      });
    window.location.reload(false);
  }
  return (
    <div>
      <div class="card my-3 shadow" style={{ maxWidth: "540px" }}>
        <div className="row">
          <div class="col-4 d-inline my-4">
            <img
              src={stakeholder.img}
              class="img-fluid rounded-circle ms-2"
              alt="..."
            />
          </div>
          <div class="col-8">
            <div class="card-body">
              <h5 class="card-title m-0">{stakeholder.username}</h5>
              <p class="card-text m-0">{stakeholder.specialization}</p>
              <p class="card-text m-0">{stakeholder.phone}</p>
              <p class="card-text">
                <a>{stakeholder.email}</a>
              </p>
              <button
                className="btn btn-danger"
                onClick={(e) => {
                  deleteData(stakeholder._id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stakeholder;
