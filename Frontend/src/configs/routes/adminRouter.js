import LayoutPage from "../../layouts";
import Profile from "../../pages/UserPages/Profile";

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
        path: "dashboard",
        Component: Profile,
      },
    ],
  }
export default adminRouter;