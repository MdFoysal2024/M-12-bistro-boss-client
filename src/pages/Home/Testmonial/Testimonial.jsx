import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css'

const Testimonial = () => {

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/reviews')
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])






    return (
        <section className='my-20'>
            <SectionTitle
                heading={'TESTIMONIALS'}
                subHeading={'What Our Clients Say'}
            ></SectionTitle>



            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {/* <SwiperSlide>Slide 1</SwiperSlide> */}





                {
                    reviews.map(review => <SwiperSlide
                        key={review._id}

                    >

                        <div className='m-24  space-y-4 text-center flex flex-col items-center text-black'>
                            <Rating
                                style={{ maxWidth: 180 }}
                                value={review.rating}
                                readOnly
                            />

                            <p>{review.details}</p>
                            <h3 className='text-3xl py-4 text-orange-400'>{review.name}</h3>
                        </div>




                    </SwiperSlide>)
                }
            </Swiper>
        </section>
    );
};

export default Testimonial;