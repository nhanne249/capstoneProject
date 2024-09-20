import LayoutPage from "../../layouts";
import Main from "../../pages/Main/index";

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
        path: "about",
        element: Main,
      },
    ]
  },
  
];
export default mainRouter;