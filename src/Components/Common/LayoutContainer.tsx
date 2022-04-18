import { useState } from "react";
import { Layout } from "antd";
import { Outlet, useOutletContext } from "react-router-dom";
import SideNav from "./SideNav";
import "../../styles/layout.less";

const { Sider } = Layout;

type LayoutProps = {
  collapsed: boolean;
  toggle: () => {};
};

const LayoutContainer = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout hasSider>
      <Sider
        className="slider-layout"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <SideNav />
      </Sider>
      <Layout className="site-layout">
        <Outlet context={{ collapsed, toggle }} />
      </Layout>
    </Layout>
  );
};

export const useSideNavState = () => useOutletContext<LayoutProps>();

export default LayoutContainer;
