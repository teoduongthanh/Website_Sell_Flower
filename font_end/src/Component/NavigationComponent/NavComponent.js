import React, { useEffect, useState } from "react";
import { searchProduct } from "../../redux/slider/productSlide";
import { useDispatch } from "react-redux";
import * as ProductService from "../../services/ProductService"
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import NavigationType from "./NavigationType";
import NavigationColor from "./NavigationColor";
const NavComponent = () => {
  const [searchValue, setSearchValue] = useState("");
  const [colorProduct,setColorProduct] = useState([]);
  const dispatch = useDispatch();
  

  // Handle input change to update the state
  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
    
  };

  // Handle search button click
  const handleSearch = () => {
    dispatch(searchProduct(searchValue));
  };


  return (
    <>
      <div className="col-lg-3 col-12 col-custom">
        <aside className="sidebar_widget widget-mt">
          <div className="widget_inner">
            <div className="widget-list widget-mb-1">
              <h3 className="widget-title">Search</h3>
              <div className="search-box">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Our Store"
                    aria-label="Search Our Store"
                    value={searchValue}
                    onChange={handleInputChange}
                  />

                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={handleSearch}
                    >
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <NavigationType/>
            <div className="widget-list widget-mb-2">
            <NavigationColor/>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
};

export default NavComponent;
