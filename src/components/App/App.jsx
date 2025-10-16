//css
import "./App.css";

//Utils
import { apiKey } from "../../utils/constants";
import { getKeyword, getMovie } from "../../utils/moviesApi";

//Hooks
import { useEffect, useState } from "react";

// Components
import Main from "../Main/Main.jsx";
import Header from "../Header/Header";

//contexts
import AppContext from "../../contexts/AppContext.js";

const App = () => {
  const [isNight, setIsNight] = useState(true);

  const [movies, setMovies] = useState([]);
  const [tag, setTag] = useState("");
  const [tagsArray, setTagsArray] = useState([]);
  const [movieGenerating, setMovieGenerating] = useState(false);
  const [likeMovies, setLikedMovies] = useState([]);

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

    console.log(tagsArray);
  }, [tagsArray]);

  function handleSearch(e) {
    e.preventDefault();
    if (!tag.trim()) return;

    setMovieGenerating(true);

    // Match quoted phrases OR comma/semicolon separated tags
    const tagMatches = tag.match(/"[^"]+"|[^,;]+/g) || [];
    const words = tagMatches
      .map((t) =>
        t
          .replace(/"/g, "")
          .trim()
          .replace(/\s{2,}/g, " ")
      ) // remove quotes & collapse extra spaces
      .filter(Boolean);

    // Merge tags, avoid duplicates
    setTagsArray((prevTags) => {
      const updated = [...new Set([...prevTags, ...words])];
      return updated;
    });

    setTag("");
  }

  function handleDecline() {
    setMovies((prevMovies) => prevMovies.slice(1));
  }

  function handleAccept() {
    setMovies((prevMovies) => prevMovies.slice(1));
  }

  //toggle theme change function
  const onThemeToggle = () => {
    setIsNight(!isNight);
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
          <Main
            onSubmit={handleSearch}
            setTag={setTag}
            tag={tag}
            handleAccept={handleAccept}
            handleDecline={handleDecline}
            movies={movies}
            tagsArray={tagsArray}
          />
        </AppContext.Provider>
      </div>
    </div>
  );
};

export default App;
