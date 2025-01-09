import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";




const useCart = () => {
    //custom hooks-->
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();


    //used Tan Stack Query Code-->

    // Tan Stack Query use for advance data fetching/loading-->

    // Tan Stack Query documentation-->

    // data: cart = []  পুরো টাই ১টা ডাটা যেখানে  data এর জায়গাতে  cart কে সেট করা হইছে এবং  cart এর ডিফল্ট মান ফাকা [] array রাখা হয়েছে।

    const { refetch, data: cart = [] } = useQuery({

        // refetch the cart-->সার্ভারে ডাটা post কম্পোনেন্ট এর নিচে করার ডাটা post পর custom hooks --> const [ , refetch] = useCart(); এর refetch(); কে কল করলে Navbar এর shopping cart এ ১, ১  করে add/যোগ হয়ে shopping cart এর মান আপডেট হবে।  

        queryKey: ['cart', user?.email],
        queryFn: async () => {

            // Tan Stack Query  এর মেথড টা ব্যবহার করা হয় advance data লোড এর জন্য 
            // যেখানে  custom hooks এর axiosSecure দিয়ে localhost:5000 এর base url আসছে এবং   ' /carts ' এটা হলো ডাটাবেজের ডাটার রাউট

            //get(`/carts?email=${user?.email}`)--> একটা নির্দিষ্ট ইমেল দিয়ে যে ডাটা গুলো add করা হবে, সে গুলোই আসবে। 

            const res = await axiosSecure.get(`/carts?email=${user.email}`)
            return res.data;
        }

    })

    return [cart, refetch]


};

export default useCart;