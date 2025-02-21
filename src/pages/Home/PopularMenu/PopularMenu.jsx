import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuItem from '../../Shared/ManuItem/MenuItem';
import useMenu from '../../../hooks/useMenu';

const PopularMenu = () => {

    // const [menu, setMenu] = useState([])

    // useEffect(() => {
    //     fetch('menu.json')
    //         .then(res => res.json())
    //         .then(data => {
    //             // setMenu(data)
    //             const popularItems = data.filter(item => item.category === 'popular')
    //             setMenu(popularItems);
    //         })
    // }, [])


    //এখানে useEffect() ব্যবহার না করে, custom hooks ব্যবহার করে data load করা হয়েছে । custom hooks ব্যবহার করে সব জায়গা হতে ডাটা লোড করা যাবে ।


    const [menu] = useMenu();
    const popular = menu.filter(item => item.category === 'popular')


    return (
        <section className='mb-24 bg-slate-200 p-12'>
            <SectionTitle
                heading={'From Our Menu'}
                subHeading={'Popular Items'}
            >

            </SectionTitle>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
                {
                    popular.map(item => <MenuItem
                        key={item._id}
                        item={item}
                    ></MenuItem>)
                }
            </div>

            <div className='flex justify-center pt-12'>

                <button className='btn text-xl  bg-orange-600  text-white hover:bg-orange-800'>View Full Menu</button>
            </div>
        </section>
    );
};

export default PopularMenu;