import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import * as UserServices from "../services/UserService";
import { useMutationHooks } from "../hooks/useMutationHooks";
import Loading from "../Component/LoadingComponent/Loading";

import * as message from '../Component/MessageComponent/Message';
import { jwtDecode } from "jwt-decode";
import {useDispatch} from 'react-redux'
import { updateUser } from "../redux/slider/userSlide";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const  location = useLocation()
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!email) {
      isValid = false;
      formErrors["email"] = "Vạn lòng nhập email";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      isValid = false;
      formErrors["email"] = "Email không hợp lệ";
    }

    if (!password) {
      isValid = false;
      formErrors["password"] = "Vui lòng nhập mật khẩu.";
    } else if (password.length < 6) {
      isValid = false;
      formErrors["password"] = "Mật khẩu phải trên 6 ksy tự";
    }
    setErrors(formErrors);
    return isValid;
  };

  const mutation = useMutationHooks((data) => UserServices.loginUser(data));

  const { data , isError, isSuccess } = mutation;
  //khi người dùng đăng nhập thành công
  useEffect(()=>{
    //lấy dữ liệu từu http để lưu trữ và quay lại trang cữ khi cso yêu cầu đăng nhập
    if (isSuccess) {
      message.success("Đăng nhập thành công");
      if(location?.state){
        navigate(location?.state)
      }else{
        navigate('/')
      }
      if (data?.status === "Error") {
        message.error("Đăng nhập thất bại");
      } else {
        message.success();
        if (data?.access_token) {
          localStorage.setItem('access_token', JSON.stringify(data?.access_token));
          const decode = jwtDecode(data?.access_token);
          if (decode?.id) {
            handleGetDetailsUser(decode?.id, data?.access_token);
          }
        } else {
          message.error();
        }
      }
    } else if (isError) {
      message.error();
    }
   }
   ,[isSuccess,isError])
   
   const handleGetDetailsUser = async(id, token)=>{
    const res = await UserServices.getDetaisUser(id, token)
    dispatch(updateUser({...res?.data, access_token: token}))
   }
   // lấy dữ liệu
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "emailOrUsername") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
    setIsFormValid(email && password); // Update form validity based on input values
  };

  const handleSubmitRegisterLoggin = (e) => {
    e.preventDefault();
    if (validateForm()) {
      mutation.mutate({
        email,
        password,
      });
    } else {
      console.log("Form has errors.");
    }
  };

  return (
    <>
      <div className="login-register-area mt-no-text">
        <div className="container custom-area">
         
          <div className="row">
            <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-custom">
              <div className="login-register-wrapper">
                <div className="section-content text-center mb-5">
                  <h2 className="title-4 mb-2">Login</h2>
                  <p className="desc-content">
                    Please login using account detail bellow.
                  </p>
                </div>
                <form type="post" onSubmit={handleSubmitRegisterLoggin}>
                  <div className="single-input-item mb-3">
                    <input
                  
                      type="email"
                      placeholder="Email or Username"
                      name="emailOrUsername"
                      value={email}
                      onChange={handleInputChange}
                    />
                    {errors.email && <p className="error" style={{color: "red", fontSize: "12px" }}>{errors.email}</p>}
                  </div>
                  <div className="single-input-item mb-3">
                    <input
                      type="password"
                      placeholder="Enter your Password"
                      name="password"
                      value={password}
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
                    <div className="login-reg-form-meta d-flex align-items-center justify-content-between">
                      <div className="remember-meta mb-3">
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="rememberMe"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="rememberMe"
                          >
                            Remember Me
                          </label>
                        </div>
                      </div>
                      <a className="forget-pwd mb-3">Forget Password?</a>
                    </div>
                  </div>
                  {/* tạo dòng hien thi loi */}
                  {data?.status === "Error" && <span>{data?.message}</span>}  
                   <div className="single-input-item mb-3 d-flex justify-content-start">
                  <Loading isLoading={false}>
                      <button
                        className="btn flosun-button secondary-btn theme-color rounded-0"
                        type="submit"
                      
                      >
                        Login
                      </button>
                  </Loading>
                    </div>
                  <div className="single-input-item">
                    <NavLink to="/register" className="nav__link">
                      Create Account
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
}

export default Login;
