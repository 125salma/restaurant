import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://restaurant-server-one-alpha.vercel.app'
})
const useAxiosPublic = () => {

    return axiosPublic;
};

export default useAxiosPublic;