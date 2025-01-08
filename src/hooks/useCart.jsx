import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";




const useCart = () => {

    //used Tan Stack Query Code-->

    // Tan Stack Query use for advance data fetching/loading-->
    // Tan Stack Query  এর মেথড টা ব্যবহার করা হয় advance data লোড এর জন্য 
    // যেখানে  custom hooks এর axiosSecure দিয়ে localhost:500 এর base url আসছে এবং   ' /carts ' এটা হলো ডাটাবেজের ডাটার রাউট


    const axiosSecure = useAxiosSecure();
    const { data: cart = [] } = useQuery({
        queryKey: ['cart'],
        queryFn: async () => {
            const res = await axiosSecure.get('/carts')
            return res.data;
        }

    })

    return [cart]


};

export default useCart;