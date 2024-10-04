import { Flex } from "antd";
import React, { useState } from "react";
import Banner from "../Banner/Banner";
import ProductLists from "../ProductComponent/ProductLists";
import AdminUser from "../AdminUserComponent/AdminUser";
import Products from "../ProductComponent/Products";
// import Dashboard from "../../PageAdmin/DashboardPage/Dashboard";
import OrdersAdmin from "../OrderAdmin/OrdersAdmin";

const MainContent = (props) => {
  
const [selectedMenu, setSelectedMenu] = useState('products');

  console.log("props",props.dataFromParent)
  const renderKeyPage = (key)=>{
    console.log("key",key)
    switch(key){
      // case "1":
      //   return(<Dashboard/>);
      case "2":
        return(<Products/>);
      case "3":
        return(<OrdersAdmin/>);
      case "4":
        return(<AdminUser/>);
      default:
        return(<ProductLists/>)
    }
  }
  
  return (
        <div style={{ flex: 1 }}>
      <Flex vertical >
        {/* <Banner/> */}
        {renderKeyPage(props.dataFromContent)}
      </Flex>
    </div>
  );
};

export default MainContent;
