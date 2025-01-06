import React from 'react';
import { Helmet } from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';
// import bgImg from '../../../assets/home/02.jpg'
import bgImg from '../../../assets/menu/banner3.jpg'
import dessertsBgImg from '../../../assets/menu/dessert-bg.jpeg'
import soupBgImg from '../../../assets/menu/soup-bg.jpg'
import saladBgImg from '../../../assets/menu/salad-bg.jpg'
import pizzaBgImg from '../../../assets/menu/pizza-bg.jpg'
import useMenu from '../../../hooks/useMenu';
import MenuItem from '../../Shared/ManuItem/MenuItem';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuCategory from '../MenuCategory/MenuCategory';

const Menu = () => {


    //এখানে useEffect() ব্যবহার না করে, custom hooks ব্যবহার করে data load করা হয়েছে । custom hooks ব্যবহার করে সব জায়গা হতে ডাটা লোড করা যাবে ।


    const [menu] = useMenu();
    const dessert = menu.filter(item => item.category === 'dessert')
    const soup = menu.filter(item => item.category === 'soup')
    const salad = menu.filter(item => item.category === 'salad')
    const pizza = menu.filter(item => item.category === 'pizza')
    const offered = menu.filter(item => item.category === 'offered')

    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>
            <Cover
                bgImg={bgImg}
                title={'OUR MENU'}
                subTitle={'Would you like to try a dish?'}
            ></Cover>



            {/* নিচের  সব গুলোর ডাটা লোড/map করা হয়েছে MenuCategory কম্পোনেন্ট এর ভিতরে const offered = menu.filter(item => item.category === 'offered')এর items={offered} কে প্রপ হিসাবে পাঠিয়ে */}
            {/* Offered Category section */}

            <div className='my-24'>

                <SectionTitle
                    heading={"TODAY'S OFFER"}
                    subHeading={"Don't miss"}
                ></SectionTitle>

                <MenuCategory items={offered}  title={'salad'}></MenuCategory>

            </div>



            {/* Dessert Category section */}
            <div className='my-24'>

                <Cover
                    bgImg={dessertsBgImg}
                    title={'DESSERTS'}
                    subTitle={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'}
                ></Cover>

                <MenuCategory items={dessert} title={'dessert'}></MenuCategory>

            </div>


            {/* Pizza Category section */}
            <div className='my-24'>

                <Cover
                    bgImg={pizzaBgImg}
                    title={'PIZZA'}
                    subTitle={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'}
                ></Cover>

                <MenuCategory items={pizza} title={'pizza'}></MenuCategory>

            </div>


            {/* SALADS Category section */}
            <div className='my-24'>

                <Cover
                    bgImg={saladBgImg}
                    title={'SALADS'}
                    subTitle={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'}
                ></Cover>

                <MenuCategory items={salad} title={'salad'}></MenuCategory>

            </div>


            {/* Soup Category section */}
            <div className='my-24'>

                <Cover
                    bgImg={soupBgImg}
                    title={'SOUP'}
                    subTitle={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'}
                ></Cover>

                <MenuCategory items={soup} title={'soup'}></MenuCategory>

            </div>


        </div>
    );
};

export default Menu;