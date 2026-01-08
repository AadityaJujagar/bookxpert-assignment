// 2

import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/Login";
import { Dashboard } from "../pages/Dashboard";
import { authLoader } from "../routes/auth.loader";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    loader: authLoader,
  },
  {
    path: "*",
    element: <Login />,
  },
]);
