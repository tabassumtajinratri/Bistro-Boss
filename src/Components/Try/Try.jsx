import React, { useEffect, useState } from 'react';
import SectionTitle from '../SectionTitle/SectionTitle';
import TryCard from '../TryCard/TryCard';

const Try = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('/try.json')
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  return (
    <div className="my-10">
      <SectionTitle
        heading="CHEF RECOMMENDS"
        subheading="Should Try"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {items.map((item, index) => (
          <TryCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Try;
