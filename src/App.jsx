import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";

export const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 text-slate-800 antialiased">
      <RouterProvider router={router} />
    </div>
  );
};
