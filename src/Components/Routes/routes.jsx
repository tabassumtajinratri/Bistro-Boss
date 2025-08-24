import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../Main/Main";
import Home from "../Home/Home";
import Menu from "../Menu/Menu";
import Order from "../Order/Order";
import LogIn from "../LogIn/LogIn";
import SignUp from "../SignUp/SignUp";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Secret from "../Secret/Secret";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children:[
        {
            path:'/',
            element:<Home></Home>
        },
          {
            path:'/menu',
            element:<Menu></Menu>
        },
          {
            path:'/order/:category',
            element:<Order></Order>
        },
           {
            path:'/logIn',
            element:<LogIn></LogIn>
        },
           {
            path:'/signUp',
            element:<SignUp></SignUp>
        },
         {
            path:'/secret',
            element:<PrivateRoute><Secret></Secret></PrivateRoute>
        }
    ]
  },
]);