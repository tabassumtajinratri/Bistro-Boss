// import React from 'react';
// import useAuth from '../Hooks/useAuth';
// import { useQuery } from '@tanstack/react-query';
// import useAxiosSecure from '../Hooks/useAxiosSecure';
// import { FaBook, FaDollarSign, FaJediOrder, FaUser } from 'react-icons/fa6';

// const AdminHome = () => {
//     const {user}= useAuth();
//     const axiosSecure = useAxiosSecure()

//     const {data: stats}= useQuery({
//         queryKey: ['admin-stats'],
//         queryFn: async()=>{
//             const res = await axiosSecure.get('/admin-stats')
//             return res.data
//         }
        
//     })



//     return (
//         <div className='text-3xl'>
//             <h1>Hi, Welcome</h1>
//             {
//                 user?.displayName ? user.displayName : 'Back'
//             }

//             <div className="stats shadow">
//   <div className="stat">
//     <div className="stat-figure text-secondary">
//      <FaDollarSign></FaDollarSign>
//     </div>
//     <div className="stat-title">Revenue</div>
//     <div className="stat-value">${stats?.revenue}</div>
//     <div className="stat-desc">Jan 1st - Feb 1st</div>
//   </div>

//   <div className="stat">
//     <div className="stat-figure text-secondary">
//       <FaUser></FaUser>
//     </div>
//     <div className="stat-title"> Users</div>
//     <div className="stat-value">{stats.users}</div>
//     <div className="stat-desc">↗︎ 400 (22%)</div>
//   </div>

//   <div className="stat">
//     <div className="stat-figure text-secondary">
//    <FaJediOrder></FaJediOrder>
//     </div>
//     <div className="stat-title">Orders</div>
//     <div className="stat-value">{stats.order}</div>
//     <div className="stat-desc">↘︎ 90 (14%)</div>
//   </div>


//     <div className="stat">
//     <div className="stat-figure text-secondary">
//    <FaBook></FaBook>
//     </div>
//     <div className="stat-title">Menu Items</div>
//     <div className="stat-value">{stats.menuItems}</div>
//     <div className="stat-desc">↘︎ 90 (14%)</div>
//   </div>
// </div>
//         </div>
//     );
// };

// export default AdminHome;


import React from 'react';
import useAuth from '../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { FaBook, FaDollarSign, FaJediOrder, FaUser } from 'react-icons/fa6';

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin-stats');
      return res.data;
    },
  });

  if (!stats) {
    return <p className="text-center text-lg mt-10">Loading admin stats...</p>;
  }

  return (
    <div className="text-3xl">
      <h1>Hi, Welcome {user?.displayName ? user.displayName : 'Back'}</h1>

      <div className="stats shadow mt-6">
        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaDollarSign />
          </div>
          <div className="stat-title">Revenue</div>
          <div className="stat-value">${stats.revenue}</div>
          <div className="stat-desc">Jan 1st - Feb 1st</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaUser />
          </div>
          <div className="stat-title">Users</div>
          <div className="stat-value">{stats.users}</div>
          <div className="stat-desc">↗︎ 400 (22%)</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaJediOrder />
          </div>
          <div className="stat-title">Orders</div>
          <div className="stat-value">{stats.order}</div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaBook />
          </div>
          <div className="stat-title">Menu Items</div>
          <div className="stat-value">{stats.menuItems}</div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
