import { createBrowserRouter, Navigate } from "react-router";
import { MobileLayout } from "./components/MobileLayout";
import { SplashScreen } from "./screens/SplashScreen";
import { Dashboard } from "./screens/Dashboard";
import { GameModes } from "./screens/GameModes";
import { Performance } from "./screens/Performance";
import { Leaderboard } from "./screens/Leaderboard";
import { Settings } from "./screens/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/splash" replace />,
  },
  {
    path: "/splash",
    Component: SplashScreen,
  },
  {
    path: "/app",
    Component: MobileLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "games", Component: GameModes },
      { path: "performance", Component: Performance },
      { path: "leaderboard", Component: Leaderboard },
      { path: "settings", Component: Settings },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/splash" replace />,
  },
]);
