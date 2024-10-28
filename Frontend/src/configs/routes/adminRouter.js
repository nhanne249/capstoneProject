import LayoutPage from "../../layouts";
import Profile from "../../pages/UserPages/Profile";
import UserManagement from "../../pages/AdminPages/UserManagement"
import ProductManagement from "../../pages/AdminPages/ProductManagement";

const adminRouter = 
  {
    role: "admin",
    path: "admin",
    element: LayoutPage,
    children: [
      {
        path: "*",
        Component: Profile,
      },
      {
        path: "users",
        Component: UserManagement,
      },
      {
        path: "products",
        Component: ProductManagement,
      },
      {
        path: "dashboard",
        Component: Profile,
      },
    ],
  }
export default adminRouter;