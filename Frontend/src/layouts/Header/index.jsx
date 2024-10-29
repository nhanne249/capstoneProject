import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Menu, Button, Tooltip } from "antd";
import { UserOutlined, ShoppingCartOutlined, LogoutOutlined, DesktopOutlined, LoginOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";
import "./styles.scss";

const { Search } = Input;

const menuItemClassName = "w-24 flex justify-center items-center text-suitable font-sans font-bold text-gray-600 hover:text-blue-900";

const HeaderPage = (role) => {
  const navigate = useNavigate();
  const [itemClicked, setItemClicked] = useState("main");

  const items = [
    {
      key: "main",
      label: <div className={menuItemClassName}>Home</div>,
      disabled: itemClicked == "main",
    },
    {
      key: "about",
      label: <div className={menuItemClassName}>About us</div>,
      disabled: itemClicked == "about",
    },
    {
      key: "events",
      label: <div className={menuItemClassName}>Events</div>,
      disabled: itemClicked == "events",
    },
    // {
    //   key: "publications",
    //   label: <div className={menuItemClassName}>Publications</div>,
    //   disabled: itemClicked == "publications",
    // },
    {
      key: "contact",
      label: <div className={menuItemClassName}>Contact us</div>,
      disabled: itemClicked == "contact",
    },
  ];

  const onItemClick = (value) => {
    setItemClicked(value.key);
    navigate(`/${value.key}`, { replace: true });
  };

  const onSearch = (value) => {
    console.log(value);
  };
  const handleSignInClick = () => {
    setItemClicked("");
    navigate("/signin");
  };
  const handleProfileClick = () => {
    role = "/" + role.role;
    navigate(role + "/profile");
  };
  const handleSettingsClick = () => {
    setItemClicked("");
    role = "/" + role.role;
    navigate(role + "/dashboard");
  };
  const handleSignOutClick = () => {
    Cookies.remove("role", { path: "/" });
    Cookies.remove("userPresent", { path: "/" });
    navigate("/main", { replace: true });
  };
  return (
    <div className="bg-transparent flex justify-between h-16">
      <Menu mode="horizontal" items={items} className="w-fit flex justify-self-auto" onClick={onItemClick} />

      <div className="w-1/4 flex items-center justify-between">
        <Search onSearch={onSearch} className="w-52" />
        {!role.role && (
          <Tooltip placement="bottom" title={"Sign in"}>
            <Button icon={<LoginOutlined />} className="border-none text-teal-600 shadow-none" onClick={() => handleSignInClick()} />
          </Tooltip>
        )}

        {role.role == "admin" && (
          <Tooltip placement="bottom" title={"Dasbooad"}>
            <Button icon={<DesktopOutlined />} className="border-none text-teal-600 shadow-none" onClick={() => handleSettingsClick()} />
          </Tooltip>
        )}
        {role.role == "user" && (
          <Tooltip placement="bottom" title={"Profile"}>
            <Button icon={<UserOutlined />} className="border-none text-teal-600 shadow-none" onClick={() => handleProfileClick()} />
          </Tooltip>
        )}
        {role.role == "user" && (
          <Tooltip placement="bottom" title={"Cart"}>
            <Button icon={<ShoppingCartOutlined />} className="border-none text-teal-600 shadow-none" />
          </Tooltip>
        )}
        {role.role && (
          <Tooltip placement="bottom" title={"Sign out"}>
            <Button icon={<LogoutOutlined />} className="border-none text-teal-600 shadow-none" onClick={() => handleSignOutClick()} />
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default HeaderPage;
