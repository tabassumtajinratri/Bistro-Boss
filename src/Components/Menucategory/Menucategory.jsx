import React from 'react';
import MenuItemCard from '../MenuItemCard/MenuItemCard';
import Cover from '../Cover/Cover';
import { Link } from 'react-router-dom';

const Menucategory = ({items, title, Img}) => {
    return (
        
       <div className='pt-8'>
        {title && <Cover img={Img} title={title}></Cover>}
       
            <div className='grid md:grid-cols-2 gap-10 mt-16'>
            {
                items.map(item=><MenuItemCard
                key={item._id}
                item={item}
                
                >
                
                </MenuItemCard>)
            }
        </div>

      <Link to={`/order/${title}`}><button className="btn border-0 border-b-4 btn-outline">Order Now</button></Link>
       </div>
    );
};

export default Menucategory;