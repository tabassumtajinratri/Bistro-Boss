import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import { FaShoppingCart } from "react-icons/fa";
import useCarts from '../Hooks/useCarts';
import useAdmin from '../Hooks/useAdmin';
const Navbar = () => {

  const {user, logOut} = useContext(AuthContext)
  const [isAdmin] = useAdmin()
  const [cart]= useCarts()

  const handleLogOut = () =>{
    logOut()
    .then(()=>{})
    .catch(error=> console.log(error))
    

  }

  const navOptions =<>
  <Link className='p-4 text-white' to='/'>Home</Link>
  <Link className='p-4 text-white' to='/menu'>Menu</Link>
  <Link className='p-4 text-white' to='/order/salad'>Order</Link>
 {

  user && isAdmin && <li> <Link className='p-4 text-white' to='/dashboard/adminHome'>Dashboard</Link> </li>

 }

  {

  user && !isAdmin && <li> <Link className='p-4 text-white' to='/dashboard/adminHome'>Dashboard</Link> </li>

 }
  <Link className='p-4 text-white' to='/signUp'>SignUp</Link>
  <li>
    <Link to='/dashboard/cart'>
    <button className="btn">
      <FaShoppingCart className='mr-2' />
          <div className="badge badge-sm badge-secondary">+{cart.length}</div>
   </button>
    
    </Link>
  </li>

  {
    user?<>
    {/* <span className='mt-8'>{user?.displayName}</span> */}
    <button onClick={handleLogOut} className="p-4 btn btn-ghost text-white">LogOut</button>
    </>:
    <> <Link className='p-4 text-white' to='/login'>LogIn</Link></>
  }
 
   </>




    return (
        <div className='text-black'>
           <div className="navbar fixed z-10 max-w-screen-xl bg-black/30 shadow-sm text-black">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
      {navOptions}
      </ul>
    </div>
   <div className="flex flex-col">
  <h1 className="text-3xl mt-2 text-white">Bistro Boss</h1>
  <h1 className="text-xl tracking-[0.5em] mt-1 text-white">
    RESTAURANT
  </h1>
</div>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
     {navOptions}
    </ul>
  </div>
  {/* <div className="navbar-end">
    <a className="btn">Let's Explore</a>
  </div> */}
</div>
        </div>
    );
};

export default Navbar;