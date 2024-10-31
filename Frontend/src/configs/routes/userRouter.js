import LayoutPage from "../../layouts";
import Profile from "../../pages/UserPages/Profile";

const userRouter = 
  {
    role: "user",
    path: "user",
    element: LayoutPage,
    children: [
      {
        subPath: "*",
        Component: Profile,
      },
      {
        subPath: "profile",
        Component: Profile,
      },
      {
        subPath: "",
        Component: Profile,
      },
    ],
  }
export default userRouter;