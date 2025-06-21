import { createBrowserRouter } from "react-router";
import MainLayOut from "../layout/MainLayOut";
import Home from "../pages/Home/Home";
import CoverageMap from "../components/CoverageMap/CoverageMap";
import AuthLayOut from "../layout/AuthLayOut";
import SignIn from "../pages/UserAuthentiction/Sign_In/SignIn";
export const router = createBrowserRouter([
  {
    path: "/",
        Component: MainLayOut,
        children: [
          { index: true, Component: Home },
          {path:'coverage-map',Component:CoverageMap,loader:()=>fetch('/warehouses.json')}
    ]
  },
  {
    path: '/',
    Component: AuthLayOut,
    children: [
      {path:'sign-in',Component:SignIn}
    ]
  }
]);