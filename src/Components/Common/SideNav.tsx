import React, { useState } from "react";
import { Layout, Menu, Typography, Row, Col, Button, Badge } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  MailOutlined,
  TeamOutlined,
  HomeOutlined,
  FileProtectOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../styles/layout.less";
import SubMenu from "antd/lib/menu/SubMenu";
import data from "../../data/users.json";

const SideNav = () => {
  const navigate = useNavigate();
  const store = useSelector((state: any) => state.tableReducer);
  const [select, setSelect] = useState(["1"]);
  const nodeOneRef = React.useRef(null);
  const nodeTwoRef = React.useRef(null);

  return (
    <>
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={select}>
        <Menu.Item
          key="1"
          icon={<HomeOutlined />}
          onClick={({ item, key, keyPath, domEvent }: any) => {
            setSelect(key);
            navigate("/");
          }}
        >
          Home Dashboard
        </Menu.Item>
        <Menu.Item
          key="2"
          icon={<UserOutlined />}
          onClick={({ item, key, keyPath, domEvent }: any) => {
            setSelect(key);
            navigate("/profile", { state: data[0] });
          }}
        >
          Profile
        </Menu.Item>
        <Menu.Item
          key="3"
          icon={<MailOutlined />}
          onClick={({ item, key, keyPath, domEvent }: any) => {
            setSelect(key);
            navigate("/inbox");
          }}
        >
          Inbox
        </Menu.Item>
        <SubMenu key="sub1" icon={<FileProtectOutlined />} title="Access">
          <Menu.Item
            key="4"
            onClick={({ item, key, keyPath, domEvent }: any) => {
              setSelect(key);
              navigate("/user");
            }}
            >
            User management
          </Menu.Item>
          <Menu.Item
            key="5"
            onClick={({ item, key, keyPath, domEvent }: any) => {
              setSelect(key);
              navigate("/umwithredux");
            }}
            >
            UM with Redux {store.users.length}
          </Menu.Item>
        </SubMenu>
      </Menu>
    </>
  );
};

export default SideNav;
