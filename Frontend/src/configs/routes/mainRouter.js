import LayoutPage from "../../layouts";
import Main from "../../pages/Sections/Main";
import SignIn from "../../pages/Sections/SignIn";
import SignUp from "../../pages/Sections/SignUp";
import UploadImage from "../../pages/test";

const mainRouter ={ 
    path: "",
    element: LayoutPage,
    children: [
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
        path: "test",
        Component: UploadImage,
      },
      {
        path: "", 
        Component: Main,
      },
      {
        path: "*", 
        Component: Main,
      },
    ]}
  
  
;
export default mainRouter;