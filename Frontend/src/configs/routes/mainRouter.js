import LayoutPage from "../../layouts";
import Main from "../../pages/Main/index";
import SignIn from "../../pages/SignIn";
import SignUp from "../../pages/SignUp";
import Profile from "../../pages/Profile";

const mainRouter = [
  {
    path: "/*",
    element: LayoutPage,
    children: [
      {
        path: "*", 
        element: Main,
      },
      {
        path: "main",
        element: Main,
      },
      {
        path: "signin",
        element: SignIn,
      },
      {
        path: "signup",
        element: SignUp,
      },
      {
        path: "profile",
        element: Profile,
      },
      {
        path: "*", 
        element: Main,
      },
    ]
  },
  
];
export default mainRouter;