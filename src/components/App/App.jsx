import "./App.css";
// Components
import moon from "../../assets/background/moon.png";
import plus from "../../assets/icons/plus.svg";
import Header from "../Header/Header";
import MoviePopup from "../MoviePopup/MoviePopup";

//Utils
import { apiKey } from "../../utils/constants";
import { getKeyword, getMovie } from "../../utils/moviesApi";

//Hooks
import { useEffect, useState } from "react";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [tag, setTag] = useState("");
  const [tagsArray, setTagsArray] = useState([]);
  const [movieGenerating, setMovieGenerating] = useState(false);

  useEffect(() => {
    if (!tagsArray.length) return;

    const moviePromises = tagsArray.map((word) =>
      getKeyword(word, apiKey)
        .then((keywordData) => {
          const keywordId = keywordData.results[0]?.id;
          if (!keywordId) return [];
          return getMovie(keywordId, apiKey)
            .then((movieData) => movieData.results || [])
            .catch(() => []);
        })
        .catch(console.error)
    );

    setMovieGenerating(true);

    Promise.all(moviePromises)
      .then((results) => {
        const allMovies = results.flat();
        console.log(allMovies);
        setMovies(allMovies);
        setMovieGenerating(false);
      })
      .catch((err) => {
        console.error(err);
        setMovieGenerating(false);
      });
  }, [tagsArray]);

  function handleSearch(e) {
    e.preventDefault();
    if (!tag) return;
    setMovieGenerating(true);

    const words = tag.trim().split(/\s+/).filter(Boolean);

    setTagsArray((prevTags) => [ ...prevTags, ...words]);
    setTag("");
  }

  function handleDecline() {
    setMovies((prevMovies) => prevMovies.slice(1));
  }

  function handleAccept() {
    setMovies((prevMovies) => prevMovies.slice(1));
  }

  return (
    <div className="page">
      <div className="page__content">
        <Header />
        <img src={moon} className="page__moon" />
        <div className="page__searchbar-container">
          <form className="page__searchbar" onSubmit={handleSearch}>
            <input
              className="page__searchbar-input"
              type="text"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              placeholder="Search something horror related..."
            />
            <button className="page__searchbar-button" type="submit">
              <img src={plus} alt="Plus" />
            </button>
          </form>
        </div>
        {movies.length > 0 && (
          <MoviePopup
            movies={movies}
            onDecline={handleDecline}
            onAccept={handleAccept}
          />
        )}
      </div>
    </div>
  );
};

export default App;
