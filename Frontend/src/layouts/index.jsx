// import React from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import HeaderPage from "./Header";
import FooterPage from "./Footer/index";
import "./styles.scss";

const { Header, Footer, Content } = Layout;

const LayoutPage = () => {
  return (
    <Layout>
      <Header className="w-full px-12 bg-white">
        <HeaderPage />
      </Header>
      <Content className="w-full px-12 bg-yellow-50">
        <Outlet />
      </Content>
      <Footer>
        <FooterPage />
      </Footer>
    </Layout>
  );
};

export default LayoutPage;
