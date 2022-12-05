import React from 'react'
import SellerNavigation from '../../sellerDashboard/Navigation/SellerNavigation'
import RequestComponent from '../../sellerDashboard/Requests/RequestComponent'

function SellerRequestPages() {
  return (
    <div>
        <SellerNavigation>
            <RequestComponent></RequestComponent>
        </SellerNavigation>
    </div>
  )
}

export default SellerRequestPages