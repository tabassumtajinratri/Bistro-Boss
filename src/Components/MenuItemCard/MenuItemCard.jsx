import React from 'react';

const MenuItemCard = ({item}) => {

    const {image, name, recipe, category, price}= item


    return (
        <div className='flex space-x-4'>
            <img style={{borderRadius: '0 200px 200px 200px'}} className='w-28' src={image} alt="" />
            <div>
                <h3>{name}-----------------</h3>
                <p>{recipe}</p>
            </div>
            <p className='text-amber-500'>${price}</p>
        </div>
    );
};

export default MenuItemCard;