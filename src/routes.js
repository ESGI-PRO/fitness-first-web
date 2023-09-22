import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
//
import ProfilePage from "./pages/ProfilePage";
import MessengerPage from "./pages/messenger/MessengerPage";
import LoginPage from "./pages/LoginPage";
import Page404 from "./pages/Page404";
import TrainingPage from "./pages/training/index";
import MeetingPage from "./pages/meeting/index";
import ExerciseDetail from "./pages/ExerciseDetail";
import Home from "./pages/Home";
import SignUpPage from "./pages/SignupPage";
import NutritionPage from "./pages/NutritionPage";

import ViewRecette from "./pages/nutrition/ViewRecette";
import EditRecette from "./pages/nutrition/EditRecette";

export default function Router() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <SignUpPage />,
    },
    {
      path: "/exercise/:id",
      element: <ExerciseDetail />,
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/meeting" />, index: true },
        {
          path: "nutrition",
          element: <NutritionPage />,
        },
        { path: "nutrition/view/:id", element: <ViewRecette /> },
        { path: "nutrition/edit/:id", element: <EditRecette /> },
        { path: "meeting", element: <MeetingPage /> },
        { path: "messenger", element: <MessengerPage /> },
        { path: "training", element: <TrainingPage /> },
        { path: "profile", element: <ProfilePage /> },
      ],
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
