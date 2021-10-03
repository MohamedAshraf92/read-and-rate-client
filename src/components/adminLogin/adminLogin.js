import React, { useState } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import Input from "antd/lib/input";
import Button from "antd/lib/button";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import logo from "../../assets/logo.png";
import API from "../../API";
import LoginFooter from "../loginFooter/loginFooter";
import { loginUser } from "../../store/actions/authActions";

import "./adminLogin.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();

  const adminSignin = () => {
    const data = { email, password };

    API({
      method: "post",
      url: "/user/adminLogin",
      data: data,
    })
      .then((res) => {
        console.log(res);
        dispatch(loginUser(res.data));
        history.push("/adminPanel");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="main-container">
        <div className="admin-login">
          <img className="admin-login-logo" src={logo} alt="logo" />
          <h1>Admin Panel</h1>
          <h3>
            Only Admins can login to manage our Books, Authors & Categories
          </h3>
          <Input
            className="admin-login-input"
            type="email"
            placeholder="Admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            prefix={<UserOutlined />}
          />
          <Input
            className="admin-login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            prefix={<LockOutlined />}
          />
          <Button className="btnMain" onClick={adminSignin}>
            Sign in
          </Button>
        </div>
      </div>
      <LoginFooter />
    </div>
  );
};

export default AdminLogin;
