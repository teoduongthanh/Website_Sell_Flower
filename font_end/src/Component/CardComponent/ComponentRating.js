import React from 'react';

const ComponentRating = ({ rating }) => {
  const totalStars = 5;
  const stars = Array.from({ length: totalStars }, (_, index) => {
    if (index < rating) {
      return <i key={index} className="fa fa-star"></i>;
    } else {
      return <i key={index} className="fa fa-star-o"></i>;
    }
  });

  return <div className="product-rating">{stars}</div>;
};

export default ComponentRating;