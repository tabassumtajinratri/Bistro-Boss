import React from 'react';

const FoodCard = ({item}) => {
        const {image, name, recipe, category, price}= item
    return (
      <div className="card bg-base-100 w-96 shadow-sm">
  <figure>
    <img
      src={image}
      alt="Shoes" />
  </figure>
  <p className='absolute bg-black text-white  right-2.5'>${price}</p>
  <div className="card-body">
    <h2 className="card-title">{name}</h2>
    <p>{recipe}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Add to cart</button>
    </div>
  </div>
</div>
    );
};

export default FoodCard;