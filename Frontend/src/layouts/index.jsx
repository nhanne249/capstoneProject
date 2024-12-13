import { useEffect, createContext, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCartThunk, addBookToCartThunk } from "../redux/action/cart.js";
import { Layout } from "antd";
import HeaderPage from "./Header";
import FooterPage from "./Footer/index";
import SiderPage from "./Sider";
import Cookies from "js-cookie";
import "./styles.scss";

const { Header, Footer, Content, Sider } = Layout;
export const MyCart = createContext();

const LayoutPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [cartServer, setCartServer] = useState([]);
  const [cartClient, setCartClient] = useState(localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []);
  const [isLogin, setIsLogin] = useState(!!Cookies.get("userPresent"));
  const [isFetch, setIsFetch] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(
    localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart")).reduce((sum, item) => {
        return sum + (item.quantity || 0);
      }, 0)
      : 0
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartClient));

    setCartServer((prevCartServer) =>
      prevCartServer
        .map((item, index) => {
          if (!cartClient[index]) {
            return null;
          }
          return { ...item, quantity: cartClient[index].quantity };
        })
        .filter(Boolean)
    );
    setCartQuantity(
      cartClient.reduce((sum, item) => {
        return sum + (item.quantity || 0);
      }, 0)
    );
  }, [cartClient]);

  useEffect(() => {
    if (isLogin) {
      dispatch(addBookToCartThunk(cartClient)).then((res) => {
        setCartServer(res.payload);
        setIsFetch(true);
      });
    } else {
      dispatch(getCartThunk(cartClient)).then((res) => {
        setCartServer(
          res.payload.map((item, index) => {
            return { ...item, quantity: cartClient[index].quantity };
          })
        );
        setIsFetch(true);
      });
    }
  }, [isLogin, isFetch]);

  const role = Cookies.get("role") ? Cookies.get("role") : undefined;

  return (
    <MyCart.Provider value={{ isLogin, cartQuantity, setCartQuantity, setIsLogin, cartServer, cartClient, setCartClient, setIsFetch }}>
      <Layout
        className="h-full w-full gap-5 flex flex-col"
      >
        <Header className="w-full px-12 bg-white h-16">
          <HeaderPage role={role} />
        </Header >
        {role == location.pathname.split("/")[1] ? (
          <Layout className="flex-grow flex flex-col gap-5 ">
            <Sider className="!w-64 !max-w-64 !flex-none h-full bg-transparent">
              <SiderPage role={role} />
            </Sider>
            <Content className="h-full w-full px-12 bg-white rounded-xl">
              <Outlet />
            </Content>
          </Layout >
        ) : (
          <Content
            className={`h-full flex-grow ${location.pathname.split("/")[1] == "signin" || location.pathname.split("/")[1] == "signup" ? "backgroundMain" : " bg-transparent pb-5"
              }`}
          >
            <Outlet />
          </Content >
        )}
        {/* <Footer className="bottom-0 w-full h-10 bg-white">
          hi
        </Footer > */}
      </Layout>
    </MyCart.Provider>
  );
};

export default LayoutPage;
