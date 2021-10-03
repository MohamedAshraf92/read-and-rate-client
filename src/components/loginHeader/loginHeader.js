import React from "react";
import Input from "antd/lib/input";
import Button from "antd/lib/button";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import logo from "../../assets/logo.png";

import "./loginHeader.css";

const LoginHeader = () => {
  return (
    <div className="login-header-back">
      <div className="login-header">
        <img src={logo} alt="logo" />
        <Input.Group compact className="login-input-group">
          <Input
            className="login-input"
            autoComplete="off"
            type="email"
            size="large"
            placeholder="Email"
            prefix={<UserOutlined />}
          />
          <Input
            className="login-input"
            autoComplete="off"
            type="password"
            size="large"
            placeholder="Password"
            prefix={<LockOutlined />}
          />
          <Button size="large">Login</Button>
        </Input.Group>
      </div>
    </div>
  );
};

export default LoginHeader;
