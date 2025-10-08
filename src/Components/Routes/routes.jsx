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
import Dashboard from "../Dashboard/Dashboard";
import Cart from "../Cart/Cart";
import AllUsers from "../AllUsers/AllUsers";
import Additems from "../Additems/Additems";
import Adminroutes from "../Adminroutes/Adminroutes";
import ManageItems from "../ManageItems/ManageItems";
import UpdateItem from "../UpdateItem/UpdateItem";
import Payment from "../Payment/Payment";
import PaymentHistory from "../PaymentHistory/PaymentHistory";
import UserHome from "../UserHome/UserHome";
import AdminHome from "../AdminHome/AdminHome";
import Contact from "../Contact/Contact";

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
        },
            {
        path: '/contact',
        element: <Contact></Contact>
      }
       
    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children:[
      {
        path: 'userHome',
        element: <UserHome></UserHome>
      },
       {
        path: 'cart',
        element: <Cart></Cart>
      },

       {
        path: 'payment',
        element: <Payment></Payment>
      },
      {
        path: 'paymentHistory',
        element: <PaymentHistory></PaymentHistory>
      },
    


      //admin

       {
        path:'adminHome',
        element:<Adminroutes><AdminHome></AdminHome></Adminroutes>
      },

      {
        path:'allUsers',
        element:<AllUsers></AllUsers>
      },
      {
        path: 'addItems',
        element: <Adminroutes><Additems></Additems></Adminroutes>
      },
      {
        path: 'updateItem/:id',
        element: <Adminroutes><UpdateItem></UpdateItem></Adminroutes>,
        loader: ({params})=> fetch(`http://localhost:5000/menu/${params.id}`)
      },
       {
        path: 'manageItems',
        element: <Adminroutes><ManageItems></ManageItems></Adminroutes>
      }
    ]
  }
]);