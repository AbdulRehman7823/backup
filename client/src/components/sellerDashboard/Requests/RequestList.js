import React from 'react'
import RequestCard from './RequestCard'

function RequestList() {
  return (
    <div className="flex flex-wrap justify-between flex-row">
         <RequestCard/>
         <RequestCard/>
         <RequestCard/>
         <RequestCard/>
    </div>
  )
}

export default RequestList