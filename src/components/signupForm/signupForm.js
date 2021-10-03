import React from "react";
import { useForm } from "react-hook-form";
import Input from "antd/lib/input";
import ImgCrop from "antd-img-crop";
import Upload from "antd/lib/upload";
import { UploadOutlined } from "@ant-design/icons";
import Button from "antd/lib/button";

import "./signupForm.css";

const SignupForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
      <h3>New here? Create new free account</h3>
      <Input
        className="signup-input"
        placeholder="First Name"
        {...register("firstName", { required: true })}
      />
      {errors.firstName && <p>First name is required</p>}
      <Input
        className="signup-input"
        placeholder="Last Name"
        {...register("lastName", { required: true })}
      />
      {errors.lastName && <p>Last name is required</p>}
      <Input
        className="signup-input"
        type="email"
        placeholder="Email Address"
        {...register("email", { required: true })}
      />
      {errors.email && <p>Email is required</p>}
      <Input
        className="signup-input"
        type="password"
        placeholder="Password"
        {...register("password", { required: true })}
      />
      {errors.password && <p>Password is required</p>}
      <Input
        className="signup-input"
        type="password"
        placeholder="Retype password"
        {...register("rePassword", { required: true })}
      />
      {errors.rePassword && <p>Please, Retype your password</p>}
      <ImgCrop>
        <Upload className="signup-upload">
          <Button className="btnMainOut" icon={<UploadOutlined />}>
            Upload profile picture
          </Button>
        </Upload>
      </ImgCrop>
      <Button className="btnMain signup-btn">Signup Now</Button>
    </form>
  );
};

export default SignupForm;
