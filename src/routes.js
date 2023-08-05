import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
//
import BlogPage from "./pages/BlogPage";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import Page404 from "./pages/Page404";
import ProductsPage from "./pages/ProductsPage";
import DashboardAppPage from "./pages/DashboardAppPage";
import NutritionPage from "./pages/NutritionPage";

import ExerciseDetail from "./pages/ExerciseDetail";
import Home from "./pages/Home";
import SignUpPage from "./pages/SignupPage";
import ViewRecette from "./pages/nutrition/ViewRecette";
import EditRecette from "./pages/nutrition/EditRecette";

export default function Router() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/exercise/:id",
      element: <ExerciseDetail />,
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: "app", element: <DashboardAppPage /> },
        { path: "user", element: <UserPage /> },
        { path: "products", element: <ProductsPage /> },
        {
          path: "nutrition",
          element: <NutritionPage />,
          // children: [{ path: "view/:id", element: <ViewRecette /> }],
        },
        { path: "nutrition/view/:id", element: <ViewRecette /> },
        { path: "nutrition/edit/:id", element: <EditRecette /> },
        { path: "blog", element: <BlogPage /> },
      ],
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "register",
      element: <SignUpPage />,
    },
    {
      path: "404",
      element: <Page404 />,
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
