import React from "react";
import alert from "../../Services/Alert";
import authServices from "../../Services/AuthServices";
import poetServices from "../../Services/PoetServices";



function UserTable() {
  
const [readers,setReaders] = React.useState([]);

const getAllReaders =  ()=>{
       poetServices.getReaders(authServices.getLoggedInUser()._id).then(data=>{
        console.log(data);
        setReaders(data);
      }).catch(err=>{
        alert.showErrorAlert(err.message);
      });

     
}

React.useEffect(getAllReaders,[]);
  return (
    <div>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-24">
        <h1 className="text-gray-700 text-3xl font-bold underline p-6">User details</h1>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                User
              </th>
              <th scope="col" className="py-3 px-6">
                username
              </th>
              <th scope="col" className="py-3 px-6">
                email
              </th>
              <th scope="col" className="py-3 px-6">
                Paid Fee
              </th>
            </tr>
          </thead>
          <tbody>

            {readers.map((data,index)=>{
              return ( <tr key={index} className="bg-white text-medium border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th
                scope="row"
                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
               <img className="w-10 h-10 rounded" src={data.img} alt="Default avatar"></img>
              </th>
              <td className="py-4 px-6">{data.username}</td>
              <td className="py-4 px-6">{data.email}</td>
              <td className="py-4 px-6">{data.fee}</td>
            
            </tr>)
            })}
           
           
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserTable;
