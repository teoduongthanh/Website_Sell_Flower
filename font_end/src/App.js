// src/App.js
import React, { Fragment, useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { routes,routesAdmin } from "./routes";
import * as UserServices from "./services/UserService";
// import AdminPlant from "../src/Admin/Component/AdminPlant";
// import AddProductForm from "../src/Admin/Component/InsertPlant";
// import AdminOrderPlant from "../src/Admin/Component/AdminOrder";

import * as ProductServices from "./services/ProductService"
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { isJsonString } from "./utils";
import { jwtDecode } from "jwt-decode";
import { updateUser } from "./redux/slider/userSlide";
import { useDispatch, useSelector } from "react-redux";
import Profiles from "./pages/Profiles/Profiles";
import DefaultComponent from "./Component/DefaultComponent/DefaultComponent";
import Loading from "./Component/LoadingComponent/Loading";

function App() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const fetchApi = async () => {
    const res = await ProductServices.getAllProduct()
    return res.data;
  };

  const query = useQuery({ queryKey: ["todos"], queryFn: fetchApi });

  useEffect(() => {
    setLoading(true);
    // Xữ lý token hết hạn
    const { storageData, decode } = handleDecoded();
    console.log("decode?.exp", decode?.exp);
    if (decode?.id) {
      handleGetDetailsUser(decode?.id, storageData);
    }
    setLoading(false);
  }, []);
  const handleDecoded = () => {
    // Xữ lý token hết hạn
    let storageData = localStorage.getItem("access_token");
    let decode = {};
    console.log("isJsonString(storageData)", isJsonString(storageData));
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decode = jwtDecode(storageData);
      // giải mã đoạn code access_token để lấy ra thông tin ID người dùng
    }
    return { storageData, decode };
  };
  // Add a request interceptor
  //thêm các điều kiện chạn từ request
  UserServices.axiosJWT.interceptors.request.use(
    async function (config) {
      // Do something before request is sent
      // khi chúng ta gọi đến useEffect sẽ phải đi qua interceptors.request trong đó sẽ có một func config
      //config này sẽ check xem access_token có còn hạn sử dụng hay không nếu ko thì sẽ gọi đến Api refresh_token để làm mới
      const currentime = new Date();
      const { storageData, decode } = handleDecoded();

      console.log("decodeAPPP", decode);

      if (decode?.exp < currentime.getTime() / 1000) {
        const data = await UserServices.refreshToken();

        config.headers["token"] = `Bearer ${data?.access_token}`;
      }
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserServices.getDetaisUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
   
  };

  return (
      <Loading isLoading={loading}>
        <Routes>
          {routes.map((route, index) => {
            const Page = route.page;
            const Layout = route?.isShowHeader ? DefaultComponent : Fragment;
            return (
              <Route
                key={route?.path}
                path={route?.path}
                element={<Layout><Page /></Layout>}
              />
            );
          })}

          {user.isAdmin ? (
           routesAdmin.map((routeAdmin, index) => {
            const Page = routeAdmin.page;
            const LayoutAdmin = routeAdmin.isShowHeader ? DefaultComponent : Fragment;
            return (
              <Route
                key={routeAdmin.path}
                path={routeAdmin.path}
                element={<LayoutAdmin> <Page /></LayoutAdmin>}
              />
            );
          })
          ) :
          (<Route path="/ERROR" />) }
        </Routes>
      </Loading>
  );
}
export default App;
