import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Layout style={{ height: "100vh", overflow: "hidden" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <img src="/logo.svg" className="aspect-[4/2]" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={({ key }) => navigate(key)}
          items={[
            {
              key: "/admin/dashboard",
              icon: <UserOutlined />,
              label: "Dashboard",
            },
            {
              key: "/admin/users",
              icon: <UserOutlined />,
              label: "Users",
            },
            {
              key: "/admin/products",
              icon: <VideoCameraOutlined />,
              label: "Products",
            },
            {
              key: "/admin/categories",
              icon: <UploadOutlined />,
              label: "Categories",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            position: "relative",
            display: "flex",
            flex: 1,
            flexDirection: "column",
            overflowX: "hidden",
            padding: "1rem", // tw-p-4 ~ 1rem
            scrollbarWidth: "thin",
          }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export { AdminLayout };
