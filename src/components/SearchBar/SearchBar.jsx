import "./SearchBar.css";
import plusGrey from "../../assets/icons/plus-icon-grey.svg";
import plusWhite from "../../assets/icons/plus-icon-white.svg";
import AppContext from "../../contexts/AppContext";
import { useContext } from "react";

const SearchBar = ({ onSubmit, setTag, tag }) => {
  const { isNight } = useContext(AppContext);

  // Optional: local handler to ensure preventDefault() runs before parent handler
  const handleSubmit = (e) => {
    e.preventDefault(); // prevents reload
    onSubmit(e); // calls App's handleSearch()
  };

  return (
    <div className="searchbar">
      <form
        className={`searchbar__form ${
          isNight ? "searchbar__form_type_night" : "searchbar__form_type_blood"
        }`}
        onSubmit={handleSubmit}
      >
        <input
          className={`searchbar__input ${
            isNight
              ? "searchbar__input_type_night"
              : "searchbar__input_type_blood"
          }`}
          type="text"
          placeholder="Search something horror related..."
          value={tag}
          name="tag"
          onChange={(e) => setTag(e.target.value)} // controlled input
        />
        <button className="searchbar__submit" type="submit">
          <img
            className="searchbar__icon"
            src={isNight ? plusGrey : plusWhite}
            alt="plus icon"
          />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
