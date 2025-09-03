import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";


const AllUsers = () => {
    const axiosSecure = useAxiosSecure()
    const {data: users = []} = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data
            
        }
    })
    return (
        <div>
            <div className="flex justify-evenly gap-96 my-4">
                <h2 className="allUsers">All Users</h2>
                <h2 className="allUsers">Total Users: {users.length}</h2>
            </div>
        </div>
    );
};

export default AllUsers;