import { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";


const useMenu = () => {

    // const [menu, setMenu] = useState([])
    // const [loading, setLoading] = useState(true)

    // useEffect(() => {
    //     fetch('http://localhost:5000/menu')
    //         .then(res => res.json())
    //         .then(data => {
    //             setMenu(data)
    //             console.log(data)
    //             setLoading(false)
    //         })
    // }, [])




    const axiosPublic = useAxiosPublic();
    //useEffect এর পরিবর্তে Tan stack query দিয়ে আরো Advance ভাবে data fetching -->

    const { data: menu = [], isPending: loading, refetch } = useQuery({
        queryKey: ['menu'],
        queryFn: async () => {
            const res = await axiosPublic.get('/menu');
            return res.data;
        }
    })

    //axiosPublic কাস্টম হুক দিয়ে লোকাল হোষ্ট 5000 এর  url নেয়া হইছে।


    return [menu, loading, refetch]
};

export default useMenu;