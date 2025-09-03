import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'http://localhost:5000'
})



const useAxiosSecurePublic = () => {
    return axiosPublic;
};

export default useAxiosSecurePublic;