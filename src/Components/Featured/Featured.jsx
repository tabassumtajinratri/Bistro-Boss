import React from 'react';
import SectionTitle from '../SectionTitle/SectionTitle';
import featuredImg from '../../assets/home/featured.jpg'
import '../Featured/featured.css'

const Featured = () => {
    return (
        <div className='featured-iteams bg-fixed pt-10'>
            <SectionTitle heading='Featured Item'
            subheading='Check it Out'
            ></SectionTitle>

            <div className='md:flex justify-center bg-slate-500/40 items-center py-20 pt-12 px-36'>
                <div>
                    <img src={featuredImg} alt="" />
                </div>
                <div className='md: ml-10 text-white text-base'>
                    <p className=''>August 20, 2025</p>
                    <p className='uppercase text-2xl'>Where can i get some?</p>
                    <p className='text-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum omnis quisquam tenetur. Corporis nisi sint repellendus reprehenderit quidem minima enim debitis necessitatibus cum architecto, adipisci alias dicta beatae sapiente commodi dolore dolor sit cupiditate. Facilis mollitia blanditiis, quisquam maxime totam aspernatur numquam animi id cupiditate, dolore modi. Vero, dolorum fugit?</p>
                    <button className="btn border-0 border-b-4 btn-outline">Order Now</button>
                </div>
         
            </div>
                   
        </div>
    );
};

export default Featured;