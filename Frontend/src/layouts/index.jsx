// import React from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import HeaderPage from "./Header";
import "./styles.scss";

const { Header, Footer, Content } = Layout;

const LayoutPage = () => {
  return (
    <Layout>
      <Header className="w-full">
        <HeaderPage />
      </Header>
      <Content>
        <Outlet />
      </Content>
      <Footer></Footer>
    </Layout>
  );
};

export default LayoutPage;
