import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { publicRouter, privateRouter } from "./configs/routes";
import Cookies from "js-cookie";
import "./App.scss";
const userPresent = !!Cookies.get("userPresent");
function App() {
  return (
    <Router>
      <Routes>
        {userPresent
          ? privateRouter.map((routers) => {
              console.log(routers);
            })
          : publicRouter.map((router) => {
              return router.map((route, index) => {
                return (
                  <Route
                    path={route.path}
                    key={index}
                    element={<route.element />}
                  >
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
      </Routes>
    </Router>
  );
}

export default App;
