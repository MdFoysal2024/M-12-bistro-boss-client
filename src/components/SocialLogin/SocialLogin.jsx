import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const SocialLogin = () => {

    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic();
    const { googleSignIn } = useAuth();

    //Google দিয়ে login করলে তো বুঝা যাবে না যে new user/old user
    // সাধারন ভাবে কোনো নতুন user যখন register/signUp করবে তখন তার ডাটা সাভাবিক ভাবেই সার্ভারে আসবে, কিন্তু Google দিয়ে বারবার login করলে তো বুঝা যাবে না যে new user/old user সে ক্ষেত্রে তার ইমেল টা প্রথমে সার্ভারে পাঠিয়ে চেক করবে যে সে এর আগে লগিন করে ছিলো কিনা, যদি তার ইমেইল না পায় অর্থাৎ সে যদি প্রথম/new user হয় তবে তার {ইমেইল, নাম } সার্ভারে রেকর্ড করা হবে, আর যদি পূর্বে লগিন করে থাকে তাহলে সে লগিন করতে পারবে কিন্তু তার {ইমেইল, নাম } পুনরায় সার্ভারে রেকর্ড করবে না, console এ { message: 'user already exists here'} মেসেজ দিবে।


    const handleGoogleSingIn = () => {

        googleSignIn()
            .then(result => {
                console.log(result.user)

                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName
                }

                //কোনো ফর্ম ছাড়া নতুন Google দিয়ে SingIn করা user এর ডাটা কে সার্ভারে/ডাটাবেজে পাঠাতে axiosPublic.post('/users', userInfo) কে ব্যবহার করছি যেখানে কাস্টম হুক এর ভিতরে থাকা base Url দিয়ে  post method  করে সার্ভারে ডাটা পাঠিয়েছি । এখানে user Info গুলো একটি ভেরিয়েবলের ভিতরে রেখেছি {result.user?.email, result.user?.displayName} । আর এই ডাটা গুলো Google দিয়ে SingIn করার পরে পেয়েছি  .

                //axiosPublic.post('/users', userInfo)
                //--> এই লাইন দিয়ে new user এর শুধু name ও email নিয়ে সার্ভারে রেকর্ড হবে।


                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data)

                        navigate('/');
                    })
            })
    }


    return (
        <div>
            <div>
                <button
                    onClick={handleGoogleSingIn}
                    className="btn w-full">
                    <FaGoogle /> Sign In with Google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;