import React from 'react'
import authServices from '../../Services/AuthServices';
import poetServices from '../../Services/PoetServices';
import PoetryCard from './PoetryCard'


function PoetryList() {
  const [poetries,setPoetries] = React.useState([]);


const getAllPoetries = () =>{
  poetServices.getAllPoetries(authServices.getLoggedInUser()._id).then(data =>{
    setPoetries(data);
  })
}

React.useEffect(getAllPoetries,[])
  return (
    <div className="flex flex-row flex-wrap justify-between">

         {poetries.map((data,index)=>{
           return <PoetryCard poetry={data} key={index}/>
         })}
       
    </div>
  )
}

export default PoetryList