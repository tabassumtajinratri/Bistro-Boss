import React, { useEffect, useState } from 'react';
import SectionTitle from '../SectionTitle/SectionTitle';
import MenuItemCard from '../MenuItemCard/MenuItemCard';
import useMenu from '../Hooks/useMenu';

const PopularMenu = () => {
    const [menu] = useMenu()
    const popular = menu.filter(item=>item.category ==='popular')

    return (
       <section className='mb-12'>
        <SectionTitle heading='From Our Menu'
        subheading='Popular Items'        
        >
        </SectionTitle>
        <div className='grid md:grid-cols-2 gap-10'>
            {
                popular.map(item=><MenuItemCard
                key={item._id}
                item={item}
                
                >
                
                </MenuItemCard>)
            }
        </div>
         <button className="btn border-0 border-b-4 btn-outline">Order Now</button>
       </section>
    );
};

export default PopularMenu;