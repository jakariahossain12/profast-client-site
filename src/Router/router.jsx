import { createBrowserRouter } from "react-router";
import MainLayOut from "../layout/MainLayOut";
import Home from "../pages/Home/Home";
export const router = createBrowserRouter([
  {
    path: "/",
        Component: MainLayOut,
        children: [
        {index:true,Component:Home}
    ]
  },
]);