import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Profiles = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const avatar = user?.avatar;

  const handleUpdataProfile = () => {
    navigate("/profile/updata-profile");
  };

  return (
    <>
      <div className="breadcrumbs-area position-relative">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <div className="breadcrumb-content position-relative section-content">
                <h3 className="title-3">My Account</h3>
                <ul>
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>My Account</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-account-wrapper mt-no-text">
        <div className="container container-default-2 custom-area">
          <div className="row">
            <div className="col-lg-12 col-custom">
              <div className="myaccount-page-wrapper">
                <div className="row">
                  <div className="col-lg-3 col-md-4 col-custom">
                    <div
                      className="myaccount-tab-menu nav"
                      role="tablist"
                      style={{ display: "contents", marginBottom: "5px" }}
                    >
                      <a
                        href="#account-info"
                        className="active"
                        data-bs-toggle="tab"
                      >
                        <i className="fa fa-user"></i> Account Details
                      </a>
                      <a href="#dashboad" data-bs-toggle="tab">
                        <i className="fa fa-dashboard"></i>
                        Dashboard
                      </a>
                      <a href="#orders" data-bs-toggle="tab">
                        <i className="fa fa-cart-arrow-down"></i> Orders
                      </a>
                      <a href="#payment-method" data-bs-toggle="tab">
                        <i className="fa fa-credit-card"></i> Payment Method
                      </a>
                      <a href="login.html">
                        <i className="fa fa-sign-out"></i> Logout
                      </a>
                    </div>
                  </div>

                  <div className="col-lg-9 col-md-8 col-custom">
                    <div className="tab-content" id="myaccountContent">
                      <div
                        className="tab-pane fade show"
                        id="dashboad"
                        role="tabpanel"
                      >
                        <div className="myaccount-content">
                          <h3>Dashboard</h3>
                          <div className="welcome">
                            <p>
                              Hello, <strong>Alex Aya</strong> (If Not{" "}
                              <strong>Aya !</strong>
                              <a href="login-register.html" className="logout">
                                {" "}
                                Logout
                              </a>
                              )
                            </p>
                          </div>
                          <p className="mb-0">
                            From your account dashboard, you can easily check &
                            view your recent orders, manage your shipping and
                            billing addresses, and edit your password and account
                            details.
                          </p>
                        </div>
                      </div>

                      <div
                        className="tab-pane fade"
                        id="orders"
                        role="tabpanel"
                      >
                        <div className="myaccount-content">
                          <h3>Orders</h3>
                          <div className="myaccount-table table-responsive text-center">
                            <table className="table table-bordered">
                              <thead className="thead-light">
                                <tr>
                                  <th>Order</th>
                                  <th>Date</th>
                                  <th>Status</th>
                                  <th>Total</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>1</td>
                                  <td>Aug 22, 2022</td>
                                  <td>Pending</td>
                                  <td>$3000</td>
                                  <td>
                                    <a
                                      href="cart.html"
                                      className="btn flosun-button secondary-btn theme-color rounded-0"
                                    >
                                      View
                                    </a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>2</td>
                                  <td>July 22, 2022</td>
                                  <td>Approved</td>
                                  <td>$200</td>
                                  <td>
                                    <a
                                      href="cart.html"
                                      className="btn flosun-button secondary-btn theme-color  rounded-0"
                                    >
                                      View
                                    </a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>3</td>
                                  <td>June 12, 2022</td>
                                  <td>On Hold</td>
                                  <td>$990</td>
                                  <td>
                                    <a
                                      href="cart.html"
                                      className="btn flosun-button secondary-btn theme-color  rounded-0"
                                    >
                                      View
                                    </a>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>

                      <div
                        className="tab-pane fade"
                        id="payment-method"
                        role="tabpanel"
                      >
                        <div className="myaccount-content">
                          <h3>Payment Method</h3>
                          <p className="saved-message">
                            You can't save your payment method yet.
                          </p>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade active show"
                        id="account-info"
                        role="tabpanel"
                      >
                        <div className="myaccount-content">
                          <h3 className="text-center mb-4">Account Details</h3>
                          <div className="row">
                            <div className="col-md-4 user-account-avatar text-center mb-4">
                              <div className="avatar-img" style={{ backgroundColor: "red" }}>
                                {avatar ? (
                                  <img
                                    src={`data:image/png;base64,${avatar}`}
                                    alt="User Avatar"
                                    className="img-fluid rounded-circle"
                                    style={{ width: "100%", height: "100%" }}
                                  />
                                ) : (
                                  <img
                                    src={require("../../assets1/img/avatar/avatar-user-default.jpg")}
                                    alt="Default Avatar"
                                    className="img-fluid rounded-circle"
                                    style={{ width: "100%", height: "100%" }}
                                  />
                                )}
                              </div>
                            </div>
                            <div className="col-md-8 account-details-form">
                              <form>
                                <div className="single-input-item mb-3">
                                  <label htmlFor="name" className="form-label">
                                    Name:
                                  </label>
                                  <p type="text" id="name" className="form-control">
                                    {user?.name || "Vui lòng cập nhập dữ liệu"}
                                  </p>
                                </div>
                                <div className="single-input-item mb-3">
                                  <label htmlFor="phone" className="form-label">
                                    Phone:
                                  </label>
                                  <p type="text" id="phone" className="form-control">
                                    {user?.phone || "Vui lòng cập nhập dữ liệu"}
                                  </p>
                                </div>
                                <div className="single-input-item mb-3">
                                  <label htmlFor="address" className="form-label">
                                    Address:
                                  </label>
                                  <p type="text" id="address" className="form-control">
                                    {user?.address || "Vui lòng cập nhập dữ liệu"}
                                  </p>
                                </div>
                                <div className="single-input-item mb-3">
                                  <label htmlFor="email" className="form-label">
                                    Email:
                                  </label>
                                  <p type="text" id="email" className="form-control">
                                    {user?.email || "Vui lòng cập nhập dữ liệu"}
                                  </p>
                                </div>
                                <div className="single-input-item single-item-button text-center mt-4">
                                  <button
                                    className="btn flosun-button secondary-btn theme-color rounded-0"
                                    style={{ width: "max-content" }}
                                    onClick={handleUpdataProfile}
                                  >
                                    Edit informations
                                  </button>
                                </div>
                              </form>
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

export default Profiles;
