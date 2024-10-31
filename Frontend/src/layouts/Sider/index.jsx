import { useState, useEffect } from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import "./styels.scss";

const SiderPage = (role) => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  useEffect(() => {
    if (role.role == "admin")
      setItems([
        {
          label: <div className="h-9 text-sky-800 text-lg font-bold py-2">Dashboard</div>,
          key: "dashboard",
        },
        {
          label: <div className="h-9 text-sky-800 text-lg font-bold py-2">Customers</div>,
          key: "users",
        },
        {
          label: <div className="h-9 text-sky-800 text-lg font-bold py-2">Orders</div>,
          key: "orders",
        },
        {
          label: <div className="h-9 text-sky-800 text-lg font-bold py-2">Storage</div>,
          key: "products",
        },
      ]);
    if (role.role == "user")
      setItems([
        {
          label: <div className="h-9 text-sky-800 text-lg font-bold py-2">Profile</div>,
          key: "profile",
        },
        {
          label: <div className="h-9 text-sky-800 text-lg font-bold py-2">Order Logs</div>,
          key: "orders",
        },
      ]);
  }, []);

  const onClickMenuItem = (value) => {
    navigate(value.key);
  };
  return <Menu mode="inline" className="h-4/5 py-4 shadow-md pl-2 rounded-e-xl" items={items} onClick={onClickMenuItem} />;
};
export default SiderPage;
