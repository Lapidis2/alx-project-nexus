'use client';
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  clickable?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange, clickable = false }) => {
  const validRating = Math.min(Math.max(rating, 0), 5);

  const handleClick = (index: number) => {
    if (clickable && onRatingChange) onRatingChange(index + 1);
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (!clickable || !onRatingChange) return;
    if (e.key === 'Enter' || e.key === ' ') onRatingChange(index + 1);
  };

  return (
    <div className="flex space-x-1" role="radiogroup" aria-label="Star Rating">
      {Array.from({ length: 5 }, (_, index) => (
        <FontAwesomeIcon
          key={index}
          icon={faStar}
          className={index < validRating ? "text-orange-500" : "text-gray-300"}
          onClick={() => handleClick(index)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          tabIndex={clickable ? 0 : -1}
          role="radio"
          aria-checked={index < validRating}
        />
      ))}
    </div>
  );
};

export default StarRating;
