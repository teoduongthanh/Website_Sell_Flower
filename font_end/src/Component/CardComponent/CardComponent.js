import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import * as ProductServices from "../../services/ProductService";
import ComponentRating from "./ComponentRating";
import { convertPrice } from "../../utils";

const CardComponent = (props) => {
  const {
    key,
    countInStock,
    createdAt,
    description,
    image,
    name,
    price,
    rating,
    type,
    selled,
    discount,
    id
  } = props;
  const  naviga = useNavigate()
  const handleDetailProduct=(id)=>{
    naviga(`/shop/detail-product/${id}`)
  }
  return (
    <>
      <div
        className="col-md-6 col-sm-6 col-lg-4 col-custom product-area "
        key={key}
      >
        <div className="product-item" onClick={()=>handleDetailProduct(id)} >
          <div className="single-product position-relative mr-0 ml-0">
            <div className="product-image">
              <a className="d-block">
                <img
                  src={`data:image/png;base64,${image}`}
                  alt="Product image"
                  className="product-image-1 w-100"
                />
                <img
                  src={`data:image/png;base64,${image}`}
                  alt="Product image"
                  className="product-image-2 position-absolute w-100"
                />
              </a>
              {/* <span className="onsale">Sale!</span> */}
              <div className="add-action d-flex flex-column position-absolute">
                <a title="Compare" onClick={()=>handleDetailProduct(id)}>
                  <i
                    className="lnr lnr-sync"
                    data-toggle="tooltip"
                    data-placement="left"
                    title="Compare"
                  ></i>
                </a>
                <a onClick={()=>handleDetailProduct(id)} title="Add To Wishlist">
                  <i
                    className="lnr lnr-heart"
                    data-toggle="tooltip"
                    data-placement="left"
                    title="Wishlist"
                  ></i>
                </a>
                <a
                  onClick={()=>handleDetailProduct(id)}
                  title="Quick View"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModalCenter"
                >
                  <i
                    className="lnr lnr-eye"
                    data-toggle="tooltip"
                    data-placement="left"
                    title="Quick View"
                  ></i>
                </a>
              </div>
            </div>
            <div className="product-content">
              <div className="product-title">
                <h4 className="title-2">
                  {" "}
                  <a onClick={()=>handleDetailProduct(id)}>{name}</a>
                </h4>
              </div>
              <div className="product">
                <ComponentRating rating={rating} />
                </div>
              <div className="price-box">
                <span className="old-price">
                  -{convertPrice(discount)}
                </span>
                <span className="regular-price ">{convertPrice(price)}</span>
              </div>
              <a className="btn product-cart" style={{fontWeight:"700"}} onClick={()=>handleDetailProduct(id)}>
                Add to Cart
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardComponent;
