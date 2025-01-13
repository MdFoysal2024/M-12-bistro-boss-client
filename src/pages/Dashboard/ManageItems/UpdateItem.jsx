import React from 'react';
import { useLoaderData } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

//VITE_IMAGE_HOSTING_KEY এটা -->.env.local থেকে আনা হইছে, যার ভিতরে https://api.imgbb.com/ এই সাইট থেইকা একটা API কোড রাখা হইছে image হোস্টিং লাইগা 
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;

// https://api.imgbb.com/1/upload---->https://api.imgbb.com/ এই সাইট থেইকা একটা Image Upload url আনা হইছে image হোস্টিং লাইগা যার ভিতরে  ডায়নামিক ভাবে `?key=${image_hosting_key}` image_hosting_key টা বসাতে হবে।
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

// ক্লাইন্ট সাইটের img choose field হতে img choose করার পরে সেটা imgbb তে যাবে এবং  img টা আপলোড হয়ে একটি url ওয়েব সাইট কে পাঠাবে।











const UpdateItem = () => {
    
    const item = useLoaderData();
    //console.log(item)

    const { name, category, price, recipe, _id } = item || {}
    //console.log(name)

    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const { register, handleSubmit, reset } = useForm();


    const onSubmit = async (data) => {
        console.log(data);

        // ক্লাইন্ট সাইটের img choose field হতে img choose করার পরে সেটা imgbb তে যাবে এবং  img টা আপলোড হয়ে একটি url ওয়েব সাইট কে পাঠাবে।

        const imageFile = { image: data.image[0] };
        // ক্লাইন্ট সাইটের img choose field হতে img কে choose করে submit বাটনে ক্লিক করে console এ গেলে দেখা যাবে img এর জন্য একটি file list তৈরী হবে, যেখানে img কে [0] ইনডেক্স এ রাখা হইছে, সেখানেই আমাদের url সেট করতে হবে উপরের নিয়মে ভেরিয়েবলে ভিতরে রেখে । -->const imageFile = { image: data.image[0] }


        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        // axios/axios_custom_hooks দিয়ে image_hosting_api কে post করলে image_hosting_api এর পাশাপাশি headers: {'Content-Type': 'multipart/form-data'} কে যুক্ত করতে হবে।

        console.log(res.data);

        //  যদি image_hosting_api থেকে url পাওয়া যায় তাহলে console.log(res.data); এই লাইন হতে success:true মেসেজ দিবে, এবং data.data.display_url এ image এর একটা hosting url দিবে, সেখান থেকে image url এবং বাকি ডাটা ইনপুট ফিল্ড থেকে নিয়ে  সকল ডাটা সার্ভারে পোস্ট করতে হবে।

        if (res.data.success) {
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url
            }
            const updateItem = await axiosSecure.patch(`/menu/${_id}`, menuItem)
            console.log(updateItem.data);
            if (updateItem.data.modifiedCount>0) {

                //show success alert/popup
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `${data.name} is Updated to the Item.`,
                    showConfirmButton: false,
                    timer: 1500
                });

                //clean the form-->
                //reset();
            }
        }
        console.log('with img url', res.data);


    };


    return (
        <div className="p-12">
            <SectionTitle
                heading={'UPDATE ITEM'}

            ></SectionTitle>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <label className="form-control w-full mb-6">
                        <div className="label">
                            <span className="label-text">Recipe Name*</span>
                        </div>
                        <input
                            type="text"
                            {...register("name", { required: true })}
                            defaultValue={name}
                            className="input input-bordered w-full " />
                    </label>

                    <div className='flex gap-6 flex-col md:flex-row'>


                        <label className="form-control w-full mb-6">
                            <div className="label">
                                <span className="label-text">Category*</span>
                            </div>
                            <select defaultValue={category} {...register("category", { required: true })}
                                className="select select-bordered w-full ">
                                <option disabled value="default">Category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>

                            </select>
                        </label>
                        <label className="form-control w-full mb-6">
                            <div className="label">
                                <span className="label-text">Price*</span>
                            </div>
                            <input
                                type="number"
                                {...register("price", { required: true })}
                                defaultValue={price}
                                className="input input-bordered w-full " />
                        </label>
                    </div>
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Recipe Details</span>
                        </div>
                        <textarea
                            {...register("recipe", { required: true })}
                            className="textarea textarea-bordered h-24"
                            defaultValue={recipe}
                        ></textarea>
                    </label>
                    <div>
                        <input
                            {...register("image", { required: true })}
                            type="file"
                            className="file-input mt-4 file-input-bordered w-full " />
                    </div>

                 

                        <button className='btn  mt-6 text-lg px-24  font-bold  text-white bg-amber-600 hover:bg-amber-700' type="submit">Update Recipe</button>
                   
                </form>
            </div>
        </div>
    );
};

export default UpdateItem;