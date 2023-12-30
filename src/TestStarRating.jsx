import { useState } from "react";
import StarRating from "./StarRating";

const TestStarRating = () => {
  const [movieRate, setMovieRate] = useState(0);
  return (
    <div>
      <StarRating color="blue" onmovieRate={setMovieRate} />
      <p>This movie is rated by {movieRate} stars</p>
    </div>
  );
};

export default TestStarRating;
