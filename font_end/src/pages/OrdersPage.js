import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import ModalComponent from "../Admin/Component/ModalComponent/ModalComponent";
import { Button, message } from "antd";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { convertPrice } from "../utils";

import { useMutationHooks } from "../hooks/useMutationHooks";
import * as OrderService from "../services/OrderService";
import { useQuery } from "@tanstack/react-query";

const OrdersPage = () => {
  const order = useSelector((state) => state.order);
    const user = useSelector((state) => state.user);
  const location = useLocation();
  console.log("location", location?.state?.orders);
  const priceMemo = useMemo(() => {
    {
      const result = order?.orderItems.reduce((total, cur) => {
        return total + cur.price * cur.amount;
      }, 0);
      return result;
    }
  }, [location?.state?.orders]);
  const diliveryPriceMemo = useMemo(() => {
    if (priceMemo > 0 && priceMemo <= 1000000) {
      return 20000;
    } else if (priceMemo > 1000000) {
      return 30000;
    }
  }, [location?.state?.orders]);

  const priceTotalMemo = useMemo(() => {
    return Number(priceMemo + diliveryPriceMemo);
  }, [priceMemo, diliveryPriceMemo]);

 

  const getAllOrders = async (id) => {
    const res = await OrderService.getAllOrderUser(id);
    console.log("res data order", res);
    return res;
  };
  
  // Use useQuery without invoking the function immediately
  const queryOrder = useQuery(
    ["orders", user?.id], // Include the user id in the query key
    () => getAllOrders(user?.id), // Pass a function reference that returns the result of getAllOrders
    {
      retry: 3,
      retryDelay: 1000,
      enabled: !!user?.id, // Prevent running the query if user.id is undefined
    }
  );
  
  const { isLoading: isLoadingOrders, data: ordersOrder } = queryOrder;
  
  console.log("orders1123212", ordersOrder?.data);
  const mutationCancelOrder = useMutationHooks(async (data) => {
    const { id } = data; // Make sure you're using `id`, not `_id`
    console.log("id passed to cancel order:", id);
    const res = await OrderService.cancelOrder(id); // Pass `id` to the service
  
    return res;
  });
  const {data,isError: isErrorOrder, isSuccess: isSuccessOrder,} = mutationCancelOrder
  console.log("mutationCancelOrder",mutationCancelOrder)
  const handleDeleteOrder = (id) => {
    console.log("id of the order to cancel:", id);
    mutationCancelOrder.mutate(
      { id: id }, // Pass the `id` properly here
      {
        onSettled: () => {
          queryOrder.refetch(); // Refetch the orders after canceling one
        },
      }
    );
  };
  useEffect(()=>{
    if(isSuccessOrder && data?.status =="Ok"){
      message.success("Xóa đơn hàng thành công");
    }
  },[isSuccessOrder])
  return (
    <div className="cart-main-wrapper mt-no-text">
     {ordersOrder?.data?.map((orderData) => {
  return ( 
    <div className="row" key={orderData?._id} style={{marginTop:"20px"}}> {/* Assuming 'id' or some unique value is present */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="your-order" style={{border:"1px solid #000"}}>
          <h3>Your order</h3>
          <div className="your-order-table table-responsive">
            <table className="table" >
              <thead>
                <tr>
                  <th className="cart-product-name">Hình thức</th>
                  <th className="cart-product-total">Thể loại</th>
                </tr>
              </thead>
              <tfoot>
                <tr className="cart-subtotal">
                  <th>Phương thức giao hàng</th>
                  <td className="text-center">
                    <span className="amount">{orderData?.paymentMethod}</span>
                  </td>
                </tr>
                <tr className="cart-subtotal">
                  <th>Phương thức thanh toán</th>
                  <td className="text-center">
                    <span className="amount">Fast</span> {/* Assuming there's a payment type */}
                  </td>
                </tr>
                <tr className="order-total">
                  <th>Tổng tiền hóa đơn</th>
                  <td className="text-center">
                    <strong>
                      <span className="amount">
                        {convertPrice(orderData?.totalPrice)}
                      </span>
                    </strong>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="payment-method">
            <div className="payment-accordion">
              <div className="order-button-payment">
                <div
                  className="row"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <button
                    className="btn flosun-button secondary-btn black-color rounded-0 w-30"
                    onClick={()=>handleDeleteOrder(orderData?._id)} // This should probably be cancel order instead of fetching again
                  >
                    Hủy đơn hàng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
})}
    </div>
  );
};

export default OrdersPage;
