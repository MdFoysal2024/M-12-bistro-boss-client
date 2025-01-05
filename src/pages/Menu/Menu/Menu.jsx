import React from 'react';
import { Helmet } from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';
// import bgImg from '../../../assets/home/02.jpg'
import bgImg from '../../../assets/menu/banner3.jpg'
import PopularMenu from '../../Home/PopularMenu/PopularMenu';
const Menu = () => {
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
            <PopularMenu></PopularMenu>
            <Cover
                bgImg={bgImg}
                title={'OUR MENU'}
                subTitle={'Would you like to try a dish?'}
            ></Cover>
            <PopularMenu></PopularMenu>
            <Cover
                bgImg={bgImg}
                title={'OUR MENU'}
                subTitle={'Would you like to try a dish?'}
            ></Cover>
            <PopularMenu></PopularMenu>


           
        </div>
    );
};

export default Menu;