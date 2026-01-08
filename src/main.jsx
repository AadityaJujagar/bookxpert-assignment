import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import { EmployeeProvider } from "./context/EmployeeContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <EmployeeProvider>
    <App />
  </EmployeeProvider>
);
