import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseAmount,
  increaseAmount,
  removeOrderProduct,
} from "../../redux/slider/orderSlide";
import { convertPrice } from "../../utils";
import { Button, message, Modal } from "antd";
import ModalComponent from "../../Admin/Component/ModalComponent/ModalComponent";
import { useNavigate } from "react-router-dom";
import { useMutationHooks } from "../../hooks/useMutationHooks";
import * as OrderService from "../../services/OrderService";

const Cart = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { stateUserDetail, setSateuerDetail } = useState({});

  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const handleChangeAmount = (type, idProduct) => {
    const itemOrder = order?.orderItems?.find(
      (item) => item?.product === idProduct
    );

    if (type === "increment") {
      dispatch(increaseAmount({ idProduct }));
    } else if (type === "decrement") {
      if (itemOrder?.amount > 1) {
        dispatch(decreaseAmount({ idProduct }));
      }
    }
  };

  const handleDeleteOrder = (idProduct) => {
    dispatch(removeOrderProduct(idProduct));
  };

  const mutationAddOrder = useMutationHooks(async (data) => {
    const { token, ...rests } = data;
    const res = await OrderService.createOrder(token, rests);
  });

  const priceMemo = useMemo(() => {
    {
      const result = order?.orderItems.reduce((total, cur) => {
        return total + cur.price * cur.amount;
      }, 0);
      return result;
    }
  }, [order]);
  const diliveryPriceMemo = useMemo(() => {
    if (priceMemo > 0 && priceMemo <= 1000000) {
      return 20000;
    } else if (priceMemo > 1000000) {
      return 30000;
    }
  }, [order]);

  const priceTotalMemo = useMemo(() => {
    return Number(priceMemo + diliveryPriceMemo);
  }, [priceMemo, diliveryPriceMemo]);

  const handleAddCard = () => {
    setIsModalOpen(true);
    if (!user?.phone || !user.address || user.name || user.email) {
      const { access_token, ...rests } = user;
      setSateuerDetail(rests);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleUpdateUser = () => {
    navigate("/profile");
  };
 
 
  const handleAddOrder = () => {
    if(user?.access_token && order?.orderItems && user?.name && user?.phone && user?.address && priceMemo && user?.id)
    {
      mutationAddOrder.mutate({
        token: user?.access_token,
        orderItems: order?.orderItems,
        fullName: user?.name,
        address: user?.address,
        phone: user?.phone,
        paymentMethod: "Nhận tiền khi lấy hàng",
        itemsPrice: priceMemo,
        shippingPrice: diliveryPriceMemo,
        totalPrice: priceTotalMemo,
        user: user?.id,
      },{
        onSuccess:()=>{
          message.success('Đặt hàng thành công')
          navigate("/orders-page",{state:{
            payment:"Nhận tiền khi lấy hàng",
            delivery: 'fast',
            orders: order?.orderItems
          }});
        }})
    }
  };

  const { isLaoding:isLoadingAddorder, data } = mutationAddOrder;
  return (
    <div className="cart-main-wrapper mt-no-text">
      <div className="container custom-area">
        <div className="row">
          <div className="col-lg-12 col-custom">
            <div className="cart-table table-responsive">
              <p className="mb-0">
                You have items in your cart: {order?.orderItems?.length}
              </p>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th className="pro-thumbnail">Hình ảnh</th>
                    <th className="pro-title">Tên sản phẩm</th>
                    <th className="pro-price">Price</th>
                    <th className="pro-quantity">Số lương</th>
                    <th className="pro-price">Thanh tiền</th>
                    <th className="pro-remove">Xóa</th>
                  </tr>
                </thead>
                <tbody>
                  {order?.orderItems?.map((item, index) => (
                    <tr key={index}>
                      <td className="pro-thumbnail">
                        <a href="#">
                        <img
                      src={`data:image/png;base64,${item.image}`}
                      alt="Product Image"
                      style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    />
                        </a>
                      </td>
                      <td className="pro-title">{item.name}</td>
                      <td className="pro-price">
                        <span>{item.price.toLocaleString()} VNĐ</span>
                      </td>
                      <td className="pro-quantity">
                        <div className="quantity">
                          <div className="cart-plus-minus">
                            <input
                              className="cart-plus-minus-box"
                              value={item?.amount}
                              defaultValue={item?.amount}
                              type="text"
                              readOnly
                            />
                            <div
                              className="dec qtybutton"
                              onClick={() =>
                                handleChangeAmount("decrement", item?.product)
                              }
                            >
                              -
                            </div>
                            <div
                              className="inc qtybutton"
                              onClick={() =>
                                handleChangeAmount("increment", item?.product)
                              }
                            >
                              +
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="pro-price">
                        <span>
                          {(item.price * item?.amount).toLocaleString()} VNĐ
                        </span>
                      </td>
                      <td className="pro-remove">
                        <a onClick={() => handleDeleteOrder(item?.product)}>
                          <i
                            className="lnr lnr-trash theme-button"
                            style={{ fontWeight: "700" }}
                          ></i>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="cart-update-option d-block d-md-flex justify-content-between">
              <div className="apply-coupon-wrapper">
                <form action="#" method="post" className=" d-block d-md-flex">
                  <input
                    type="text"
                    placeholder="Enter Your Coupon Code"
                    required
                  />
                  <button className="btn flosun-button primary-btn rounded-0 black-btn">
                    Apply Coupon
                  </button>
                </form>
              </div>
              <div className="cart-update mt-sm-16">
                <a
                  href="#"
                  className="btn flosun-button primary-btn rounded-0 black-btn"
                >
                  Update Cart
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div class="col-lg-8 col-12 col-custom">
            <div class="your-order">
              <h3>Your order</h3>
              <div class="your-order-table table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th class="cart-product-name">Sản phẩm</th>
                      <th class="cart-product-total">Tổng tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order?.orderItems?.map((item, index) => (
                      <tr class="cart_item" key={index}>
                        <td class="cart-product-name">
                          {" "}
                          {item.name}
                          <strong class="product-quantity">
                            {" "}
                            X {item.amount}
                          </strong>
                        </td>
                        <td class="cart-product-total text-center">
                          <span class="amount">
                            {convertPrice(item.amount * item.price)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr class="cart-subtotal">
                      <th>Phí giao hàng</th>
                      <td class="text-center">
                        <span class="amount">
                          {convertPrice(diliveryPriceMemo)}
                        </span>
                      </td>
                    </tr>
                    <tr class="cart-subtotal">
                      <th>Tổng tiền sản phầm</th>
                      <td class="text-center">
                        <span class="amount">{convertPrice(priceMemo)}</span>
                      </td>
                    </tr>
                    <tr class="order-total">
                      <th>Tổng tiền thanh toán</th>
                      <td class="text-center">
                        <strong>
                          <span class="amount">
                            {convertPrice(priceTotalMemo)}
                          </span>
                        </strong>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <div class="payment-method">
                <div class="payment-accordion">
                  <ModalComponent
                    footer={false}
                    title="Thông tin giao dịch"
                    open={isModalOpen}
                    onCancel={handleCancel}
                  >
                    <div>
                      <label>Tên khách hàng:</label>
                      <span> {user?.name}</span>
                    </div>
                    <div>
                      <label>Địa chỉ:</label>
                      <span> {user?.address}</span>
                    </div>
                    <div>
                      <label>Số điện thoại:</label>
                      <span> {user?.phone}</span>
                    </div>
                    <div>
                      <label>Địa chỉ email:</label>
                      <span> {user?.email}</span>
                    </div>
                    <div style={{ marginTop: "10px" }}>
                      <Button
                        type="primary"
                        htmlType="submit"
                        onClick={() => handleAddOrder()}
                      >
                        Đồng ý
                      </Button>
                      <Button
                        style={{ fontWeight: "600", marginLeft: "10px" }}
                        onClick={handleUpdateUser}
                        htmlType="submit"
                      >
                        Thay đổi thông tin
                      </Button>
                    </div>
                  </ModalComponent>
                  <div class="order-button-payment">
                    <button
                      class="btn flosun-button secondary-btn black-color rounded-0 w-100"
                      onClick={handleAddCard}
                    >
                      Thanh toán
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
