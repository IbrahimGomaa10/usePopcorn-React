import { useState, useEffect, useRef } from "react";
import StarRating from "../StarRating";
import Loader from "./Loader";
import { useKey } from "../customs/useKey";

const API_KEY = "3d28aa1";

const MovieDetails = ({
  selectedId,
  onCloseDetailsMovie,
  onAddToWatchedList,
  watched,
}) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  // Using ref to count Rating everytime

  const ratingRef = useRef(0);

  /// Destructuing Data for make it easier in writing
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  // using useEffect to increase Rating ref across rendering
  useEffect(() => {
    if (userRating) ratingRef.current++;
  }, [userRating]);

  //! For using keyboard controls the page by using custom hook useKey()
  useKey("Escape", onCloseDetailsMovie);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsLoading(true);
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`
      );
      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    };
    fetchMovieDetails();
  }, [selectedId]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;
    return () => {
      document.title = "usePopcorn";
    };
  }, [title]);

  const handleAddWatchedMovie = () => {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: +imdbRating,
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      ratingRefCount: ratingRef.current,
    };
    onAddToWatchedList(newWatchedMovie);
    onCloseDetailsMovie();
  };

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating; // using ?. because it perhaps return undefined
  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseDetailsMovie}>
              ⬅
            </button>
            <img src={poster} alt={title} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} imdb Rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    size={20}
                    maxRating={10}
                    key={selectedId}
                    onMovieRate={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAddWatchedMovie}>
                      + Add To List
                    </button>
                  )}{" "}
                </>
              ) : (
                <p>You Rated This Movie With {watchedUserRating} ⭐</p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>starring {actors}</p>
            <p>Director by {director}</p>
          </section>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
