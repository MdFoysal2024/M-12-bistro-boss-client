import React from 'react';
import { useForm } from 'react-hook-form';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';

const AddItems = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data)
    };

    return (
        <div className="p-12">
            <SectionTitle
                heading={'ADD AN ITEM'}
                subHeading={"What's new?"}
            ></SectionTitle>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <label className="form-control w-full mb-6">
                        <div className="label">
                            <span className="label-text">Recipe Name*</span>
                        </div>
                        <input
                            type="text"
                            {...register("name")}
                            placeholder="Recipe Name here..."
                            className="input input-bordered w-full " />
                    </label>

                    <div className='flex gap-6 flex-col md:flex-row'>


                        <label className="form-control w-full mb-6">
                            <div className="label">
                                <span className="label-text">Category*</span>
                            </div>
                            <select {...register("category")}
                                className="select select-bordered w-full ">
                                <option disabled selected>Category</option>
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
                                {...register("price")}
                                placeholder="Recipe Price here..."
                                className="input input-bordered w-full " />
                        </label>
                    </div>
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Recipe Details</span>
                        </div>
                        <textarea 
                        {...register("textarea")}
                        className="textarea textarea-bordered h-24" 
                        placeholder="Recipe Details Type Here..."
                        ></textarea>
                    </label>


                    <input className='btn mt-6 px-8  font-bold  text-white bg-amber-600' type="submit"  value={'Add Item'}/>
                </form>
            </div>
        </div>
    )
};

export default AddItems;