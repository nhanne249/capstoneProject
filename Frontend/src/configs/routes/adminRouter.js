import LayoutPage from "../../layouts";
import Profile from "../../pages/Profile";

const adminRouter = [
  {
    role: "user",
    path: "/user",
    element: <LayoutPage/>,
    children: [
      {
        path: "*",
        Component: Profile,
      },
    ],
  },
];
export default adminRouter;