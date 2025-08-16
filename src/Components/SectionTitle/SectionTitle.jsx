import React from 'react';

const SectionTitle = ({heading, subheading}) => {
    return (
        <div className='mx-auto text-center md:w-4/12 my-8'>
            <h1 className='text-yellow-500 mb-2'>---{subheading}---</h1>
            <h3 className='text-4xl uppercase border-y-4 py-4'>{heading}</h3>
        </div>
    );
};

export default SectionTitle;