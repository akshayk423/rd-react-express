//css
import "./App.css";

//Utils
import { apiKey } from "../../utils/constants";
import { getKeyword, getMovie, getMovieDetails } from "../../utils/moviesApi";

//Hooks
import { useEffect, useState } from "react";

// Components
import Main from "../Main/Main.jsx";
import Header from "../Header/Header";
import Login from "../Login/Login.jsx";

//contexts
import AppContext from "../../contexts/AppContext.js";

const App = () => {
  const [isNight, setIsNight] = useState(true);

  const [movies, setMovies] = useState([]);
  const [tag, setTag] = useState("");
  const [tagsArray, setTagsArray] = useState([]);
  const [movieGenerating, setMovieGenerating] = useState(false);
  const [likeMovies, setLikedMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (!tagsArray.length) return;

    setMovieGenerating(true);

    // Step 1: get all keyword IDs for the tags
    Promise.all(tagsArray.map((word) => getKeyword(word, apiKey)))
      .then((keywordResults) => {
        const keywordIds = keywordResults
          .map((data) => data.results?.[0]?.id)
          .filter(Boolean)
          .join(",");

        if (!keywordIds) {
          setMovies([]);
          setMovieGenerating(false);
          return;
        }

        // Step 2: Fetch multiple pages for the combined keyword search
        const pages = [1, 2, 3].map((page) =>
          getMovie(keywordIds, apiKey, page)
        );

        return Promise.all(pages)
          .then((pageResults) => {
            // Flatten results from all pages
            const allMovies = pageResults.flatMap((p) => p.results || []);
            setMovies(allMovies);
          })
          .finally(() => setMovieGenerating(false));
      })
      .catch((err) => {
        console.error(err);
        setMovieGenerating(false);
      });
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

  function handlePosterClick(movie) {
    getMovieDetails(movie.id, apiKey)
      .then((data) => {
        setSelectedMovie(data);
        setIsModalOpen(true);
      })
      .catch(console.error);
  }

  function closePosterModal() {
    setIsModalOpen(false);
    setSelectedMovie(null);
  }

  //toggle theme change function
  const onThemeToggle = () => {
    setIsNight(!isNight);
  };

  const handleDeleteTag = (deleteTag) => {
    setTagsArray((prevTags) => prevTags.filter((tag) => tag !== deleteTag));
  };

  return (
    <div className="page">
      <div
        className={`page__content ${
          isNight ? "page__content_night" : "page__content_blood"
        }`}
      >
        <AppContext.Provider
          value={{ isNight, onThemeToggle, currentUser, setCurrentUser }}
        >
          <Header />

          <Main
            onSubmit={handleSearch}
            setTag={setTag}
            tag={tag}
            handleAccept={handleAccept}
            handleDecline={handleDecline}
            movies={movies}
            tagsArray={tagsArray}
            handleDeleteTag={handleDeleteTag}
            onClick={handlePosterClick}
          />
          <Login />
          {selectedMovie && (
            <results movie={selectedMovie} onClose={closePosterModal} />
          )}
        </AppContext.Provider>
      </div>
    </div>
  );
};

export default App;
