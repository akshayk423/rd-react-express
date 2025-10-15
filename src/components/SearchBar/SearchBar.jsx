import "./SearchBar.css";
import plusGrey from "../../assets/icons/plus-icon-grey.svg";
import plusWhite from "../../assets/icons/plus-icon-white.svg";

const SearchBar = () => {
  return (
    <div className="searchbar">
      <form className="searchbar__form searcbar__form_type_night">
        <input className="searchbar__input" type="text" />
        <button className="searchbar__submit" type="submit">
          <img
            className="searchbar__icon"
            src={plusGrey}
            alt="plus-icon-grey"
          />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
