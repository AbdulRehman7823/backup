import React from 'react'
import SellerNavigation from '../../sellerDashboard/Navigation/SellerNavigation'
import SellerHome from '../../sellerDashboard/SellerHome/SellerHome'
function SellerHomePage() {
  return (
    <div>

      <SellerNavigation>
        <SellerHome></SellerHome>
      </SellerNavigation>
    </div>
  )
}

export default SellerHomePage