import React, { useEffect, useState } from "react";
// icon login vs logout
import { NavLink, Link, useNavigate } from "react-router-dom";

import * as UserServices from "../services/UserService";
import { FaShoppingBag } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Button, Popover } from "antd";

import { useDispatch } from "react-redux";
import { resetUser } from "../redux/slider/userSlide";
import Loading from "./LoadingComponent/Loading";

const Header = () => {
  const user = useSelector((state) => state.user);
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  //loading tên header
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);

  const order = useSelector((state)=> state.order)

  const navigate = useNavigate();
  const dispatch = useDispatch();
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      navMenu.class.add("show-menu");
    });
  }

  //const sections = document.querySelectorAll("section[id]");
  const hadleProfilesUser = () => {
    navigate("/profile");
  };

  const handleLogout = async () => {
    setLoading(true);
    await UserServices.logoutUser();
    dispatch(resetUser());
    localStorage.setItem("access_token", JSON.stringify());
    setLoading(false);
    navigate("/");
  };
  // const handleOnClickLink= (link)=>{
  //   navigate(`${link}`)
  // }
  useEffect(() => {
    setLoading(true);
    setUserName(user?.name);
    setLoading(false);
  }, [user?.name]);

  const text = <span>Thông tin người dùng</span>;
  const content = (
    <div>
      <a
        className="nav__btns"
        onClick={hadleProfilesUser}
        style={{ cursor: "pointer", fontSize: "18px" }}
      >
        Thông tin
      </a>{" "}
      <br />
      <a
        className="nav__btns"
        style={{ cursor: "pointer", fontSize: "18px" }}
        onClick={handleLogout}
      >
        Đăng xuất
      </a>
      {user.isAdmin ? (
        <Link
          className="nav__btns"
          style={{ display: "block", cursor: "pointer", fontSize: "18px" }}
          to={"/system/admin"}
        >
          Quản lý Trang
        </Link>
      ) : (
        <></>
      )}
    </div>
  );
  const truncateName = (name, maxLength) => {
    if (name?.length > maxLength) {
      return name.slice(0, maxLength) + "...";
    }
    return name;
  };
  return (
    <header className="header" id="header">
      <nav className="nav container">
        <a href="#" className="nav__logo">
          <i className="ri-leaf-line nav__logo-icon"></i> TrucThanh
        </a>
        <div className="nav__menu" id="nav-menu">
          <ul className="nav__list">
            <li className="nav__item">
              <NavLink to="/" className="nav__link">
                Home
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/shop" className="nav__link">
                Shop
              </NavLink>
            </li>
            <li className="nav__item">
              <a href="#about" className="nav__link">
                About
              </a>
            </li>
            {/* <li className="nav__item">
              <a href="#products" className="nav__link">
                Products
              </a>
            </li> */}
            <li className="nav__item">
              <a href="#faqs" className="nav__link">
                FAQs
              </a>
            </li>
            <li className="nav__item">
              <a href="#contact" className="nav__link">
                Contact Us
              </a>
            </li>
          </ul>

          <div className="nav__close" id="nav-close">
            <i className="ri-close-line"></i>
          </div>
        </div>
       
        <div className="nav__btns">
          <div id="theme-button" style={{ display: "flex" }}>
            <NavLink to="/order" style={{ display: "flex", alignItems: "center" }}>
                <FaShoppingBag/>
                <div className="cart-item_count" style={{ display: "flex", alignItems: "center", justifyContent:"center" }}>
                  <span>{order?.orderItems?.length}</span>
                </div>
            </NavLink>
              {user?.access_token ? (
              <>
                <Loading isLoading={loading}>
                  <div
                    style={{
                      marginInlineStart: 10,
                      clear: "both",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <Popover className="info-user" placement="bottom" title={text} content={content} style={{display:"flex"}}>
                      <p style={{fontSize:"16px",fontWeight:"500",marginRight:"10px"}}>{truncateName(user?.name,10)}</p>
                      
                      <Button
                        id="theme-button"
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          padding: 0,
                          border: "1px solid #fff",
                          display:"flex",
                          alignItems:"center"
                        }}
                      >
                        
                        <img
                          src={`data:image/png;base64,${user?.avatar}`}
                          alt="User Avatar"
                          className="img-fluid rounded-circle"
                        />
                      </Button>
                    </Popover>
                  </div>
                </Loading>
              </>
            ) : (
              <NavLink to="/login">
                <FaRegUserCircle />
              </NavLink>
            )}
          </div>

          <div className="nav__toggle" id="nav-toggle">
            <i className="ri-menu-line"></i>
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Header;
