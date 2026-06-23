import { createBrowserRouter, Navigate } from "react-router";
import { MobileLayout } from "./components/MobileLayout";
import { SplashScreen } from "./screens/SplashScreen";
import { Dashboard } from "./screens/Dashboard";
import { GameModes } from "./screens/GameModes";
import { Performance } from "./screens/Performance";
import { Leaderboard } from "./screens/Leaderboard";
import { Settings } from "./screens/Settings";
import { MemoryMatch } from "./screens/MemoryMatch";
import { LogicPuzzle } from "./screens/LogicPuzzle";

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
      { path: "games/memory-match", Component: MemoryMatch },
      { path: "performance", Component: Performance },
      { path: "leaderboard", Component: Leaderboard },
      { path: "settings", Component: Settings },
      { path: "games/logic-puzzle", Component: LogicPuzzle },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/splash" replace />,
  },
]);
