import React from "react";

const Footer = ()=>{
    return(
        <div>
             <footer className="footer section">
            <div className="footer__container container grid">
                <div className="footer__content">
                    <a href="#" className="footer__logo">
                        <i className="ri-leaf-line footer__logo-icon"></i> Plantex
                    </a>

                    <h3 className="footer__title">
                    Đăng ký nhận bản tin của chúng tôi <br/> để luôn cập nhật
                    </h3>

                    <div className="footer__subscribe">
                        <input type="email" placeholder="Enter your email" className="footer__input"/>

                        <button className="button button--flex footer__button">
                        Đặt mua
                            <i className="ri-arrow-right-up-line button__icon"></i>
                        </button>
                    </div>
                </div>

                <div className="footer__content">
                    <h3 className="footer__title">Địa chỉ của chúng tôi</h3>

                    <ul className="footer__data">
                        <li className="footer__information">1234 - TP. Hồ Chí Minh</li>
                        <li className="footer__information">Việt Nam - 43210</li>
                        <li className="footer__information">123-456-789</li>
                    </ul>
                </div>

                <div className="footer__content">
                    <h3 className="footer__title">Liên hệ chúng tô</h3>

                    <ul className="footer__data">
                        <li className="footer__information">+999 888 777</li>
                        
                        <div className="footer__social">
                            <a href="https://www.facebook.com/" className="footer__social-link">
                                <i className="ri-facebook-fill"></i>
                            </a>
                            <a href="https://www.instagram.com/" className="footer__social-link">
                                <i className="ri-instagram-line"></i>
                            </a>
                            <a href="https://twitter.com/" className="footer__social-link">
                                <i className="ri-twitter-fill"></i>
                            </a>
                        </div>
                    </ul>
                </div>

                <div className="footer__content">
                    <h3 className="footer__title">
                    Chúng tôi chấp nhận tất cả các thẻ tín dụng
                    </h3>

                    <div className="footer__cards">
                        <img src={require('../assets1/img/card1.png')} alt="" className="footer__card"/>
                        <img src={require('../assets1/img/card2.png')} alt="" className="footer__card"/>
                        <img src={require('../assets1/img/card3.png')} alt="" className="footer__card"/>
                        <img src={require('../assets1/img/card4.png')} alt="" className="footer__card"/>
                    </div>
                </div>
            </div>
        </footer>

        </div>
    )
}
export default Footer;