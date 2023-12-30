import { useState } from "react";
import PropTypes from "prop-types";
import Star from "./Star";

const styledContainer = {
  display: "flex",
  alignItem: "center",
  gap: "1.5rem",
};

const starContainerStyle = {
  display: "flex",
  gap: "4px",
};

const StarRating = ({
  maxRating = 5,
  color = "#FFC47E",
  size = 48,
  messages = [],
  defaultRating = 0,
  onMovieRate = () => {},
}) => {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);
  const handleRating = (rating) => {
    setRating(rating);
    onMovieRate(rating);
  };
  const styledText = {
    margin: "0",
    lineHeight: "1",
    color,
    fontSize: `${size / 1.5}px`,
  };
  return (
    <div style={styledContainer}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            onRate={() => handleRating(i + 1)}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            color={color}
            size={size}
          />
        ))}
      </div>
      <p style={styledText}>
        {messages.length === maxRating
          ? messages[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || ""}
      </p>
    </div>
  );
};
StarRating.propTypes = {
  maxRating: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  messages: PropTypes.array,
  defaultRating: PropTypes.number,
  onMovieRate: PropTypes.func,
};

export default StarRating;
