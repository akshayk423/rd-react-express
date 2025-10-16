import "./Main.css";
import SearchBar from "../SearchBar/SearchBar";
import MoviePopup from "../MoviePopup/MoviePopup";
import TagSection from "../TagSection/TagSection";

const Main = ({
  onSubmit,
  setTag,
  tag,
  handleAccept,
  handleDecline,
  movies,
  tagsArray,
  handleDeleteTag,
  onClick,
}) => {
  return (
    <div className="main__content">
      <TagSection tags={tagsArray} handleDeleteTag={handleDeleteTag} />
      <SearchBar onSubmit={(e) => onSubmit(e)} setTag={setTag} tag={tag} />
      {movies.length > 0 && (
        <MoviePopup
          movies={movies}
          onDecline={handleDecline}
          onAccept={handleAccept}
          onClick={onClick}
        />
      )}
    </div>
  );
};
export default Main;
