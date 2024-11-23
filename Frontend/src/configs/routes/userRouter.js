import LayoutPage from "../../layouts";
import Profile from "../../pages/UserPages/Profile";
import BuyingLog from "../../pages/UserPages/BuyingLog";
import OrderDetail from "../../pages/AdminPages/OrderDetail/index"

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
      {
        subPath: "orders/:id",
        Component: OrderDetail,
      },
    ],
  }
export default userRouter;