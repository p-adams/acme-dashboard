import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./index.css";
import { AppDashboard } from "./AppDashboard.tsx";

const router = createBrowserRouter([
  {
    element: (
      <main>
        <h1>TEST</h1>
        <Outlet />
      </main>
    ),
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/dashboard",
        element: <AppDashboard />,
      },
    ],
  },

  {},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
