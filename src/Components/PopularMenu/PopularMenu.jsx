import React, { useEffect, useState } from 'react';
import SectionTitle from '../SectionTitle/SectionTitle';
import MenuItemCard from '../MenuItemCard/MenuItemCard';

const PopularMenu = () => {
    const [menu, setMenu]=useState([])
    useEffect(()=>{
        fetch('/Menu.json')
        .then(res=>res.json())
        .then(data=>{

            const popularItems = data.filter(item=> item.category === 'popular')
            setMenu(popularItems)})
        
    },[])
    return (
       <section className='mb-12'>
        <SectionTitle heading='From Our Menu'
        subheading='Popular Items'        
        >
        </SectionTitle>
        <div className='grid md:grid-cols-2 gap-10'>
            {
                menu.map(item=><MenuItemCard
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