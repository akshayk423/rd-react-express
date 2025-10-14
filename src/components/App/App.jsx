//css
import "./App.css";

// Components
import Header from "../Header/Header";
import SearchBar from "../SearchBar/SearchBar";

//react imports
import { useState } from "react";

//contexts
import AppContext from "../../contexts/AppContext.js";

const App = () => {
  /* state variable for toggling between blood and night theme
  default theme = night */
  const [isNight, setIsNight] = useState(true);

  //toggle theme change function
  const onThemeToggle = () => {
    setIsNight(!isNight);
    console.log(isNight);
  };

  return (
    <div className="page">
      <div
        className={`page__content  ${
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
