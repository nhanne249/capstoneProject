import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import 'semantic-ui-css/semantic.min.css'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
