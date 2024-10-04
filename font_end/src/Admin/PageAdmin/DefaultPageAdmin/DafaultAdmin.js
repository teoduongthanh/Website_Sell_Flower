import React, { useState } from "react";
import { Button, Flex, Layout, Menu } from "antd";
import "../../assets/css/admin.css";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import HeaderAdmin from "../../Component/HeaderComponent/HeaderAdmin";
import MainContent from "../../Component/MainContent/MainContent"
import { FaRegUser } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { AiOutlineProduct } from "react-icons/ai";
import {
  MdOutlineDashboardCustomize,
  MdOutlineShoppingBag,
  MdLogout,
} from "react-icons/md";
import { FaLeaf } from "react-icons/fa";
const { Header, Content, Footer, Sider } = Layout;
const DafaultAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("1");
  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
  };
  const items = [
    {
      key: "1",
      icon: <MdOutlineDashboardCustomize />,
      label: "Dashboard",
    },
    {
      key: "2",
      icon: <AiOutlineProduct />,
      label: "Products",
    },
    {
      key: "3",
      icon: <MdOutlineShoppingBag />,
      label: "My Order",
    },
    {
      key: "4",
      icon: <FaRegUser />,
      label: "User",
    },
    {
      key: "5",
      label: "Notifi",
      icon: <IoMdNotificationsOutline />,
    },
    {
      key: "6",
      label: "Logout",
      icon: <MdLogout />,
    },
  ];
  return (
    <>
      <Layout>
        <Sider
          style={{ zIndex: "20" }}
          theme="light"
          trigger={null}
          collapsible
          collapsed={collapsed}
          className="sider-admin"
        >
          <Flex align="center" justify="center">
            <div className="logo">
              <FaLeaf />
            </div>
          </Flex>
          <Menu
            mode="inline"
            defaultSelectedKeys={selectedKey}
            className="menu-bar"
            items={items}
            selectedKeys={[selectedKey]}
            onClick={handleMenuClick}
          />
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => {
              setCollapsed(!collapsed);
            }}
            className="triger-btn"
          ></Button>
        </Sider>
        <Layout>
          <Header className="header-admin" style={{ zIndex: "10" }}>
            <HeaderAdmin />
          </Header>
          <Content className="content" style={{ zIndex: "0" }}>
            <Flex gap="large">
              <MainContent dataFromContent={selectedKey} />
            </Flex>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default DafaultAdmin;
