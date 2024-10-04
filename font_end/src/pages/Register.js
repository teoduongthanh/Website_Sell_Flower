import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Alert, Form, Input } from "antd";

import { useMutationHooks } from "../hooks/useMutationHooks";
import * as UserServices from "../services/UserService";
import Loading from "../Component/LoadingComponent/Loading";

import * as message from "../Component/MessageComponent/Message";
const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();


  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!name) {
      isValid = false;
      formErrors["name"] = "User name is required.";
    }else if(name.length >= 15){
      isValid = false;
      formErrors["name"] = "Vui lòng nhập tên có không quá 15 ký tự";
    }

    if (!email) {
      isValid = false;
      formErrors["email"] = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      isValid = false;
      formErrors["email"] = "Email is invalid.";
    }else if(email.length >= 30){
      isValid = false;
      formErrors["email"] = "Vui lòng nhập không quá 30 ký tự";
    }

    if (!password) {
      isValid = false;
      formErrors["password"] = "Password is required.";
    } else if (password.length < 6) {
      isValid = false;
      formErrors["password"] = "Password must be at least 6 characters.";
    }

    if (!confirmPassword) {
      isValid = false;
      formErrors["password"] = "Password is required.";
    } else if (password.length < 6) {
      isValid = false;
      formErrors["password"] = "Password must be at least 6 characters.";
    }

    if (!phone) {
      isValid = false;
      formErrors["phone"] = "Phone is required.";
    }else if(phone.length >= 13){
      isValid = false;
      formErrors["phone"] = "Vui lòng nhập không quá 13 ký tự";
    }
    setErrors(formErrors);
    return isValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "emailOrname") {
      setEmail(value);
    } else if (name === "name") {
      setUserName(value);
    } else if (name === "phone") {
      setPhone(Number(value));
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    } else if (name === "password") {
      setPassword(value);
    }
    setIsFormValid(name && email && password && confirmPassword && phone); // Update form validity based on input values
  };
  const mutation = useMutationHooks((data) => UserServices.signupUser(data));
  //nhận các propertis: trong mutaion
  const { data, isError, isSuccess } = mutation;
  //khi người dùng đăng ký thành công
  useEffect(() => {
    if (isSuccess) {
      if (data?.status === "Error") {
        message.error(data?.message);
      } else {
        message.success();
        navigate("/login");
        message.success("Đăng ksy tài khoản thành công");
      }
    } else if (isError) {
      message.error();
    }
  }, [isSuccess, isError]);

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    if (validateForm()) {
      mutation.mutate({
        name,
        email,
        password,
        confirmPassword,
        phone,
      });
    }
  };

  return (
    <>
      <div className="login-register-area mt-no-text">
        <div className="container container-default-2 custom-area">
          <div className="row">
            <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-custom">
              <div className="login-register-wrapper">
                <div className="section-content text-center mb-5">
                  <h2 className="title-4 mb-2">Create Account</h2>
                  <p className="desc-content">
                    Please Register using account detail bellow.
                  </p>
                </div>
                <form method="post" onSubmit={handleSubmitRegister}>
                  <div className="single-input-item mb-3">
                    <input
                      type="text"
                      placeholder="User Name"
                      name="name"
                      value={name}
                      maxLength="17" // Limit to 20 characters for name
                      onChange={handleInputChange}
                    />
                    {errors.name && (
                      <p
                        style={{ color: "red", fontSize: "12px" }}
                        className="error"
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="single-input-item mb-3">
                    <input
                      type="email"
                      placeholder="Email"
                      name="emailOrname"
                      value={email}
                      maxLength="30" // Limit to 100 characters for email
                      onChange={handleInputChange}
                    />
                    {errors.email && (
                      <p
                        style={{ color: "red", fontSize: "12px" }}
                        className="error"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="single-input-item mb-3">
                    <input
                      type="password"
                      placeholder="Enter your Password"
                      name="password"
                      value={password}
                      maxLength="20" // Limit to 20 characters for password
                      onChange={handleInputChange}
                    />
                    {errors.password && (
                      <p
                        style={{ color: "red", fontSize: "12px" }}
                        className="error"
                      >
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div className="single-input-item mb-3">
                    <input
                      type="password"
                      placeholder="Enter your Confirm Password"
                      name="confirmPassword"
                      value={confirmPassword}
                      maxLength="20" // Limit to 20 characters for confirm password
                      onChange={handleInputChange}
                    />
                    {errors.confirmPassword && (
                      <p
                        style={{ color: "red", fontSize: "12px" }}
                        className="error"
                      >
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>

                  <div className="single-input-item mb-3">
                    <input
                      type="number"
                      placeholder="Enter your Phone"
                      name="phone"
                      value={phone}
                      maxLength="15" // Limit phone number to 15 digits
                      onChange={handleInputChange}
                    />
                    {errors.phone && (
                      <p
                        style={{ color: "red", fontSize: "12px" }}
                        className="error"
                      >
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div className="single-input-item mb-3 d-flex justify-content-between">
                    {data?.status === "Error" && <span>{data?.message}</span>}
                    <Loading isLoading={mutation.isLoading}>
                      <button
                        className="btn flosun-button secondary-btn theme-color rounded-0"
                        type="submit"
                       
                      >
                        Register
                      </button>
                    </Loading>
                    <NavLink
                      to="/login"
                      className="btn flosun-button secondary-btn theme-color rounded-0"
                    >
                      Login
                    </NavLink>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
