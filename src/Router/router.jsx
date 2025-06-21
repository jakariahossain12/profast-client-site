import { createBrowserRouter } from "react-router";
import MainLayOut from "../layout/MainLayOut";
import Home from "../pages/Home/Home";
import CoverageMap from "../components/CoverageMap/CoverageMap";
export const router = createBrowserRouter([
  {
    path: "/",
        Component: MainLayOut,
        children: [
          { index: true, Component: Home },
          {path:'coverage-map',Component:CoverageMap,loader:()=>fetch('/warehouses.json')}
    ]
  },
]);