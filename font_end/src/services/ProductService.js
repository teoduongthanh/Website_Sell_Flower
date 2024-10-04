import axios from "axios";
import { axiosJWT } from "./UserService";

export const getAllProduct = async (search, limit) => {
  let res = {};
  if(search?.length > 0){
    res = await axios.get(
     `${process.env.REACT_APP_API_KEY}/product/getall-product?filter={"name":"${search}"}&&limit=${limit}`
    );
  }else{
    res = await axios.get(
      `${process.env.REACT_APP_API_KEY}/product/getall-product?limit=${limit}`
    );
  }
  return res.data;
};

export const getTypeProduct = async (type) => {
  if(type){
    const res = await axios.get(
    `${process.env.REACT_APP_API_KEY}/product/getall-product?filter={"type":["${type}"]}`
    );
    return res.data;
  }
};

export const getAllType = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_KEY}/product/getall-type`
  );
  return res.data;
};



export const createProduct = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_KEY}/product/create-product`,
    data
  );
      
  return res.data;
};

export const getDetailsProduct = async (id) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_KEY}/product/get-detail-product/${id}`
  );
  return res.data;
};


export const getAllColor = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_KEY}/product/getall-color`
  );
  return res.data;
};

export const updateProduct = async (id, access_token, data) => {
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API_KEY}/product/update-product/${id}`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const deleteProduct = async (id, access_token) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_API_KEY}/product/delete-product/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const deleteManyProduct = async (data, access_token) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_KEY}/product/delete-many-product`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};
