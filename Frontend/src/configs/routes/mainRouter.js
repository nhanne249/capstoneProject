import Main from "../../pages/Main/index";
import LayoutPage from "../../layouts";

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
    ]
  },
  
];
export default mainRouter;