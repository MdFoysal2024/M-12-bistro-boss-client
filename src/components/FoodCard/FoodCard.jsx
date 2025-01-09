import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";


const FoodCard = ({ item }) => {
    const { name, image, price, recipe, category, _id } = item || {};

    // useAuth() is custom hooks
    const { user } = useAuth();
    // console.log(user);

    const [, refetch] = useCart();

    const navigate = useNavigate();
    const location = useLocation();

    //create custom hooks for base url---->useAxiosSecure()
    const axiosSecure = useAxiosSecure();


    const handleAddToCart = () => {
        // console.log(food, user.email)

        if (user && user.email) {
            //console.log(food)

            const cartItem = {
                menuId: _id,
                email: user.email,
                name,
                image,
                price
            }

            //axios.post('http://localhost:5000/carts', cartItem)-->axios এর পরিবর্তে আপডেট ও শর্টকাট করার জন্য custom hooks হিসাবে axiosSecure কে ব্যবহার করছি, যাতে localhost base Url লিংক http://localhost:5000 কে বারবার না লিখে axiosSecure কে সেট করে শুধু রাউট দিয়ে /carts দিলেই হবে।

            axiosSecure.post('/carts', cartItem)
                .then(res => {
                    console.log(res.data)
                    if (res.data.insertedId) {
                        Swal.fire({
                            title: `${name}`,
                            text: 'Cart Add Successfully',
                            icon: 'success',
                            confirmButtonText: 'Thank You'
                        });

                        // refetch the cart-->সার্ভারে ডাটা post করার পর  custom hooks এর  const [, refetch] = useCart(); এর  refetch(); কে কল করলে Navbar এর shopping cart এ ১, ১  করে add/যোগ হয়ে shopping cart এর মান আপডেট হবে।  
                        refetch();
                    }
                })


        }
        else {
            Swal.fire({
                title: "You Are not Logged In",
                text: "Please Login to Add the Cart?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Login "
            }).then((result) => {
                if (result.isConfirmed) {

                    // send the user to the login page

                    //private route যদি সরাসরি পাথ নেম পাঠাতাম তাহলে এখানেও state এর ভিতরে পাথ নেম দেয়া লাগতো, private route থেকে state={{from: location}} এভাবে দেয়ায় এখানেও {state: {from:location}} একই ভাবে from এর ভিতরে locationসেট করা হয়েছে । আগের মাইলেস্টন গুলোতে পাথ নেম দিয়ে করা হয়েছিলো।

                    navigate('/login', { state: { from: location } })
                }
            });
        }



    }













    return (
        <div>
            <div className="card bg-base-100 w-96 shadow-xl">


                <figure className="px-10 pt-10">
                    <img
                        src={image}
                        alt="Image Loading..."
                        className="" />
                </figure>

                <p className="bg-orange-600 absolute px-2 right-0 mt-12 mr-12   text-center  text-white font-bold">${price}</p>

                <div className="card-body items-center text-center">
                    <h2 className="card-title">{name}</h2>
                    <p>{recipe}</p>
                    <div className="card-actions">
                        <button
                            onClick={handleAddToCart}
                            className='btn text-xl   border-0 border-b-4 border-orange-600 hover:text-orange-600 bg-orange-100 text-orange-600 hover:border-2 '>ADD TO CART</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;