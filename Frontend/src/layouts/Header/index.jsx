import { useNavigate } from "react-router-dom";
import { Input, Menu, Button } from "antd";
import { UserOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "./styles.scss";

const { Search } = Input;
const menuItemClassName =
  "w-24 flex justify-center items-center text-suitable font-sans font-bold text-gray-600 hover:text-blue-900";

const items = [
  {
    key: "main",
    label: <div className={menuItemClassName}>Home</div>,
  },
  {
    key: "about",
    label: <div className={menuItemClassName}>About us</div>,
  },
  {
    key: "events",
    label: <div className={menuItemClassName}>Events</div>,
  },
  {
    key: "publications",
    label: <div className={menuItemClassName}>Publications</div>,
  },
  {
    key: "contact",
    label: <div className={menuItemClassName}>Contact us</div>,
  },
];

const HeaderPage = () => {
  const navigate = useNavigate();

  const onItemClick = (value) => {
    navigate(value.key);
  };

  const onSearch = (value) => {
    console.log(value);
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
        <Search
          onSearch={onSearch}
          style={{
            width: 200,
          }}
        />
        <Button
          icon={<UserOutlined />}
          className="border-none text-teal-600 shadow-none"
        >Profile</Button>
        <Button
          icon={<ShoppingCartOutlined />}
          className="border-none text-teal-600 shadow-none"
        >Cart</Button>
      </div>
    </div>
  );
};

export default HeaderPage;
