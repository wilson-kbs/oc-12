import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";

import ProfileLayout from "src/layouts/profileLayout/ProfileLayout.tsx";
import DefaultLayout from "src/layouts/defaultLayout/DefaultLayout.tsx";
import ProfilePage, {
  loader as profilePageLoader,
} from "src/pages/profilePage/ProfilePage.tsx";

const routes: RouteObject[] = [
  {
    element: <DefaultLayout />,
    children: [
      {
        path: "/profile",
        element: <ProfileLayout />,
        children: [
          {
            path: "",
            element: <ProfilePage />,
            loader: profilePageLoader,
          },
        ],
      },
      {
        path: "*",
        element: <Navigate replace to="/profile" />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes, {
  basename: import.meta.env.VITE_PREFIX_PATH || "/",
});
