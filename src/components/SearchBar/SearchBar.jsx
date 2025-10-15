import "./SearchBar.css";
import plusGrey from "../../assets/icons/plus-icon-grey.svg";
import plusWhite from "../../assets/icons/plus-icon-white.svg";
import AppContext from "../../contexts/AppContext";
import { useContext } from "react";

const SearchBar = () => {
  const { isNight } = useContext(AppContext);

  return (
    <div className="searchbar">
      <form
        className={`searchbar__form ${
          isNight ? "searchbar__form_type_night" : "searchbar__form_type_blood"
        }`}
      >
        <input
          className={`searchbar__input ${
            isNight
              ? "searchbar__input_type_night"
              : "searchbar__input_type_blood"
          }`}
          type="text"
          placeholder="Type a keyword — slasher, actor, or decade — to summon your next horror recommendation."
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
