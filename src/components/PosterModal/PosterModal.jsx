import "./PosterModal.css";

function PosterModal({ movies, onClose, isModalOpen }) {
  return (
    <div className={`movies-info ${isModalOpen ? "modal-open" : ""}`}>
      <img
        className="movies-info__poster"
        src={`https://image.tmdb.org/t/p/w500${movies[0]?.poster_path}`}
        alt={movies[0]?.title}
      />
      <button
        type="button"
        className="movies-info__close-btn"
        onClose={onClose}
      >
        X
      </button>
      <div className="movies-info__container">
        <h2 className="movies-info__title">{movies[0]?.title}</h2>
        <p className="movies-info__details movies-info__rating">
          User Rating:{" "}
          {movies.vote_average ? `${movies.vote_average}/10` : "N/A"}
        </p>

        <p className="movies-info__details movies-info__genre">
          Genres: {movies.genres?.map((g) => g.name).join(", ") || "Unknown"}
        </p>

        <p className="movies-info__details movies-info__actors">
          Actors:{" "}
          {movies.credits?.cast
            ?.slice(0, 4)
            .map((a) => a.name)
            .join(", ") || "N/A"}
        </p>

        <p className="movies-info__details movies-info__runtime">
          Runtime:{" "}
          {movies.runtime
            ? `${Math.floor(movies.runtime / 60)}h ${movies.runtime % 60}m`
            : "N/A"}
        </p>

        <p className="movies-info__details movies-info__overview">
          Synopsis: {movies.overview || "No description available."}
        </p>
      </div>
    </div>
  );
}

export default PosterModal;
