import React from "react";
import alert from "../../Services/Alert";
import poetServices from "../../Services/PoetServices";
import './style.css'


function PoetryCard({poetry}) {


  const [data,setData]= React.useState(poetry);

  const deletePoetry = (e)=>{
        e.preventDefault();
        poetServices.deletePoetry(data._id).then(result=>{
               alert.showSuccessAlert("Poetry is deleted successfully");
               window.location.reload("/app/seller/delete")
        }).catch(error=>{
          alert.showErrorAlert(error.message);
          console.log(error)
        })
        
  }
  return (
    <div className="p-2 card">
      <a className="card flex flex-col items-center bg-white border rounded-lg shadow-md md:flex-row  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img
          className="object-cover w-full rounded-t-lg md:h-56 md:w-48 md:rounded-none md:rounded-l-lg"
          src={poetry.img}
          alt=""
        />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl  font-bold tracking-tight text-gray-900 dark:text-white">
            {poetry.title}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {poetry.description}
          </p>
          <p className="mb-3 font-bold text-gray-600 dark:text-gray-400 ">
            {poetry.poetryType}
          </p>
          <button
          onClick={deletePoetry}
           className="text-gray-100 bg-blue-600 px-2 py-2 rounded-lg">Delete</button>
        </div>
      </a>
    </div>
  );
}

export default PoetryCard;
