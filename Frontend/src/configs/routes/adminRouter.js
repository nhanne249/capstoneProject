import LayoutPage from "../../layouts";
import UserManagement from "../../pages/AdminPages/UserManagement"
import ProductManagement from "../../pages/AdminPages/ProductManagement";

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
        Component: UserManagement,
      },
      {
        subPath: "products",
        Component: ProductManagement,
      },
      {
        subPath: "",
        Component: UserManagement,
      },
      {
        subPath: "*",
        Component: UserManagement,
      },
    ],
  }
export default adminRouter;