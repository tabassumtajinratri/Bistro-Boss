import React from 'react';
import useCarts from '../Hooks/useCarts';
import { FaRegTrashAlt } from "react-icons/fa";
import Swal from 'sweetalert2';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const Cart = () => {
    const [cart, refetch]= useCarts()
    const totalPrice = cart.reduce((total, item)=>total+item.price, 0)
    const axiosSecure = useAxiosSecure()
    const handleDelete  = id =>{
        Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
   
    axiosSecure.delete(`/carts/${id}`)
    .then(res=>{
        if(res.data.deletedCount>0){
            refetch()
            Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
            });

        }
    })
  }
});

    }
    return (
        <div>
           <div className='flex justify-center gap-20'>
             <h2 className='text-4xl'>Items: {cart.length}</h2>
             <h2>Total Prices: {totalPrice}</h2>
             <button className='btn btn-primary'>Pay</button>
           </div>
           <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>#</th>
        <th>Image</th>
        <th>Name</th>
        <th>Price</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>

        {
            cart.map((item, index)=><tr key={item._id}>
        <th>
            {index+1}
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={item.image}
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
           
          </div>
        </td>
        <td>
         {item.name}
        </td>
        <td> ${item.price}</td>
        <th>
      <button onClick={()=> handleDelete(item._id)}>   <FaRegTrashAlt /></button>
        </th>
      </tr>
            )
        }
      {/* row 1 */}
      
    </tbody>
  </table>
</div>
        </div>
        
    );
};

export default Cart;