import React from 'react';

const TryCard = ({ item }) => {
  const { name, ingredients, image } = item;

  return (
    <div className="card bg-base-100 shadow-xl rounded-2xl overflow-hidden">
      <figure>
        <img src={image} alt={name} className="w-full h-52 object-cover" />
      </figure>
      <div className="card-body text-center">
        <h2 className="text-lg font-bold">{name}</h2>
        <p className="text-sm text-gray-600">{ingredients}</p>
        <div className="card-actions justify-center mt-4">
          <button className="btn btn-outline btn-warning">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default TryCard;
