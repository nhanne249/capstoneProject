import LayoutPage from "../../layouts";
import Dashboard from "../../pages/AdminPages/Dashboard";
import UserManagement from "../../pages/AdminPages/UserManagement"
import ProductManagement from "../../pages/AdminPages/ProductManagement";
import OrderManagement from "../../pages/AdminPages/OrderManagement";
import OrderDetail from "../../pages/AdminPages/OrderDetail/index";
const adminRouter = 
  {
    role: "admin",
    path: "admin",
    element: LayoutPage,
    children: [
      {
        subPath: "users",
        Component: UserManagement,
      },
      {
        subPath: "dashboard",
        Component: Dashboard,
      },
      {
        subPath: "products",
        Component: ProductManagement,
      },
      {
        subPath: "orders",
        Component: OrderManagement,
      },
      {
        subPath: "orders/:id",
        Component: OrderDetail,
      },
      {
        subPath: "*",
        Component: UserManagement,
      },
    ],
  }
export default adminRouter;