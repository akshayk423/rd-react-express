import "./MoviePopup.css";

function MoviePopup({ movies, onDecline, onAccept, onClick }) {
  console.log(movies);
  return (
    <div className="movie-popup__container">
      <img
        src={`https://image.tmdb.org/t/p/w500${movies[0]?.poster_path}`}
        alt={movies[0]?.title}
        className="movie-popup__poster"
        onClick={onClick}
      />
      <p className="movie-popup__title">{movies[0]?.title}</p>
      <div className="movie-actions">
        <button className="movie-card__button btn-decline" onClick={onDecline}>
          X
        </button>
        <button className="movie-card__button btn-accept" onClick={onAccept}>
          ✓
        </button>
      </div>
    </div>
  );
}

export default MoviePopup;
