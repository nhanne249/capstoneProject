import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Menu, Button } from "antd";
import { UserOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "./styles.scss";

const { Search } = Input;

const menuItemClassName =
  "w-24 flex justify-center items-center text-suitable font-sans font-bold text-gray-600 hover:text-blue-900";

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
    {
      key: "publications",
      label: <div className={menuItemClassName}>Publications</div>,
      disabled: itemClicked == "publications",
    },
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

  const handleProfileClick = () => {
    setItemClicked("");
    if (role) {
      role = "/" + role.role;
      if (role == "/user") navigate(role + "/profile");
      else if (role == "/admin") navigate(role + "/dashboard");
    } else navigate("/signin");
  };

  return (
    <div className="bg-transparent flex justify-between">
      <Menu
        mode="horizontal"
        items={items}
        className="w-fit flex justify-self-auto"
        onClick={onItemClick}
      />

      <div className="w-1/4 flex items-center justify-between">
        <Search onSearch={onSearch} className="w-52" />
        <Button
          icon={<UserOutlined />}
          className="border-none text-teal-600 shadow-none"
          onClick={() => handleProfileClick()}
        />
        <Button
          icon={<ShoppingCartOutlined />}
          className="border-none text-teal-600 shadow-none"
        />
      </div>
    </div>
  );
};

export default HeaderPage;
