import React from 'react';
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import bgImg from '../../../assets/home/chef-service.jpg'
import PopularMenu from '../PopularMenu/PopularMenu';
import Featured from '../Featured/Featured';
import Testimonial from '../Testmonial/Testimonial';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <div>
<Helmet>
                <title>Bistro Boss | Home</title>
            </Helmet>

            <Banner></Banner>
            <Category></Category>

            {/* Extra Section */}
            <div
                className="hero mb-24 bg-fixed "
                style={{
                    backgroundImage: `url(${bgImg})`,
                }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content bg-white p-12 md:p-24 m-12 md:m-24 bg-opacity-70  text-neutral-content text-center">
                    <div className="">
                        <h1 className="mb-5 text-gray-800   text-5xl font-bold">Bistro Boss</h1>
                        <p className="mb-5 text-gray-500 ">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, libero accusamus laborum deserunt ratione dolor officiis praesentium! Deserunt magni aperiam dolor eius dolore at, nihil iusto ducimus incidunt quibusdam nemo.
                        </p>

                    </div>
                </div>
            </div>

            <PopularMenu></PopularMenu>
            <Featured></Featured>
            <Testimonial></Testimonial>
        </div>
    );
};

export default Home;