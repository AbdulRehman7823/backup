import React from 'react'

function SubscriberCard({user}) {
  return (
    <div className="m-4">
    <div className="w-full pt-6 px-6 max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center pb-10">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcdsC6_g4tHOfg6UsEMCzvW4cqwK6nXUCljg&usqp=CAU"
          alt="Bonnie image"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {user.username}
        </h5>
        <h2 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
          {user.email}
        </h2>
        <div className="flex mt-4 space-x-3 md:mt-6">
          <a
            href="#"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Chat Now 
          </a>
          
        </div>
      </div>
    </div>
  </div>
  )
}

export default SubscriberCard