import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { publicRouter, privateRouter } from "./configs/routes";
import Cookies from "js-cookie";
import "./App.scss";

const userPresent = !!Cookies.get("userPresent");
const role = !!Cookies.get("role");

function App() {
  return (
    <Router>
      <Routes>
        {publicRouter.map((router) => {
          return router.map((route, index) => {
            return (
              <Route path={route.path} key={index} element={<route.element />}>
                {route.children.map((children, index) => {
                  return (
                    <Route
                      path={children.path}
                      element={<children.element />}
                      key={index}
                    />
                  );
                })}
              </Route>
            );
          });
        })}
        {userPresent
          ? privateRouter.map((routers) => {
              console.log(routers);
            })
          : null}
      </Routes>
    </Router>
  );
}

export default App;
