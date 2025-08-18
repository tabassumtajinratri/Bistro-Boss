import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../Main/Main";
import Home from "../Home/Home";
import Menu from "../Menu/Menu";
import Order from "../Order/Order";

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
        }
    ]
  },
]);