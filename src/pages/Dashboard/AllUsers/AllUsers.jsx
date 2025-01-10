import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";


const AllUsers = () => {

    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })



    //User Admin creation Functionality start------->
const handleMakeAdmin =user=>{
    console.log(user)
}




    //User Delete Functionality start------->
    const handleDeleteUser = user => {
        console.log('handle Delete User', user, user._id);
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
                heading={'MANAGE ALL USERS'}
                subHeading={'How many??'}
            ></SectionTitle>

            <h3 className="text-2xl pt-12 font-bold uppercase">Total users: {users.length}</h3>

            All Users


            <div className="overflow-x-auto my-8">
                <table className="table">
                    {/* head */}
                    <thead className="bg-amber-600 text-lg text-white ">
                        <tr className="">
                            <th className="pl-6">
                                #
                            </th>

                            <th> Name</th>
                            <th> Email</th>
                            <th> Role</th>

                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>



                        {
                            users.map((user, idx) => <tr key={user._id}>
                                <th>
                                    {idx + 1}
                                </th>

                                <td>
                                    <p className="font-bold">

                                        {user.name}
                                    </p>

                                </td>
                                <td>
                                    {user.email}

                                </td>

                                <th>
                                    <button
                                        onClick={() => handleMakeAdmin(user)}
                                        className=" p-3 btn text-xl text-white bg-amber-600 border-2 rounded-lg "><FaUsers /></button>
                                </th>
                                <th>
                                    <button
                                        onClick={() => handleDeleteUser(user)}
                                        className="btn p-3 text-xl text-white bg-red-600 border-2  rounded-full "><RiDeleteBin2Fill /></button>
                                </th>
                            </tr>)
                        }


                    </tbody>

                </table>
            </div>



        </div>
    );
};

export default AllUsers;