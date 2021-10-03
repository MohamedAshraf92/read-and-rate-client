import React from "react";
import { NavLink } from "react-router-dom";

import "./loginFooter.css";

const LoginFooter = () => {
  return (
    <div className="login-footer">
      <ul>
        <li>
          <NavLink exact activeClassName="login-footer-active" to="/">
            Home
          </NavLink>
          <NavLink activeClassName="login-footer-active" to="/aboutUs">
            About Us
          </NavLink>
          <NavLink activeClassName="login-footer-active" to="/categories">
            Categories
          </NavLink>
          <NavLink activeClassName="login-footer-active" to="/authors">
            Authors
          </NavLink>
          <NavLink activeClassName="login-footer-active" to="/adminLogin">
            Admins Panel
          </NavLink>
          <NavLink activeClassName="login-footer-active" to="/termsAndCond">
            Terms & Conditions
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default LoginFooter;
