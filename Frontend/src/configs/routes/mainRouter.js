import LayoutPage from "../../layouts";
import Main from "../../pages/Main/index";
import SignIn from "../../pages/SignIn";
import SignUp from "../../pages/SignUp";
import Profile from "../../pages/Profile";

const mainRouter ={ 
    path: "*",
    element: LayoutPage,
    children: [
      {
        path: "*", 
        Component: Main,
      },
      {
        path: "main",
        Component: Main,
      },
      {
        path: "signin",
        Component: SignIn,
      },
      {
        path: "signup",
        Component: SignUp,
      },
      {
        path: "profile",
        Component: Profile,
      },
      {
        path: "*", 
        Component: Main,
      },
    ]}
  
  
;
export default mainRouter;