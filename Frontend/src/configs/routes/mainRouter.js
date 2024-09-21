import LayoutPage from "../../layouts";
import Main from "../../pages/Main/index";
import SignIn from "../../pages/SignIn";
import SignUp from "../../pages/SignUp";

const mainRouter = [
  {
    path: "/*",
    element: LayoutPage,
    children: [
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
        path: "*", 
        element: Main,
      },
    ]
  },
  
];
export default mainRouter;