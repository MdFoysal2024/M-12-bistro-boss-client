import { RiDeleteBin2Fill } from "react-icons/ri";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useCart from '../../../hooks/useCart';
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";


const Cart = () => {


    // custom hooks-->
    const [cart, refetch] = useCart();
    const axiosSecure = useAxiosSecure()

    //cart এর প্রতিটি ডাটা থেকে price টা নিয়ে reduce কে apply করে যোগ ফল বের করতে হবে । যেখানে reduce এর ভিতরে (পূর্বের মান , বর্তমান মান) কে প্যারামিটার হিসাবে পাঠিয়ে পরে তাদের যোগ করা হয়, 

    // const sum = numbers.reduce((পূর্বের মান , বর্তমান মান)=>{ return পূর্বের মান + বর্তমান মান},  ইনিসিয়াল মান শুন্য )  

    // console.log(sum);


    // এখানে টোটাল যোগ করার জন্য reduce এর ভিতরে পূর্বের মান + বর্তমান এর পাশাপাশি ইনিসিয়াল মান শুন্য রাখতে হবে। এটা reduce দিয়ে যোগ করার রুলস।


    // --------reduce code processing--->
    // const numbers = [1, 2, 3, 4, 5];
    // const sum = numbers.reduce((accumulator, currentValue) => {
    //     return accumulator + currentValue;
    // }, 0);
    // console.log(sum); // Output: 15


    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    // console.log(totalPrice);



    //Data Delete Functionality-->
    const handleDelete = id => {
        console.log('Data Delete', id)

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
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch();

                            // refetch();--> tanstack query এর refetch(); কে ব্যবহার করলে সে ওয়েব সাইটকে অটো রিলোড করে আপডেট করবে এবং ডিলিট করে পরবর্তি ডাটা/ডাটা কাউন্ট দেখানোর জন্য const remaining = data.filter() করে পরবর্তি ডাটা/ডাটা কাউন্ট দেখা লাগবে না, tanstack query এর refetch() সেটা আরো সহজে করে দিবে।
                        }
                    })


            }
        });

    }








    return (
        <div className="p-12">
            <SectionTitle
                heading={'WANNA ADD MORE?'}
                subHeading={'My Cart'}
            ></SectionTitle>
            <h2 className="text-5xl my-12 text-center font-medium">My Cart</h2>
            <div className="flex justify-between">


                <h3 className="text-2xl font-bold uppercase">total  Orders: {cart.length}</h3>

                <h3 className="text-2xl font-bold uppercase">total price: ${totalPrice}</h3>



                <div>
                    {
                        cart.length ?
                            <Link to='/dashboard/payment'>
                                <button className="bg-amber-600 py-2 font-bold px-8 rounded-lg text-white">PAY</button>
                            </Link>
                            :
                            <button disabled className="bg-amber-600 btn py-2 font-bold px-8 rounded-lg text-white">PAY</button>
                    }
                </div>

            </div>

            <div className="overflow-x-auto my-8">
                <table className="table">
                    {/* head */}
                    <thead className="bg-amber-600 text-lg text-white ">
                        <tr className="">
                            <th className="pl-6">
                                #
                            </th>
                            <th className=" py-6">Food Image</th>
                            <th>Food Name</th>
                            <th>User Email</th>
                            <th>Food Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>



                        {
                            cart.map((item, idx) => <tr key={item._id}>
                                <th>
                                    {idx + 1}
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
                                    <p className="font-bold">

                                        {item.name}
                                    </p>

                                </td>
                                <td>
                                    {item.email}

                                </td>
                                <td>${item.price}</td>
                                <th>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className=" p-3 text-xl text-red-600 border-2 border-gray-300 rounded-full hover:bg-slate-300"><RiDeleteBin2Fill /></button>
                                </th>
                            </tr>)
                        }


                    </tbody>

                </table>
            </div>

        </div>
    );
};

export default Cart;