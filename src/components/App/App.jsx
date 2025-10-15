//css
import "./App.css";

// Components
import SearchBar from "../SearchBar/SearchBar";
import MoonToggle from "../MoonToggle/MoonToggle";
import useHoverSounds from "../HoverSounds/UseHoverSounds";
import Header from "../Header/Header";
import MoviePopup from "../MoviePopup/MoviePopup";

//Context
import AppContext from "../../contexts/AppContext.js";

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
  const [isNight, setIsNight] = useState(true);

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

  const onThemeToggle = () => {
    setIsNight(!isNight);
    console.log(isNight);
  };

  return (
    <div className="page">
      <div
        className={`page__content ${
          isNight ? "page__content_night" : "page__content_blood"
        }`}
      >
        <AppContext.Provider value={{ isNight, onThemeToggle }}>
          <Header />
          <SearchBar />
        </AppContext.Provider>

      </div>
    </div>
  );
};

export default App;
