import React from "react";
import LoginHeader from "./loginHeader/loginHeader";
import SignupForm from "./signupForm/signupForm";
import LoginFooter from "./loginFooter/loginFooter";

import "./landingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <LoginHeader />
      <div className="main-container">
        <h1 className="greeting">
          Welcome to Read&Rate. Your electronic library for all the books you
          like.
        </h1>
        <div className="popular-signup">
          <div className="popular-items"></div>
          <SignupForm />
        </div>
      </div>
      <LoginFooter />
    </div>
  );
};

export default LandingPage;
