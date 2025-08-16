
import SectionTitle from '../SectionTitle/SectionTitle';
import React, { useEffect, useRef, useState } from 'react';
import { FaQuoteLeft } from "react-icons/fa";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import { Rating } from '@smastrom/react-rating'
 import '@smastrom/react-rating/style.css'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';
import { Rating } from '@smastrom/react-rating';

const Testimonial = () => {

    const [reviews, setRewiews]= useState([])
    useEffect(()=>{
        fetch('/reviews.json')
        .then(res=>res.json())
        .then(data =>setRewiews(data))
    },[])


    return (
      <section className='my-20'>
          <div>
            <SectionTitle
            subheading='What our Client Say'
            heading='Testimonials'  
            >
            </SectionTitle>

               <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        
       {
        reviews.map(review=><SwiperSlide
        key={review._id}
        
        >

            <div className='m-20 flex flex-col items-center'>
                <Rating
                style={{ maxWidth: 180 }}
                value={review.rating}
                readOnly
                />
               <div className='mt-3'>
                 <FaQuoteLeft size={80}/>
               </div>
                <p className='text-center mt-3'>{review.details}</p>
                 <h3 className='text-2xl text-center text-amber-600'>{review.name}</h3>
              
            </div>
              <div className='text-center'>
                <button className="btn border-0 border-b-4 btn-outline text-center">View Full Menu</button>
              </div>


        </SwiperSlide>)
       }
      </Swiper>
        </div>
      </section>
    );
};

export default Testimonial;