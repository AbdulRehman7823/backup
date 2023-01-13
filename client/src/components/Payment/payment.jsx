import axios from "axios";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import authServices from "../Services/AuthServices";
import  "./styles.css";

const key =
  "pk_test_51KuvSGJ5s3GMFY7xlZh5LhxrdAGBfMyV3nFZ0EK8WzhxtLWUCpqM20izoZyCNj7NhoTKNfsR3ZBv9ASdsnbYRlyy00uoK5gUmJ";

const Payment = () => {
  const location = useLocation();

  const [amount, setAmount] = React.useState(
    location.state.amount ? location.state.amount : 20
  );
  const [poetId, setpoetId] = React.useState(
    location.state.poetId ? location.state.poetId : ""
  );
 
  const [stripeToken, setStripeToken] = React.useState(null);
  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      console.log(poetId);
      try {
        const res = await axios.post(
          "http://localhost:4000/api/reader/request/poet/" +
            authServices.getLoggedInUser()._id,
          {
            tokenId: stripeToken.id,
            amount,
            poetId,
          }
        );
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    makeRequest();
  }, [stripeToken]);
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <StripeCheckout
        name="Poet Prime"
        image="/logo.png"
        billingAddress
        shippingAddress
        description
        amount={amount}
        token={onToken}
        stripeKey={key}
      >
       <div className="paymentContainer">
					
					<div className="form_paymentContainer">
						<h1 className="text-yellow-200 text-xl text-bold">Confirmation</h1>
						<h2 className="text-gray-600 text-l ">Click the pay button to pay!</h2>
						<button className="green_btn">
							PAY
						</button>
				</div>
        </div>
      </StripeCheckout>
    </div>
  );
};

export default Payment;
