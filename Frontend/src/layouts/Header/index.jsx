import { Menu } from "antd";
import "./styles.scss";

const items = [
  {
    key: "main",
    label: "Home",
  },
  {
    key: "about",
    label: "About us",
  },
  {
    key: "events",
    label: "Events",
  },
  {
    key: "publications",
    label: "Publications",
  },
  {
    key: "contact",
    label: "Contact us",
  },
];

const HeaderPage = () => {
  return (
    <div>
      <Menu mode="horizontal " items={items}></Menu>
    </div>
  );
};

export default HeaderPage;
