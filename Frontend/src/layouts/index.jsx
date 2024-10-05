// import React from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import HeaderPage from "./Header";
import FooterPage from "./Footer/index";
import "./styles.scss";

const { Header, Footer, Content } = Layout;

const LayoutPage = () => {
  return (
    <Layout className="min-w-full min-h-full">
      <Header className="w-full px-12 bg-white">
        <HeaderPage />
      </Header>
      <Content className="w-full px-12 bg-white flex items-center justify-center">
        <Outlet />
      </Content>
      <Footer className="h-16">
        <FooterPage />
      </Footer>
    </Layout>
  );
};

export default LayoutPage;
