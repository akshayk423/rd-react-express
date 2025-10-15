import { useState } from "react";

import "./SearchBar.css";

import plusGrey from "../../assets/icons/plus-icon-grey.svg";
import plusWhite from "../../assets/icons/plus-icon-white.svg";

const SearchBar = () => {
  const [searchTerms, setSearchTerms] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (inputValue.trim()) {
      setSearchTerms([...searchTerms, inputValue.trim()]);
      setInputValue("");
    }
  };

  return (
    <div className="searchbar">
      <div className="searchbar__terms">
        {searchTerms.map((term, index) => (
          <span key={index} className="searchbar__term">
            {term}
          </span>
        ))}
      </div>
      <form
        className="searchbar__form searchbar__form_type_night"
        onSubmit={handleSubmit}
      >
        <input
          className="searchbar__input"
          type="text"
          value={inputValue}
          onChange={(evt) => setInputValue(evt.target.value)}
          placeholder="Type a keyword — slasher, actor, or decade — to summon your next horror recommendation."
        />
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
