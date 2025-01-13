import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import useMenu from '../../../hooks/useMenu';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { FaEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';

const ManageItems = () => {
    const [menu, , refetch] = useMenu()
    const axiosSecure = useAxiosSecure();

    const handleDeleteItem = item => {
        console.log('Delete Item', item._id)
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


                const res = await axiosSecure.delete(`/menu/${item._id}`);
                console.log(res.data)


                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: `${item.name} has been deleted.`,
                        icon: "success"
                    });
                }






            }
        });
    }






    return (
        <div className='p-12'>
            <SectionTitle
                heading={'MANAGE ALL ITEMS'}
                subHeading={"Hurry Up!"}
            ></SectionTitle>


            <div className="flex justify-between">


                <h3 className="text-2xl font-bold uppercase">total  Orders:  {menu.length}</h3>


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
                            <th>Food Price</th>
                            <th>Action</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>



                        {
                            menu.map((item, idx) => <tr key={item._id}>
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

                                <td className=''>${item.price}</td>
                                <th>
                                    <Link to={`/dashboard/updateItem/${item._id}`}>
                                        <button
                                            className=" p-3 text-xl text-red-600 border-2 border-gray-300 rounded-full hover:bg-slate-300"><FaEdit /></button>
                                    </Link>
                                </th>
                                <th>
                                    <button
                                        onClick={() => handleDeleteItem(item)}
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

export default ManageItems;