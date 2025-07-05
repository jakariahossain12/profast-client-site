import { createBrowserRouter } from "react-router";
import MainLayOut from "../layout/MainLayOut";
import Home from "../pages/Home/Home";
import CoverageMap from "../components/CoverageMap/CoverageMap";
import AuthLayOut from "../layout/AuthLayOut";
import SignIn from "../pages/UserAuthentiction/Sign_In/SignIn";
import Register from "../pages/UserAuthentiction/Register/Register";
import PrivateRoute from "../private/PrivateRoute";
import AddParcel from "../pages/UserPage/AddParcel";
import AddParcelForm from "../pages/UserPage/AddParcel";
import DashBoard from "../layout/DashBoard";
import MyParcel from "../pages/UserPage/MyParcel";
import Payment from "../pages/UserPage/Payment";
import PaymentHistory from "../pages/UserPage/PaymentHistory";
import TrackPackage from "../pages/UserPage/TrackPackage";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayOut,
    children: [
      { index: true, Component: Home },
      {
        path: "coverage-map",
        Component: CoverageMap,
        loader: () => fetch("/warehouses.json"),
      },
      {
        path: "add-parcel",
        element: (
          <PrivateRoute>
            <AddParcelForm></AddParcelForm>
          </PrivateRoute>
        ),
        loader: () => fetch("/warehouses.json"),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayOut,
    children: [
      { path: "sign-in", Component: SignIn },
      { path: "register", Component: Register },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashBoard></DashBoard>
      </PrivateRoute>
    ),
    children: [
      { path: 'my-parcel', Component: MyParcel },
      { path: "/dashboard/payment/:parcelId", Component: Payment },
      { path: "payment-history",Component:PaymentHistory },
      { path: "track",Component:TrackPackage },
    ],
  },
]);