import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";

import { useEffect, useRef, useState } from "react";

import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

import { useForm } from "react-hook-form"
import Swal from "sweetalert2";

const SignUp = () => {


    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    //npm install react-hook-form ---> Advance form setup
    const { register, handleSubmit, reset, formState: { errors }, } = useForm()

    const onSubmit = (data) => {
        console.log(data)

        createUser(data.email, data.password)
            .then(result => {
                const user = result.user
                console.log(user)

                // setUser(user);

                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        console.log('User Profile Updated');
                        reset();
                    })
                    .catch((error) => {
                        console.log(error);
                    });

                Swal.fire({
                    title: 'Sign Up',
                    text: 'SignUp Successfully',
                    icon: 'success',
                    confirmButtonText: 'Thank You'
                });

                navigate("/");
            })
            .catch((error) => {

                alert(error.code)
            });
    }










    //npm install react-hook-form -->  ব্যবহার করে শর্টকাট করা হলো যেখানে ---> const handleSignUp = (event) =>{} এই ফাংশন আলাদা লিখতে হবে না সব কিছু hook-form এর ভিতরেই সেট করা আছে।

    // const handleSignUp = (event) => {
    //     event.preventDefault();
    //     const name = event.target.name.value;
    //     const email = event.target.email.value;
    //     const password = event.target.password.value;

    //     console.log(name, email, password);


    //     createUser(email, password)
    //         .then(result => {
    //             const user = result.user
    //             console.log(user)

    //             // setUser(user);

    //             // Swal.fire({
    //             //     title: 'Sign In',
    //             //     text: 'Sign In Successfully',
    //             //     icon: 'success',
    //             //     confirmButtonText: 'Thank You'
    //             // })


    //             //navigate(location?.state ? location.state : "/");
    //         })
    //         .catch((error) => {

    //             alert(error.code)
    //         });

    // }









    return (
        <div className='container mx-auto items-center  justify-center  w-full flex flex-col md:flex-row lg:flex-row '>

            <div className=' w-[520px] space-y-4 p-12  my-12 bg-orange-200 shadow-lg '>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>SignIn Page</title>
                    <link rel="canonical" href="http://mysite.com/example" />
                </Helmet>
                <div>
                    <h2 className='text-5xl font-bold text-center pb-6'>
                        <span className="text-orange-600"> SignUp </span>
                        Now
                    </h2>
                </div>


                <form onSubmit={handleSubmit(onSubmit)}
                    className="card-body">

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">User Name</span>
                        </label>
                        <input type="text" name="name" {...register("name", { required: true })} placeholder="Name Here" className="input input-bordered" />
                        {errors.name && <span className="text-red-600">Name field is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <input type="text"  {...register("photoURL", { required: true })} placeholder="http://photoURL..." className="input input-bordered" />
                        {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" name="email" {...register("email", { required: true })} placeholder="Email" className="input input-bordered" />
                        {errors.email && <span className="text-red-600">Email field is required</span>}
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" name="password" {...register("password", {
                            required: true,
                            minLength: 6,
                            maxLength: 20,
                            pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$&*])/
                        })} placeholder="Password" className="input input-bordered" />

                        {/* required error */}
                        {errors.password?.type === "required" && <span className="text-red-600">Password field is required</span>}

                        {/* minLength error */}
                        {errors.password?.type === "minLength" && <span className="text-red-600">Password Must Be 6 Characters</span>}

                        {/* maxLength error */}
                        {errors.password?.type === "maxLength" && <span className="text-red-600">Password Must Be less than 20 Characters</span>}

                        {/* pattern error */}
                        {errors.password?.type === "pattern" && <span className="text-red-600">Password Must Be Uppercase, Lowercase, number and Symbol </span>}

                    </div>




                    <div className="form-control mt-6">
                        <input type="submit" className="btn btn-primary" value='Sign Up' />
                    </div>
                </form>

                <p>Already Have An Account <small className="text-orange-600 font-medium">
                    <Link to='/login' >Please Login</Link>
                </small></p>

            </div>


        </div>
    );
};

export default SignUp;