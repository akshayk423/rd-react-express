import "./Main.css";
import SearchBar from "../SearchBar/SearchBar";
import MoviePopup from "../MoviePopup/MoviePopup";
import TagSection from "../TagSection/TagSection";
import Results from "../Results/Results";

const Main = ({
  onSubmit,
  setTag,
  tag,
  handleAccept,
  handleDecline,
  movies,
  tagsArray,
}) => {
  const handleSubmit = (e) => {
    onSubmit(e);
  };

  return (
    <div className="main__content">
      <TagSection tags={tagsArray} />
      <SearchBar onSubmit={(e) => onSubmit(e)} setTag={setTag} tag={tag} />
      {movies.length > 0 && (
        <MoviePopup
          movies={movies}
          onDecline={handleDecline}
          onAccept={handleAccept}
        />
      )}
      <Results movies={movies} />
    </div>
  );
};
export default Main;
