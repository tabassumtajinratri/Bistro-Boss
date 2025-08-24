import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';

const Navbar = () => {

  const {user, logOut} = useContext(AuthContext)

  const handleLogOut = () =>{
    logOut()
    .then(()=>{})
    .catch(error=> console.log(error))
    

  }

  const navOptions =<>
  <Link className='p-4' to='/'>Home</Link>
  <Link className='p-4' to='/menu'>Menu</Link>
  <Link className='p-4' to='/order/salad'>Order</Link>
  <Link className='p-4' to='/secret'>Secret</Link>
  <Link className='p-4' to='/signUp'>SignUp</Link>

  {
    user?<>
    <span className='mt-8'>{user?.displayName}</span>
    <button onClick={handleLogOut} className="p-4 btn btn-ghost">LogOut</button>
    </>:
    <> <Link className='p-4' to='/login'>LogIn</Link></>
  }
 
   </>




    return (
        <div>
           <div className="navbar fixed z-10 max-w-screen-xl bg-black/30 shadow-sm text-white">
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
  <h1 className="text-3xl mt-2">Bistro Boss</h1>
  <h1 className="text-xl tracking-[0.5em] mt-1">
    RESTAURANT
  </h1>
</div>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
     {navOptions}
    </ul>
  </div>
  <div className="navbar-end">
    <a className="btn">Button</a>
  </div>
</div>
        </div>
    );
};

export default Navbar;