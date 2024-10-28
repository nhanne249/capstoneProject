import LayoutPage from "../../layouts";
import UserManagement from "../../pages/AdminPages/UserManagement"

const adminRouter = 
  {
    role: "admin",
    path: "admin",
    element: LayoutPage,
    children: [
      {
        subPath: "*",
        Component: UserManagement,
      },
      {
        subPath: "",
        Component: UserManagement,
      },
      {
        subPath: "users",
        Component: UserManagement,
      },
      {
        subPath: "dashboard",
        Component: UserManagement,
      },
    ],
  }
export default adminRouter;