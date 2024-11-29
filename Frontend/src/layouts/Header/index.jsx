import { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Input, Menu, Button, Tooltip, Badge } from "antd";
import { UserOutlined, ShoppingCartOutlined, LogoutOutlined, DesktopOutlined, LoginOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";
import { MyCart } from "..";
import "./styles.scss";

const { Search } = Input;

const menuItemClassName = "w-24 flex justify-center items-center text-suitable font-sans font-bold text-gray-600 hover:text-blue-900";

const HeaderPage = (role) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [roleNow, setRoleNow] = useState(role.role);
  const { cartQuantity, setIsLogin, setIsFetch } = useContext(MyCart);
  useEffect(() => {
    setRoleNow(role.role);
  }, [role]);
  const items = [
    {
      key: "main",
      label: <div className={menuItemClassName}>Home</div>,
      disabled: location.pathname == "/main",
    },
    {
      key: "about",
      label: <div className={menuItemClassName}>About us</div>,
      disabled: location.pathname == "/about",
    },
    {
      key: "events",
      label: <div className={menuItemClassName}>Events</div>,
      disabled: location.pathname == "/events",
    },
    {
      key: "contact",
      label: <div className={menuItemClassName}>Contact us</div>,
      disabled: location.pathname == "/contact",
    },
  ];

  const onItemClick = (value) => {
    navigate(`/${value.key}`, { replace: true });
  };

  const onSearch = (value) => {
    console.log(value);
  };
  const handleSignInClick = () => {
    navigate("/signin");
  };
  const handleCartClick = () => {
    setIsFetch(false);
    navigate("/cart");
  };
  const handleProfileClick = () => {
    role = "/" + role.role;
    navigate(role + "/profile");
  };
  const handleSettingsClick = () => {
    role = "/" + role.role;
    navigate(role + "/dashboard");
  };
  const handleSignOutClick = () => {
    Cookies.remove("role", { path: "/" });
    Cookies.remove("userPresent", { path: "/" });
    setIsLogin(false);
    setRoleNow();
    navigate("/main", { replace: true });
  };
  return (
    <div className="bg-transparent flex justify-between h-16">
      <Menu mode="horizontal" items={items} className="w-fit flex justify-self-auto" onClick={onItemClick} />

      <div className="w-1/4 flex items-center justify-between">
        <Search onSearch={onSearch} className="w-52" />
        {!roleNow && (
          <Tooltip placement="bottom" title={"Sign in"}>
            <Button icon={<LoginOutlined />} className="border-none text-teal-600 shadow-none bg-transparent" onClick={() => handleSignInClick()} />
          </Tooltip>
        )}

        {roleNow == "admin" && (
          <Tooltip placement="bottom" title={"Dasbooad"}>
            <Button icon={<DesktopOutlined />} className="border-none text-teal-600 shadow-none bg-transparent" onClick={() => handleSettingsClick()} />
          </Tooltip>
        )}
        {roleNow == "user" && (
          <Tooltip placement="bottom" title={"Profile"}>
            <Button icon={<UserOutlined />} className="border-none text-teal-600 shadow-none bg-transparent" onClick={() => handleProfileClick()} />
          </Tooltip>
        )}
        <Tooltip placement="bottom" title={"Cart"}>
          <Badge count={cartQuantity}>
            <Button icon={<ShoppingCartOutlined />} className="border-none text-teal-600 shadow-none bg-transparent" onClick={() => handleCartClick()} />
          </Badge>
        </Tooltip>
        {roleNow && (
          <Tooltip placement="bottom" title={"Sign out"}>
            <Button icon={<LogoutOutlined />} className="border-none text-teal-600 shadow-none bg-transparent" onClick={() => handleSignOutClick()} />
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default HeaderPage;
