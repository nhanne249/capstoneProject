import LayoutPage from "../../layouts";
import UserManagement from "../../pages/AdminPages/UserManagement"

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