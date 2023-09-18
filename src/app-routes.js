import { lazy } from "react";
import { withNavigationWatcher } from "./contexts/navigation";

const homePage = lazy(() => import("./pages/home/home"));
const sortingPage = lazy(() => import("./pages/sorting/sorting"));
const pathfindingPage = lazy(() => import("./pages/pathfinding/pathfinding"));
const mazebuildingPage = lazy(() => import("./pages/mazebuilding/mazebuilding"));
const noisePage = lazy(() => import("./pages/noise/noise"));

const routes = [
  {
    path: "/home",
    element: homePage,
  },
  {
    path: "/sorting",
    element: sortingPage,
  },
  {
    path: "/pathfinding",
    element: pathfindingPage,
  },
  {
    path: "/mazebuilding",
    element: mazebuildingPage,
  },
  {
    path: "/noise",
    element: noisePage,
  },
];

export default routes.map((route) => {
  return {
    ...route,
    element: withNavigationWatcher(route.element, route.path),
  };
});
