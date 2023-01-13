import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FrontPage from './components/Pages/FrontPage'
import LoginPage from './components/Pages/LoginPage';
import SignupPage from './components/Pages/SignupPage';
import ContactPage from './components/Pages/ContactPage';
import SellerHomePage from './components/Pages/SellerPages/SellerHomePage';
import SellerAddComponentPage from './components/Pages/SellerPages/SellerAddComponentPage';
import SellerDeleteComponentPage from './components/Pages/SellerPages/SellerDeleteComponentPage';
import SellerSubscriberPage from './components/Pages/SellerPages/SellerSubscriberPage';
import SellerRequestPages from './components/Pages/SellerPages/SellerRequestPages';
import PoetCardList from "./components/PoetCard/PoetCardList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PoetryList from "./components/Poetries/PoetryList";
import PoetPoetryList from "./components/PoetCard/PoetPoetryList";
import BuySubscription from "./components/PoetCard/BuySubscription";
import Navbar from "./components/FrontPageComponents/Navbar/Navbar";
import SellerProfilePage from "./components/Pages/SellerPages/SellerProfilePage";
import EmailVerify from "./components/EmailVerify";
import ForgotPassword from "./components/ForgotPassword";
import PasswordReset from "./components/PasswordReset";
import Payment from "./components/Payment/Payment";
import ReaderChat from "./components/reader/ReaderChat";
import PoetChat from "./components/sellerDashboard/seller/PoetChat";

function App() {
  return (
    <Router>
      <ToastContainer
        autoClose={1000}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
      <Routes>
        <Route
          path="/users/:id/verify/:token"
          element={
            <>
              <Navbar />
              <EmailVerify />
            </>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/reader/chat" element={<ReaderChat />} />
        <Route path="/password-reset/:id/:token" element={<PasswordReset />} />
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <FrontPage></FrontPage>
            </>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage></SignupPage>} />
        <Route
          path="/contactus"
          element={
            <>
              <Navbar />
              <ContactPage />
            </>
          }
        />
        <Route path="/app/seller/home" element={<SellerHomePage />} />
        <Route path="/app/seller/add" element={<SellerAddComponentPage />} />
        <Route path="/app/seller/chat" element={<PoetChat />} />
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

        <Route
          path="/poets"
          element={
            <>
              <Navbar />
              <PoetCardList />
            </>
          }
        />
        <Route
          path="/poetries"
          element={
            <>
              <Navbar />
              <PoetryList />
            </>
          }
        />
        <Route
          path="/poet/poetries"
          element={
            <>
              <Navbar />
              <PoetPoetryList />
            </>
          }
        />

        <Route
          path="/poet/buysubscription"
          element={
            <>
              <Navbar />
              <BuySubscription />
            </>
          }
        />
      </Routes>
    </Router>
  );
}
export default App;