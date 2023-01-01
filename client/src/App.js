import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import FrontPage from "./components/Pages/FrontPage";
import LoginPage from "./components/Pages/LoginPage";
import SignupPage from "./components/Pages/SignupPage";
import ContactPage from "./components/Pages/ContactPage";
import SellerHomePage from "./components/Pages/SellerPages/SellerHomePage";
import SellerAddComponentPage from "./components/Pages/SellerPages/SellerAddComponentPage";
import SellerDeleteComponentPage from "./components/Pages/SellerPages/SellerDeleteComponentPage";
import SellerSubscriberPage from "./components/Pages/SellerPages/SellerSubscriberPage";
import SellerRequestPages from "./components/Pages/SellerPages/SellerRequestPages";
import PoetCardList from "./components/PoetCard/PoetCardList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PoetryList from "./components/Poetries/PoetryList";
import PoetPoetryList from "./components/PoetCard/PoetPoetryList";
import BuySubscription from "./components/PoetCard/BuySubscription";
import Navbar from "./components/FrontPageComponents/Navbar/Navbar";
import Footer from "./components/FrontPageComponents/Footer/Footer";
import SellerProfilePage from "./components/Pages/SellerPages/SellerProfilePage";

function App() {
  return (
    <Router>
      <Navbar></Navbar>

      <ToastContainer
        autoClose={1000}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
      <Routes>
        <Route path="/" element={<FrontPage></FrontPage>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage></SignupPage>} />
        <Route path="/contactus" element={<ContactPage />} />
        <Route path="/app/seller/home" element={<SellerHomePage />} />
        <Route path="/app/seller/add" element={<SellerAddComponentPage />} />
        <Route
          path="/app/seller/delete"
          element={<SellerDeleteComponentPage />}
        />
        <Route path="/app/seller/requests" element={<SellerRequestPages />} />
        <Route
          path="/app/seller/subscribers"
          element={<SellerSubscriberPage />}
        />
        <Route path="/app/seller/profile" element={<SellerProfilePage />} />

        <Route path="/poets" element={<PoetCardList />} />
        <Route path="/poetries" element={<PoetryList />} />
        <Route path="/poet/poetries" element={<PoetPoetryList />} />
        <Route path="/poet/buysubscription" element={<BuySubscription />} />
      </Routes>
      <Footer></Footer>
    </Router>
  );
}
export default App