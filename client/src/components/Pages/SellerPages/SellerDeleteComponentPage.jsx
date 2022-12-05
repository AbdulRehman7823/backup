import React from 'react'
import SellerNavigation from '../../sellerDashboard/Navigation/SellerNavigation'
import DeleteComponent from '../../sellerDashboard/DeleteComponent/DeleteComponent'
function SellerDeleteComponentPage() {
  return (
    <div>

      <SellerNavigation>
        <DeleteComponent></DeleteComponent>
      </SellerNavigation>
    </div>
  )
}

export default SellerDeleteComponentPage