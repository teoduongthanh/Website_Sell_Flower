import React, {  useState } from 'react';
import {  useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import * as ProductServices from "../services/ProductService"
import { useQuery } from '@tanstack/react-query';
import ComponentRating from './CardComponent/ComponentRating';
import { useDispatch, useSelector } from 'react-redux';
import { addOrderProduct } from '../redux/slider/orderSlide';
import { convertPrice } from '../utils';

const Detailproduct = () => {
    const parasm = useParams()
    const user = useSelector((state) => state.user);
    const location = useLocation()
    const idProduct = parasm._id
    const dispatch = useDispatch()
    console.log("idProduct detail",idProduct)
    const [value, setValue] = useState(1);
    const increment = () => {
        setValue(value + 1);
    };
    console.log("value quality",value)
    const decrement = () => {
        if (value > 0) {
        setValue(value - 1);
        }
    };

    const handleChange = (event) => {
        const newValue = parseInt(event.target.value, 10);
        if (!isNaN(newValue)) {
        setValue(newValue);
        }
    };

   
    const fetchGetProductsDetail = async (id) => {
        const res = await ProductServices.getDetailsProduct(id);
        return res;  
    };

    // Sử dụng useQuery để lấy chi tiết sản phẩm, chỉ kích hoạt khi có id
    const { isLoading, data: productDetails, error } = useQuery(
        ["detail-product", idProduct],  // Tạo cache key dựa trên id sản phẩm
        () => fetchGetProductsDetail(idProduct),  // Truyền hàm callback mà không gọi trực tiếp
        { enabled: !!idProduct }  // Chỉ kích hoạt khi idProduct có giá trị
    );
    const productDetail = productDetails?.data[0];


    const navigate = useNavigate()
    const handleAddOrderProduct =()=>{
        console.log("user.id",user.id)
        if(!user?.id){
            navigate('/login',{state: location?.pathname})
        }else{
            // {
            //     name: { type: String, required: true },
            //     amount: { type: Number, required: true},
            //     price: { type: Number, required: true },
            //     image: { type: String, required: true },
            //     product:{
            //         type: mongoose.Schema.Types.ObjectId,
            //         ref: 'Product',
            //         required:true,
            //     },
            // },
            dispatch(addOrderProduct({
                orderItem: {
                    name: productDetail?.name,
                    amount: value,
                    price: productDetail?.price,
                    image: productDetail?.image,
                    product:productDetail?._id
                }
            }))
        }
    }
    return(
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
                                <input type="text" placeholder="Search product..."/>
                                <button className="search-btn"><i className="fa fa-search"></i></button>
                            </form>
                        </div>
                        <div className="mobile-navigation">

                            <nav>
                                <ul className="mobile-menu">
                                    <li className="menu-item-has-children"><a href="#">Home</a>
                                        <ul className="dropdown">
                                            <li><a href="index.html">Home Page 1</a></li>
                                            <li><a href="index-2.html">Home Page 2</a></li>
                                            <li><a href="index-3.html">Home Page 3</a></li>
                                            <li><a href="index-4.html">Home Page 4</a></li>
                                        </ul>
                                    </li>
                                    <li className="menu-item-has-children"><a href="#">Shop</a>
                                        <ul className="megamenu dropdown">
                                            <li className="mega-title has-children"><a href="#">Shop Layouts</a>
                                                <ul className="dropdown">
                                                    <li><a href="shop.html">Shop Left Sidebar</a></li>
                                                    <li><a href="shop-right-sidebar.html">Shop Right Sidebar</a></li>
                                                    <li><a href="shop-list-left.html">Shop List Left Sidebar</a></li>
                                                    <li><a href="shop-list-right.html">Shop List Right Sidebar</a></li>
                                                    <li><a href="shop-fullwidth.html">Shop Full Width</a></li>
                                                </ul>
                                            </li>
                                            <li className="mega-title has-children"><a href="#">Product Details</a>
                                                <ul className="dropdown">
                                                    <li><a href="product-details.html">Single Product Details</a></li>
                                                    <li><a href="variable-product-details.html">Variable Product Details</a></li>
                                                    <li><a href="external-product-details.html">External Product Details</a></li>
                                                    <li><a href="gallery-product-details.html">Gallery Product Details</a></li>
                                                    <li><a href="countdown-product-details.html">Countdown Product Details</a></li>
                                                </ul>
                                            </li>
                                            <li className="mega-title has-children"><a href="#">Others</a>
                                                <ul className="dropdown">
                                                    <li><a href="error404.html">Error 404</a></li>
                                                    <li><a href="compare.html">Compare Page</a></li>
                                                    <li><a href="cart.html">Cart Page</a></li>
                                                    <li><a href="checkout.html">Checkout Page</a></li>
                                                    <li><a href="wishlist.html">Wish List Page</a></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="menu-item-has-children "><a href="#">Blog</a>
                                        <ul className="dropdown">
                                            <li><a href="blog.html">Blog Left Sidebar</a></li>
                                            <li><a href="blog-list-right-sidebar.html">Blog List Right Sidebar</a></li>
                                            <li><a href="blog-list-fullwidth.html">Blog List Fullwidth</a></li>
                                            <li><a href="blog-grid.html">Blog Grid Page</a></li>
                                            <li><a href="blog-grid-right-sidebar.html">Blog Grid Right Sidebar</a></li>
                                            <li><a href="blog-grid-fullwidth.html">Blog Grid Fullwidth</a></li>
                                            <li><a href="blog-details-sidebar.html">Blog Details Sidebar Page</a></li>
                                            <li><a href="blog-details-fullwidth.html">Blog Details Fullwidth Page</a></li>
                                        </ul>
                                    </li>
                                    <li className="menu-item-has-children "><a href="#">Pages</a>
                                        <ul className="dropdown">
                                            <li><a href="frequently-questions.html">FAQ</a></li>
                                            <li><a href="my-account.html">My Account</a></li>
                                            <li><a href="login-register.html">login &amp; register</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="about-us.html">About Us</a></li>
                                    <li><a href="contact-us.html">Contact</a></li>
                                </ul>
                            </nav>
                        </div>
                        <div className="offcanvas-widget-area">
                            <div className="switcher">
                                <div className="language">
                                    <span className="switcher-title">Language: </span>
                                    <div className="switcher-menu">
                                        <ul>
                                            <li><a href="#">English</a>
                                                <ul className="switcher-dropdown">
                                                    <li><a href="#">German</a></li>
                                                    <li><a href="#">French</a></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="currency">
                                    <span className="switcher-title">Currency: </span>
                                    <div className="switcher-menu">
                                        <ul>
                                            <li><a href="#">$ USD</a>
                                                <ul className="switcher-dropdown">
                                                    <li><a href="#">€ EUR</a></li>
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
                                    <a className="facebook-color-bg" title="Facebook-f" href="#"><i className="fa fa-facebook-f"></i></a>
                                    <a className="twitter-color-bg" title="Twitter" href="#"><i className="fa fa-twitter"></i></a>
                                    <a className="linkedin-color-bg" title="Linkedin" href="#"><i className="fa fa-linkedin"></i></a>
                                    <a className="youtube-color-bg" title="Youtube" href="#"><i className="fa fa-youtube"></i></a>
                                    <a className="vimeo-color-bg" title="Vimeo" href="#"><i className="fa fa-vimeo"></i></a>
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
                                <li><a href="about-us.html">About Us</a></li>
                            </ul>
                            <p className="desc-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <br/> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. <br/> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            <div className="switcher">
                                <div className="language">
                                    <span className="switcher-title">Language: </span>
                                    <div className="switcher-menu">
                                        <ul>
                                            <li><a href="#">English</a>
                                                <ul className="switcher-dropdown">
                                                    <li><a href="#">German</a></li>
                                                    <li><a href="#">French</a></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="currency">
                                    <span className="switcher-title">Currency: </span>
                                    <div className="switcher-menu">
                                        <ul>
                                            <li><a href="#">$ USD</a>
                                                <ul className="switcher-dropdown">
                                                    <li><a href="#">€ EUR</a></li>
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
                                    <a className="facebook-color-bg" title="Facebook-f" href="#"><i className="fa fa-facebook-f"></i></a>
                                    <a className="twitter-color-bg" title="Twitter" href="#"><i className="fa fa-twitter"></i></a>
                                    <a className="linkedin-color-bg" title="Linkedin" href="#"><i className="fa fa-linkedin"></i></a>
                                    <a className="youtube-color-bg" title="Youtube" href="#"><i className="fa fa-youtube"></i></a>
                                    <a className="vimeo-color-bg" title="Vimeo" href="#"><i className="fa fa-vimeo"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </header>
        <div className="breadcrumbs-area position-relative">
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center">
                        <div className="breadcrumb-content position-relative section-content">
                            <h3 className="title-3">Product Details</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       
        <div className="single-product-main-area">
            <div className="container container-default custom-area">
                <div className="row">
                    <div className="col-lg-5 offset-lg-0 col-md-8 offset-md-2 col-custom">
                        <div className="product-details-img">
                            <div className="single-product-img swiper-container gallery-top popup-gallery">
                                <div className="swiper-wrapper">
                                    <div className="swiper-slide">
                                        <a className="w-100" >
                                            <img className="w-100"    
                                            src={`data:image/png;base64,${productDetail?.image}`}
                                            alt="Product image"/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7 col-custom">
                        <div className="product-summery position-relative">
                            <div className="product-head mb-3">
                                <h2 className="product-title">{productDetail?.name}</h2>
                            </div>
                            <div className="price-box mb-2">
                            <span >
                                    - {convertPrice(productDetail?.discount)}
                                </span>
                                <h2 className="regular-price">Còn lại: {convertPrice(productDetail?.price)} </h2>
                                
                            </div>
                            <div className="product-rating mb-3">
                            <ComponentRating rating={productDetail?.rating}/>
                            </div>
                            <div className="sku mb-3">
                                <span>Chủ đề: {productDetail?.type}</span>
                            </div>
                            <div className="sku mb-3">
                                <span>Số lượng: {productDetail?.countInStock}</span>
                            </div>
                            <p className="desc-content mb-5">Số lượng đã bán được: {productDetail?.selled}</p>
                            <div className="quantity-with_btn mb-5">
                                <div className="quantity">
                                    <div className="cart-plus-minus">
                                        <input className="cart-plus-minus-box" value={value} type="text"  onChange={handleChange}/>
                                        <div className="dec qtybutton" onClick={decrement}>-</div>
                                        <div className="inc qtybutton" onClick={increment}>+</div>
                                    </div>
                                </div>
                                <div className="add-to_cart" onClick={handleAddOrderProduct}>
                                    <a className="btn product-cart button-icon flosun-button dark-btn" >Add to cart</a>
                                </div>
                            </div>
                            <div className="social-share mb-4">
                                <span>Share :</span>
                                <a href="#"><i className="fa fa-facebook-square facebook-color"></i></a>
                                <a href="#"><i className="fa fa-twitter-square twitter-color"></i></a>
                                <a href="#"><i className="fa fa-linkedin-square linkedin-color"></i></a>
                                <a href="#"><i className="fa fa-pinterest-square pinterest-color"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-no-text">
                <div className="col-lg-12 col-custom">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active text-uppercase" id="home-tab" data-bs-toggle="tab" href="#connect-1" role="tab" aria-selected="true">Description</a>
                        </li>
                    </ul>
                    <div className="tab-content mb-text" id="myTabContent">
                        <div className="tab-pane fade show active" id="connect-1" role="tabpanel" aria-labelledby="home-tab">
                            <div className="desc-content">
                                <p className="mb-3">{productDetail?.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );  
}
export default Detailproduct;