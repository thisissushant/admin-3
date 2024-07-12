import { lazy } from "react";

// project imports
import MainLayout from "layout/MainLayout";
import Loadable from "ui-component/Loadable";
import ActivateSolution from "views/solutions/ActivateSolution/ActivateSolution";
import { element } from "prop-types";
import CategoryID from "views/solutions/MasterData/categoryID/CategoryID";
import CostCenter from "views/solutions/MasterData/costCenter/CostCenter";
import GlAccount from "views/solutions/MasterData/glAccount/GlAccount";

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import("views/dashboard")));

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <DashboardDefault />,
    },
    {
      path: "solutions",
      children: [
        {
          path: "activateSolution",
          element: <ActivateSolution />,
        },
        {
          path: "masterData",
          children: [
            {
              path: "categoryID",
              element: <CategoryID/>,
            },
            {
              path: "costCenter",
              element: <CostCenter/>,
            },
            {
              path: "glAccount",
              element: <GlAccount/>,
            }
          ]
        },
      ],
    },
  ],
};

export default MainRoutes;
