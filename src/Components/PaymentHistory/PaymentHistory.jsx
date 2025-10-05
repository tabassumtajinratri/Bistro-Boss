import React from 'react';
import useAuth from '../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const PaymentHistory = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()

    const {data: payments = []} = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/payments/${user.email}`)
            return res.data
        }
    })


    return (
        <div>
             <h1 className='text-3xl'>Total Payments: {payments.length}</h1>
             <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>#</th>
        <th>Price</th>
        <th>Tranaction Id</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
     {payments.map((payment, index)=><tr key={payment._id}>
       <th>{index + 1}</th>
        <td>${payment.price}</td>
        <td>{payment.transactionId}</td>
        <td>{new Date(payment.date).toLocaleDateString()}</td>
      </tr>)}
      
    </tbody>
  </table>
</div>
        </div>
    );
};

export default PaymentHistory;


