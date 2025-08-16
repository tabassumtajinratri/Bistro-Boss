import React from 'react';
import chef from '../../assets/home/chef-service.jpg'

const Card = () => {
    return (
       <div
  className="hero min-h-screen"
  style={{
    backgroundImage:
      `url(${chef})`,
  }}
>
  <div className="hero-overlay"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className=" bg-white max-w-lvh">
      <h1 className="mb-5 text-5xl font-bold mt-12 text-black">Bristo Boss</h1>
      <p className="mb-5 text-justify text-black p-10">
        Welcome to Bristo Boss, where flavor meets comfort. Every dish is made with love using fresh ingredients to ensure the perfect taste. Enjoy a cozy, relaxing vibe as you sip freshly brewed coffee or taste our signature.

        <p className='text-center'>it’s a place to create memories, enjoy comfort, and celebrate life.</p>
       
      </p>
     
    </div>
  </div>
</div>
    );
};

export default Card;