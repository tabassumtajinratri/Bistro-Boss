import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { FaRegTrashAlt, FaUser } from "react-icons/fa";
import Swal from "sweetalert2";


const AllUsers = () => {
    const axiosSecure = useAxiosSecure()
    const {data: users = [], refetch} = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data
            
        }
    })

    const handleMakeAdmin = user =>{
        axiosSecure.patch(`/users/admin/${user._id}`)
        .then(res=>{
            console.log(res.data)
            if(res.data.modifiedCount > 0){
                refetch()
                Swal.fire({
  position: "top-end",
  icon: "success",
  title: `${user.name} is an Admin Now!`,
  showConfirmButton: false,
  timer: 1500
});
            }
        })
    }

    const handleDeleteUser = user =>{
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
           
            axiosSecure.delete(`/users/${user._id}`)
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
            <div className="flex justify-evenly gap-96 my-4">
                <h2 className="allUsers">All Users</h2>
                <h2 className="allUsers">Total Users: {users.length}</h2>
            </div>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
  <table className="table w-full">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {
        users.map((user, index)=> <tr key={user._id}>
        <th>{index+1}</th>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>

            {
              user.role=== 'admin'? 'Admin' : <button onClick={()=> handleMakeAdmin(user)}>  <FaUser/></button>
            }

        </td>
        <td><button onClick={()=> handleDeleteUser(user)}>  <FaRegTrashAlt/>  </button></td>
      </tr>)


      }
      
      
     
    </tbody>
  </table>
</div>
        </div>
    );
};

export default AllUsers;