
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import useMenu from "../Hooks/useMenu";
import SectionTitle from "../SectionTitle/SectionTitle";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const ManageItems = () => {
  const [menu, loading, refetch] = useMenu();
  const axiosSecure = useAxiosSecure()

  const handleDeleteItems = (item) =>{
    Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then(async (result) => {
  if (result.isConfirmed) {
    const res = await axiosSecure.delete(`/menu/${item._id}`)
    console.log(res.data)
    if(res.data.deletedCount>0){
      refetch()
  Swal.fire({
  position: "top-end",
  icon: "success",
  title: `${item.name},Your work has been saved`,
  showConfirmButton: false,
  timer: 1500
});
    }

  }
});

  }

  return (
    <div>
      <SectionTitle heading="Manage All Items" subheading="Hurry Up"></SectionTitle>

      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {menu.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={item.image}
                          alt={item.name}
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>
                <Link to={`/dashboard/updateItem/${item._id}`}><button><FaEdit/></button></Link>
                </td>
                <td>
                  <button onClick={()=> handleDeleteItems(item)}>  <FaRegTrashAlt/>  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageItems;
