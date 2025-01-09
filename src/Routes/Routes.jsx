import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Main from "../Main/Main";
import Home from "../pages/Home/Home/Home";
import Menu from "../pages/Menu/Menu/Menu";
import Order from "../pages/Order/Order/Order";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Secret from "../pages/Shared/Secret/Secret";
import Dashboard from "../Layout/Dashboard/Dashboard";
import Cart from "../pages/Dashboard/Cart/Cart";


const router = createBrowserRouter([
    //Main routes section--------->
  {
    path: "/",
    element: <Main />,
    //   errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
      {
        path: "/order",
        element: <Order />,
      },
      {
        path: "/order/:category", //for dynamic tab category
        element: <Order />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
      {
        path: "/secret",
        element: (
          <PrivateRoute>
            <Secret></Secret>
          </PrivateRoute>
        ),
      },
    ],

  },

  //Dashboard routes section--------->
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      {
        path: 'cart',
        element: <Cart></Cart>
      }
    ]
  }

]);

export default router;