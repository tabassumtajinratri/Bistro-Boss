import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import './styles.css';
import { Pagination } from 'swiper/modules';

import slide1 from '../../assets/home/slide1.jpg'
import slide2 from '../../assets/home/slide2.jpg'
import slide3 from '../../assets/home/slide3.jpg'
import slide4 from '../../assets/home/slide4.jpg'
import SectionTitle from '../SectionTitle/SectionTitle';


const Catagory = () => {
    return (
   <section>

    <SectionTitle

    subheading={'From 11.00am to 10pm'}     
    heading={'Order Online'}
    
    ></SectionTitle>
         <Swiper
        slidesPerView={4}
        spaceBetween={30}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper mb-24"
      >
        <SwiperSlide>
            <img src={slide1} alt="" />
            <h2 className='uppercase text-4xl text-center -mt-16  text-white'>Salad</h2>
        </SwiperSlide>
           <SwiperSlide>
            <img src={slide2} alt="" />
            <h2 className='uppercase text-4xl text-center -mt-16  text-white'>Pizza</h2>
        </SwiperSlide>
          <SwiperSlide>
            <img src={slide3} alt="" />
            <h2 className='uppercase text-4xl text-center -mt-16  text-white'>Soup</h2>
        </SwiperSlide>
           <SwiperSlide>
            <img src={slide4} alt="" />
            <h2 className='uppercase text-4xl text-center -mt-16  text-white'>Dessert</h2>
        </SwiperSlide>
        
      </Swiper>
   </section>
    );
};

export default Catagory;