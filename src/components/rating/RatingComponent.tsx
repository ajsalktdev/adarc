import React from 'react';
import StarRatings from 'react-star-ratings';

interface StarRatingProps {
  currentRating: number;
  setCurrentRating: (rating: number) => void;
  starRatedColor?: string;
  starEmptyColor?: string;
  numberOfStars?: number;
  starDimension?: string;
  starSpacing?: string;
}

const StarRating: React.FC<StarRatingProps> = ({
  currentRating,
  setCurrentRating,
  starRatedColor = 'gold',
  starEmptyColor = '#ddd',
  numberOfStars = 5,
  starDimension = '30px',
  starSpacing = '2px',
}) => {
  const handleRatingChange = (newRating: number) => {
    const roundedRating = Math.round(newRating * 2) / 2; // Round to nearest 0.5
    setCurrentRating(roundedRating);
  };

  return (
    <StarRatings
      rating={currentRating}
      changeRating={handleRatingChange}
      starRatedColor={starRatedColor}
      starEmptyColor={starEmptyColor}
      numberOfStars={numberOfStars}
      starDimension={starDimension}
      starSpacing={starSpacing}
      starHoverColor="orange"
    />
  );
};

export default StarRating;
