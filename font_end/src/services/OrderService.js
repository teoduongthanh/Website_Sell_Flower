
import axios from "axios";
import { axiosJWT } from "./UserService";
export const createOrder = async ( access_token, data) => {
    const res = await axiosJWT.post(
      `${process.env.REACT_APP_API_KEY}/order/create-order`,
      data,
      {
        headers: {
          token: `Bearer ${access_token}`,
        },
      }
    );
    return res.data;
  };

  export const cancelOrder = async (id) => {
    const res = await axios.delete(
      `${process.env.REACT_APP_API_KEY}/order/cancel-order/${id}`
    );
    return res.data;
  };
  
  export const getAllOrderUser = async (id) => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_KEY}/order/get-all-order/${id}`
    );
    return res.data;
  };

  export const getAllOrders = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_KEY}/order/get-all-items-order`
    );
    return res.data;
  };
  