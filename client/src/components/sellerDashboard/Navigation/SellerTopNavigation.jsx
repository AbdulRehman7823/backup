import React from "react";
import {format} from 'date-fns';
import {BsFillCalendarDateFill} from 'react-icons/bs'
import AuthServices from "../../Services/AuthServices";

function SellerTopNavigation() {
  return (
    <div className="w-full p-2 sticky top-0 bg-gray-100 flex flex-row px-4 justify-center opacity-95">
         <div className="flex flex-row justify-right mr-auto">
        <BsFillCalendarDateFill className="m-2 text-2xl text-blue-500"></BsFillCalendarDateFill>    
        <h1 className="m-2 text-lg hover:text-blue-500">Today Date is: {format(new Date(),"do MMMM Y")}</h1>
       
      </div>
      <div className="flex flex-row justify-left ml-auto">
        
        <h1 className="m-2 text-lg hover:text-blue-500">{AuthServices.isLoggedIn && AuthServices.getLoggedInUser().username}</h1>
        <img
          class="w-10 h-10 rounded bg-blue-900"
          src="https://www.w3schools.com/w3images/avatar6.png"
          alt="https://www.w3schools.com/w3images/avatar6.png"
        />
      </div>
    </div>
  );
}

export default SellerTopNavigation;
