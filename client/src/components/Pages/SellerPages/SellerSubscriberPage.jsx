import React from 'react'
import SellerNavigation from '../../sellerDashboard/Navigation/SellerNavigation'
import SubscriberCard from '../../sellerDashboard/Subscribers/SubscriberCard'
import SubscriberList from '../../sellerDashboard/Subscribers/SubscriberList'
function SellerSubscriberPage() {
  return (
    <div>

      <SellerNavigation>
        <SubscriberList></SubscriberList>
      </SellerNavigation>
    </div>
  )
}

export default SellerSubscriberPage