//css
import "./App.css";

//react
import { useState } from "react";

// Components
import Header from "../Header/Header";
import SearchBar from "../SearchBar/SearchBar";
import Results from "../Results/Results";

//contexts
import AppContext from "../../contexts/AppContext.js";

const App = () => {
  const [isNight, setIsNight] = useState(true);

  //toggle theme change function
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
          {/* <Results /> */}
        </AppContext.Provider>
      </div>
    </div>
  );
};

export default App;
