import LayoutPage from "../../layouts";
import Profile from "../../pages/UserPages/Profile";
import BuyingLog from "../../pages/UserPages/BuyingLog";

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
        subPath: "orders",
        Component: BuyingLog,
      },
    ],
  }
export default userRouter;