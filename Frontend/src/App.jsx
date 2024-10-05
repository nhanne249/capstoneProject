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
          privateRouter.map((routers) => {
            return (
              routers.role == role && (
                <Route
                  path={routers.path}
                  key={routers}
                  element={<routers.element />}
                >
                  {routers.children.map(({ path, Component }, index) => {
                    console.log(path);
                    return (
                      <Route path={path} key={index} element={<Component />} />
                    );
                  })}
                </Route>
              )
            );
          })}
        {publicRouter.map((router, index) => {
          return (
            <Route path={router.path} key={index} element={<router.element />}>
              {router.children.map((children, index) => {
                return (
                  <Route
                    path={children.path}
                    element={<children.Component />}
                    key={index}
                  />
                );
              })}
            </Route>
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
