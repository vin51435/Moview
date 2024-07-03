import React from 'react';

import StarRatings from 'react-star-ratings';
import useIsMobileViewport from '../../hooks/useIsMobileViewport';
import './style.scss';

const StarRating = ({ rating }) => {
  const isMobile = useIsMobileViewport();

  return (
    <StarRatings className='px-1'
      rating={rating}
      starRatedColor="gold"
      starDimension={`${isMobile ? '18px' : "22px"}`}
      starSpacing={`${isMobile ? '1px' : '3px'}`}
    />
  );
};

export default StarRating;