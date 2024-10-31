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
    <Layout
      className={`min-h-screen w-full ${
        location.pathname.split("/")[1] == "signin" || location.pathname.split("/")[1] == "signup" ? "h-screen" : "h-auto"
      } bg-slate-200 bg-opacity-30`}
    >
      <Header className="w-full px-12 bg-white h-fit">
        <HeaderPage role={role} />
      </Header>
      {role == location.pathname.split("/")[1] ? (
        <Layout className="min-h-full h-full w-full bg-slate-200">
          <Sider className="!w-64 !max-w-64 !flex-none h-full mr-5 mt-5 bg-transparent">
            <SiderPage role={role} />
          </Sider>
          <Content className="h-full px-12  mr-4 my-5 bg-white rounded-xl">
            <Outlet />
          </Content>
        </Layout>
      ) : (
        <Content
          className={`h-full ${
            location.pathname.split("/")[1] == "signin" || location.pathname.split("/")[1] == "signup" ? "backgroundMain" : " mt-5 bg-white"
          }`}
        >
          <Outlet />
        </Content>
      )}
      <Footer className="h-10">
        <FooterPage />
      </Footer>
    </Layout>
  );
};

export default LayoutPage;
