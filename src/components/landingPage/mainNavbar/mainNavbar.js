import React from "react";
import logo from "../../../assets/logo.png";

import "./mainNavbar.css";

const MainNavbar = () => {
  return (
    <div className="login-header-back">
      <div className="login-header">
        <img src={logo} alt="logo" />
      </div>
    </div>
  );
};

export default MainNavbar;
