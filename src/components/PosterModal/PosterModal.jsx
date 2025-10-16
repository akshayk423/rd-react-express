import "./PosterModal.css";

function PosterModal({ movie, onClose, isModalOpen }) {
  if (!movie) return null;

  return (
    <div className={`movies-info ${isModalOpen ? "modal-open" : ""}`}>
      <img
        className="movies-info__poster"
        src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
        alt={movie?.title}
      />
      <button
        type="button"
        className="movies-info__close-btn"
        onClick={onClose}
      >
        X
      </button>

      <div className="movies-info__container">
        <h2 className="movies-info__title">{movie?.title}</h2>
        <p className="movies-info__details movies-info__rating">
          User Rating:{" "}
          {movie?.vote_average ? `${movie.vote_average}/10` : "N/A"}
        </p>

        <p className="movies-info__details movies-info__genre">
          Genres: {movie?.genres?.map((g) => g.name).join(", ") || "Unknown"}
        </p>

        <p className="movies-info__details movies-info__actors">
          Actors:{" "}
          {movie?.credits?.cast
            ?.slice(0, 4)
            .map((a) => a.name)
            .join(", ") || "N/A"}
        </p>

        <p className="movies-info__details movies-info__runtime">
          Runtime:{" "}
          {movie?.runtime
            ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
            : "N/A"}
        </p>

        <p className="movies-info__details movies-info__overview">
          Synopsis: {movie?.overview || "No description available."}
        </p>
      </div>
    </div>
  );
}

export default PosterModal;
