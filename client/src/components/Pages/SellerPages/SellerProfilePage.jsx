import React from "react";
import SellerNavigation from "../../sellerDashboard/Navigation/SellerNavigation";
import Profile from "../../sellerDashboard/profile/Profile";

const SellerProfilePage = () => {
  return (
    <div>
      <SellerNavigation>
        <Profile />
      </SellerNavigation>
    </div>
  );
};

export default SellerProfilePage;
