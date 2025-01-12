import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";


export const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})


const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = useAuth()


    //request interceptors to add authorization header for every secure call to the api
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('Access-Token')
        console.log('Request Stopped By Interceptors', token);
        //headers এর ভিতরে authorization টোকেন কে axiosSecure এর ভিতরে রেখেছি যাতে সব জায়গা হতে পাওয়া যায় ।
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function (error) {
        return Promise.reject(error);
    })


    // interceptors response document and 401, 403 error status then logout --->

    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response.status;
        console.log(' Error Status of Interceptors ', status);

        if (status === 401 || status === 403) {

            await logOut();

            navigate('/login')
        }


        return Promise.reject(error);
    })


    return axiosSecure;
};

export default useAxiosSecure;