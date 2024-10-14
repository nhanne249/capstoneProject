import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Layout } from "antd";
import HeaderPage from "./Header";
import FooterPage from "./Footer/index";
import SiderPage from "./Sider";
import Cookies from "js-cookie";
import "./styles.scss";

const { Header, Footer, Content, Sider } = Layout;

const LayoutPage = () => {
  const location = useLocation();
  const role = Cookies.get("role") ? Cookies.get("role") : undefined;
  useEffect(() => {}, [role]);
  return (
    <Layout className="min-w-full min-h-full">
      <Header className="w-full px-12 bg-white">
        <HeaderPage role={role} />
      </Header>
      {Cookies.get("role") == location.pathname.split("/")[1] ? (
        <Layout className="min-h-full w-full bg-lime-100">
          <Sider className="!w-64 !max-w-64 !flex-none h-full mr-5 mt-5">
            <SiderPage role={role} />
          </Sider>
          <Content className="min-h-full px-12 my-5 bg-white">
            <Outlet />
          </Content>
        </Layout>
      ) : (
        <Content className="min-h-full w-full px-12 my-5 bg-white">
          <Outlet />
        </Content>
      )}
      <Footer className="h-16">
        <FooterPage />
      </Footer>
    </Layout>
  );
};

export default LayoutPage;
