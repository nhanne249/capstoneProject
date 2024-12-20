import { BrowserRouter, Route, Routes } from "react-router-dom";
import { publicRouter, privateRouter } from "./configs/routes";
import Cookies from "js-cookie";
import "./App.scss";

const userPresent = !!Cookies.get("userPresent");
const role = Cookies.get("role");
function App() {

  return (
    <BrowserRouter>
      <Routes>
        {userPresent &&
          privateRouter.map((routers, key) => {
            return (
              routers.role == role && (
                <Route path={routers.path} key={key} element={<routers.element />}>
                  {routers.children.map(({ subPath, Component }, index) => {
                    return <Route path={subPath} key={index} element={<Component />} />;
                  })}
                </Route>
              )
            );
          })}
        {publicRouter.map((router, index) => {
          return (
            <Route path={router.path} key={index} element={<router.element />}>
              {router.children.map((children, index) => {
                return <Route path={children.path} element={<children.Component />} key={index} />;
              })}
            </Route>
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
