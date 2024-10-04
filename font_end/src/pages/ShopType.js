import CardComponent from "../Component/CardComponent/CardComponent";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import "../assets/css/vendor/bootstrap.min.css";
import "../assets/css/vendor/font.awesome.min.css";
import "../assets/css/vendor/linearicons.min.css";
import "../assets/css/plugins/swiper-bundle.min.css";
import "../assets/css/plugins/jquery-ui.min.css";
import "../assets/css/plugins/nice-select.min.css";
import "../assets/css/plugins/magnific-popup.css";
import "../assets/css/style.css";

import NavComponent from "../Component/NavigationComponent/NavComponent";
import { useQuery } from "@tanstack/react-query";
import * as ProductServices from "../services/ProductService";
import Loading from "../Component/LoadingComponent/Loading";
import Header from "../Component/Header";
import { Button, Flex } from "antd";
import { useLocation } from "react-router-dom";

const ShopType = () => {
    const [stateProduct,setStateProduct] = useState([])
    const {state} = useLocation()

    console.log("state",state)
    const fectchProductType = async(type)=>{
        const res = await ProductServices.getTypeProduct(state);
        setStateProduct(res?.data)
        console.log("res?.data",res?.data)
        return res?.data
    }

    useEffect((state)=>{
            fectchProductType(state)
    },[state])
    console.log("stateProduct",stateProduct)
  return (
  <>
   <Header/>
      <div>
        <header className="main-header-area">
          <aside className="off-canvas-wrapper" id="mobileMenu">
            <div className="off-canvas-overlay"></div>
            <div className="off-canvas-inner-content">
              <div className="btn-close-off-canvas">
                <i className="fa fa-times"></i>
              </div>
              <div className="off-canvas-inner">
                <div className="search-box-offcanvas">
                  <form>
                    <input type="text" placeholder="Search product..." />
                    <button className="search-btn">
                      <i className="fa fa-search"></i>
                    </button>
                  </form>
                </div>
                <div className="mobile-navigation">
                  <nav>
                    <ul className="mobile-menu">
                      <li className="menu-item-has-children">
                        <a href="#">Home</a>
                        <ul className="dropdown">
                          <li>
                            <a href="index.html">Home Page 1</a>
                          </li>
                          <li>
                            <a href="index-2.html">Home Page 2</a>
                          </li>
                          <li>
                            <a href="index-3.html">Home Page 3</a>
                          </li>
                          <li>
                            <a href="index-4.html">Home Page 4</a>
                          </li>
                        </ul>
                      </li>
                      <li className="menu-item-has-children">
                        <a href="#">Shop</a>
                        <ul className="megamenu dropdown">
                          <li className="mega-title has-children">
                            <a href="#">Shop Layouts</a>
                            <ul className="dropdown">
                              <li>
                                <a href="shop.html">Shop Left Sidebar</a>
                              </li>
                              <li>
                                <a href="shop-right-sidebar.html">
                                  Shop Right Sidebar
                                </a>
                              </li>
                              <li>
                                <a href="shop-list-left.html">
                                  Shop List Left Sidebar
                                </a>
                              </li>
                              <li>
                                <a href="shop-list-right.html">
                                  Shop List Right Sidebar
                                </a>
                              </li>
                              <li>
                                <a href="shop-fullwidth.html">
                                  Shop Full Width
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li className="mega-title has-children">
                            {/* <a href="#">Product Details</a> */}
                            <ul className="dropdown">
                              <li>
                                <a href="product-details.html">
                                  Single Product Details
                                </a>
                              </li>
                              <li>
                                <a href="variable-product-details.html">
                                  Variable Product Details
                                </a>
                              </li>
                              <li>
                                <a href="external-product-details.html">
                                  External Product Details
                                </a>
                              </li>
                              <li>
                                <a href="gallery-product-details.html">
                                  Gallery Product Details
                                </a>
                              </li>
                              <li>
                                <a href="countdown-product-details.html">
                                  Countdown Product Details
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li className="mega-title has-children">
                            <a href="#">Others</a>
                            <ul className="dropdown">
                              <li>
                                <a href="error404.html">Error 404</a>
                              </li>
                              <li>
                                <a href="compare.html">Compare Page</a>
                              </li>
                              <li>
                                <a href="cart.html">Cart Page</a>
                              </li>
                              <li>
                                <a href="checkout.html">Checkout Page</a>
                              </li>
                              <li>
                                <a href="wishlist.html">Wish List Page</a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                      <li className="menu-item-has-children ">
                        <a href="#">Blog</a>
                        <ul className="dropdown">
                          <li>
                            <a href="blog.html">Blog Left Sidebar</a>
                          </li>
                          <li>
                            <a href="blog-list-right-sidebar.html">
                              Blog List Right Sidebar
                            </a>
                          </li>
                          <li>
                            <a href="blog-list-fullwidth.html">
                              Blog List Fullwidth
                            </a>
                          </li>
                          <li>
                            <a href="blog-grid.html">Blog Grid Page</a>
                          </li>
                          <li>
                            <a href="blog-grid-right-sidebar.html">
                              Blog Grid Right Sidebar
                            </a>
                          </li>
                          <li>
                            <a href="blog-grid-fullwidth.html">
                              Blog Grid Fullwidth
                            </a>
                          </li>
                          <li>
                            <a href="blog-details-sidebar.html">
                              Blog Details Sidebar Page
                            </a>
                          </li>
                          <li>
                            <a href="blog-details-fullwidth.html">
                              Blog Details Fullwidth Page
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li className="menu-item-has-children ">
                        <a href="#">Pages</a>
                        <ul className="dropdown">
                          <li>
                            <a href="frequently-questions.html">FAQ</a>
                          </li>
                          <li>
                            <a href="my-account.html">My Account</a>
                          </li>
                          <li>
                            <a href="login-register.html">
                              login &amp; register
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a href="about-us.html">About Us</a>
                      </li>
                      <li>
                        <a href="contact-us.html">Contact</a>
                      </li>
                    </ul>
                  </nav>
                </div>
                <div className="offcanvas-widget-area">
                  <div className="switcher">
                    <div className="language">
                      <span className="switcher-title">Language: </span>
                      <div className="switcher-menu">
                        <ul>
                          <li>
                            <a href="#">English</a>
                            <ul className="switcher-dropdown">
                              <li>
                                <a href="#">German</a>
                              </li>
                              <li>
                                <a href="#">French</a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="currency">
                      <span className="switcher-title">Currency: </span>
                      <div className="switcher-menu">
                        <ul>
                          <li>
                            <a href="#">$ USD</a>
                            <ul className="switcher-dropdown">
                              <li>
                                <a href="#">€ EUR</a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="top-info-wrap text-left text-black">
                    <ul className="address-info">
                      <li>
                        <i className="fa fa-phone"></i>
                        <a href="info%40yourdomain.html">(1245) 2456 012</a>
                      </li>
                      <li>
                        <i className="fa fa-envelope"></i>
                        <a href="info%40yourdomain.html">info@yourdomain.com</a>
                      </li>
                    </ul>
                    <div className="widget-social">
                      <a
                        className="facebook-color-bg"
                        title="Facebook-f"
                        href="#"
                      >
                        <i className="fa fa-facebook-f"></i>
                      </a>
                      <a className="twitter-color-bg" title="Twitter" href="#">
                        <i className="fa fa-twitter"></i>
                      </a>
                      <a
                        className="linkedin-color-bg"
                        title="Linkedin"
                        href="#"
                      >
                        <i className="fa fa-linkedin"></i>
                      </a>
                      <a className="youtube-color-bg" title="Youtube" href="#">
                        <i className="fa fa-youtube"></i>
                      </a>
                      <a className="vimeo-color-bg" title="Vimeo" href="#">
                        <i className="fa fa-vimeo"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
          <aside className="off-canvas-menu-wrapper" id="sideMenu">
            <div className="off-canvas-overlay"></div>
            <div className="off-canvas-inner-content">
              <div className="off-canvas-inner">
                <div className="btn-close-off-canvas">
                  <i className="fa fa-times"></i>
                </div>
                <div className="offcanvas-widget-area">
                  <ul className="menu-top-menu">
                    <li>
                      <a href="about-us.html">About Us</a>
                    </li>
                  </ul>
                  <p className="desc-content">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. <br /> Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. <br /> Duis aute irure dolor in reprehenderit in
                    voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                  <div className="switcher">
                    <div className="language">
                      <span className="switcher-title">Language: </span>
                      <div className="switcher-menu">
                        <ul>
                          <li>
                            <a href="#">English</a>
                            <ul className="switcher-dropdown">
                              <li>
                                <a href="#">German</a>
                              </li>
                              <li>
                                <a href="#">French</a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="currency">
                      <span className="switcher-title">Currency: </span>
                      <div className="switcher-menu">
                        <ul>
                          <li>
                            <a href="#">$ USD</a>
                            <ul className="switcher-dropdown">
                              <li>
                                <a href="#">€ EUR</a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="top-info-wrap text-left text-black">
                    <ul className="address-info">
                      <li>
                        <i className="fa fa-phone"></i>
                        <a href="info%40yourdomain.html">(1245) 2456 012</a>
                      </li>
                      <li>
                        <i className="fa fa-envelope"></i>
                        <a href="info%40yourdomain.html">info@yourdomain.com</a>
                      </li>
                    </ul>
                    <div className="widget-social">
                      <a
                        className="facebook-color-bg"
                        title="Facebook-f"
                        href="#"
                      >
                        <i className="fa fa-facebook-f"></i>
                      </a>
                      <a className="twitter-color-bg" title="Twitter" href="#">
                        <i className="fa fa-twitter"></i>
                      </a>
                      <a
                        className="linkedin-color-bg"
                        title="Linkedin"
                        href="#"
                      >
                        <i className="fa fa-linkedin"></i>
                      </a>
                      <a className="youtube-color-bg" title="Youtube" href="#">
                        <i className="fa fa-youtube"></i>
                      </a>
                      <a className="vimeo-color-bg" title="Vimeo" href="#">
                        <i className="fa fa-vimeo"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </header>
        <div className="breadcrumbs-area position-relative">
          <div className="container-xxl">
            <div className="row">
              <div className="col-12 text-center">
                <div className="breadcrumb-content position-relative section-content">
                  <h3 className="title-3">TrucThanh</h3>
                  <ul>
                    <li>
                      <a href="index.html">Home</a>
                    </li>
                    <li>Shop</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="shop-main-area">
          <div className="container-xxl container-default custom-area">
            <div className="row flex-row-reverse">
              <div className="col-lg-9 col-12 col-custom widget-mt">
                <Loading isLoading={false}>
                  <div className="shop_toolbar_wrapper mb-30">
                    <div className="shop_toolbar_btn">
                      <button
                        data-role="grid_3"
                        type="button"
                        className="active btn-grid-3"
                        title="Grid"
                      >
                        <i className="fa fa-th"></i>
                      </button>
                      <button
                        data-role="grid_list"
                        type="button"
                        className="btn-list"
                        title="List"
                      >
                        <i className="fa fa-th-list"></i>
                      </button>
                    </div>
                    <div className="shop-select">
                      <form className="d-flex flex-column w-100" action="#">
                        <div className="form-group">
                          <select className="form-control nice-select w-100">
                            <option selected value="1">
                              Alphabetically, A-Z
                            </option>
                            <option value="2">Sort by popularity</option>
                            <option value="3">Sort by newness</option>
                            <option value="4">
                              Sort by price: low to high
                            </option>
                            <option value="5">
                              Sort by price: high to low
                            </option>
                            <option value="6">Product Name: Z</option>
                          </select>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="row shop_wrapper grid_3">
                    {stateProduct?.map((product) => {
                      console.log("product", product);
                      return (
                        <CardComponent
                          key={product._id}
                          countInStock={product.countInStock}
                          createdAt={product.createdAt}
                          description={product.description}
                          image={product.image}
                          name={product.name}
                          price={product.price}
                          rating={product.rating}
                          type={product.type}
                          selled={product.selled}
                          discount={product.discount}
                          id = {product._id}
                        />
                      );
                    })}
                  </div>
                  <Flex justify="center" align="center">
                    <Button disabled={stateProduct?.totalProduct === stateProduct?.length} className="ant-btn-primary" style={{marginBottom:"50px",padding:"20px 40px", fontWeight:"500"}}>
                    {/* onClick={()=>setLimit((prev) => prev + 6)} */}
                      Xem thêm
                    </Button>
                  </Flex>
                  
                </Loading>
              </div>

              {/* hiển cấc danh sach stheer loại */}
              <NavComponent />
            </div>
          </div>
        </div>
        <div
          className="modal flosun-modal fade"
          id="exampleModalCenter"
          tabindex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <button
                type="button"
                className="close close-button"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span className="close-icon" aria-hidden="true">
                  x
                </span>
              </button>
              <div className="modal-body">
                <div className="container-fluid custom-area">
                  <div className="row">
                    <div className="col-md-6 col-custom">
                      <div className="modal-product-img">
                        <a className="w-100" href="#">
                          <img
                            className="w-100"
                            src="assets/images/product/large-size/1.jpg"
                            alt="Product"
                          />
                        </a>
                      </div>
                    </div>
                    <div className="col-md-6 col-custom">
                      <div className="modal-product">
                        <div className="product-content">
                          <div className="product-title">
                            <h4 className="title">Product dummy name</h4>
                          </div>
                          <div className="price-box">
                            <span className="regular-price ">$80.00</span>
                            <span className="old-price">
                              <del>$90.00</del>
                            </span>
                          </div>
                          <div className="product-rating">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star-o"></i>
                            <i className="fa fa-star-o"></i>
                            <span>1 Review</span>
                          </div>
                          <p className="desc-content">
                            we denounce with righteous indignation and dislike
                            men who are so beguiled and demoralized by the
                            charms of pleasure of the moment, so blinded by
                            desire, that they cannot foresee the pain and
                            trouble that are bound to ensue; and equal blame
                            bel...
                          </p>
                          <form className="d-flex flex-column w-100" action="#">
                            <div className="form-group">
                              <select className="form-control nice-select w-100">
                                <option>S</option>
                                <option>M</option>
                                <option>L</option>
                                <option>XL</option>
                                <option>XXL</option>
                              </select>
                            </div>
                          </form>
                          <div className="quantity-with-btn">
                            <div className="quantity">
                              <div className="cart-plus-minus">
                                <input
                                  className="cart-plus-minus-box"
                                  value="0"
                                  type="text"
                                />
                                <div className="dec qtybutton">-</div>
                                <div className="inc qtybutton">+</div>
                                <div className="dec qtybutton">
                                  <i className="fa fa-minus"></i>
                                </div>
                                <div className="inc qtybutton">
                                  <i className="fa fa-plus"></i>
                                </div>
                              </div>
                            </div>
                            <div className="add-to_btn">
                              <a
                                className="btn product-cart button-icon flosun-button dark-btn"
                                href="cart.html"
                              >
                                Add to cart
                              </a>
                              <a
                                className="btn flosun-button secondary-btn rounded-0"
                                href="wishlist.html"
                              >
                                Add to wishlist
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </>
   
  );
};

export default ShopType;
