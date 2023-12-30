import WatchedMovie from "./WatchedMovie";

const WatchedMovies = ({ watched, onDeleteWatchedMovie }) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatchedMovie={onDeleteWatchedMovie}
        />
      ))}
    </ul>
  );
};

export default WatchedMovies;
