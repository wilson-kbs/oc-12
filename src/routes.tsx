import { createBrowserRouter, RouteObject } from "react-router-dom";
import DashboardLayout from "src/layouts/dashboardLayout/DashboardLayout.tsx";
import DefaultLayout from "src/layouts/defaultLayout/DefaultLayout.tsx";

const routes: RouteObject[] = [
  {
    element: <DefaultLayout />,
    path: "/",
    children: [
      {
        path: "",
        element: <></>,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          {
            path: "",
            element: <></>,
          },
        ],
      },
      {
        path: "*",
        element: <></>,
      },
    ],
  },
];

export const router = createBrowserRouter(routes, {
  basename: import.meta.env.VITE_DEMO_PREFIX || "/",
});
