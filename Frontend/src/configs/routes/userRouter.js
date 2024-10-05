import LayoutPage from "../../layouts";
import Profile from "../../pages/Profile";

const userRouter = 
  {
    role: "user",
    path: "user",
    element: LayoutPage,
    children: [
      {
        path: "*",
        Component: Profile,
      },
      {
        path: "profile",
        Component: Profile,
      },
    ],
  }
export default userRouter;