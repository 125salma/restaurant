import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useCart = () => {
  const axiosSecure = useAxiosSecure();
  //je user tar data count dekhabo navar e 
  const { user } = useAuth();
  //tan stack query
  const { refetch, data: cart = [] } = useQuery({
    queryKey: ['cart', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/carts?email=${user.email}`);
      return res.data;
    }

  })
  return [cart, refetch]
};

export default useCart;