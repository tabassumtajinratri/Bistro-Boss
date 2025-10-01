import { NavLink, Outlet } from "react-router-dom";
import { FaCartShopping} from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { MdRateReview } from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";
import { FaSearch } from "react-icons/fa";
import useCarts from "../Hooks/useCarts";
import { IoIosContact } from "react-icons/io";
import useAdmin from "../Hooks/useAdmin";
const Dashboard = () => {
    const [cart]=useCarts()

    const [isAdmin] = useAdmin();


    return (
        <div className="flex justify-around">
            <div className="min-h-screen w-64 bg-amber-400">
                <ul className="menu p-4">
                     {
                        isAdmin ? <>
                        <li>
                        <NavLink to='/dashboard/adminHome'>  <FaHome />Admin Home</NavLink>   
                    </li>
                    <li>
                        <NavLink to='/dashboard/addItems'>  <SlCalender />AddItems</NavLink>   
                    </li>
                    <li>
                        <NavLink to='/dashboard/manageItems'> <FaCartShopping/>ManageItems</NavLink>   
                    </li>

                       <li>
                        <NavLink to='/dashboard/managebooking'>  <MdRateReview />Manage Bookings</NavLink>   
                    </li>

                       <li>
                        <NavLink to='/dashboard/allUsers'>  <TbBrandBooking />All Users</NavLink>   
                    </li>
                        
                        </>:
                        <>
                        <li>
                        <NavLink to='/dashboard/userHome'>  <FaHome />UserHome</NavLink>   
                    </li>
                    <li>
                        <NavLink to='/dashboard/resarvation'>  <SlCalender />Resarvation</NavLink>   
                    </li>
                    <li>
                        <NavLink to='/dashboard/cart'> <FaCartShopping/>My Cart ({cart.length})</NavLink>   
                    </li>

                       <li>
                        <NavLink to='/dashboard/review'>  <MdRateReview />Add Review</NavLink>   
                    </li>

                       <li>
                        <NavLink to='/dashboard/booking'>  <TbBrandBooking />My Booking</NavLink>   
                    </li>
                        </>
                     }


                      <div className="divider"></div>
                        <li>
                        <NavLink to='/'>  <FaHome />Home</NavLink>   
                    </li>

                    <li>
                       <NavLink to='/order/salad'>  <FaSearch />Menu</NavLink>   
                    </li>

                     <li>
                       <NavLink to='/contact'>  <IoIosContact />Contact</NavLink>   
                    </li>
                </ul>

            </div>
            <div className="flex p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;

