import LayoutPage from "../../layouts";
import Main from "../../pages/Sections/Main";
import SignIn from "../../pages/Sections/SignIn";
import SignUp from "../../pages/Sections/SignUp";
// import UploadImage from "../../pages/test";
import Product from "../../pages/Sections/Product";
import Cart from "../../pages/Sections/Cart";
import Order from "../../pages/Sections/Order";

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
        path: "cart",
        Component: Cart,
      },
      {
        path: "product/:id",
        Component: Product,
      },
      {
        path: "order",
        Component: Order,
      },
      // {
      //   path: "test",
      //   Component: UploadImage,
      // },
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