import LayoutPage from "../../layouts";
import Profile from "../../pages/UserPages/Profile";
import UserManagement from "../../pages/AdminPages/UserManagement"

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
        path: "dashboard",
        Component: Profile,
      },
    ],
  }
export default adminRouter;