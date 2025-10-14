import "./App.css";
import moon from "../../assets/background/night/moon-yellow.svg";
import plus from "../../assets/icons/plus.svg";
import SearchBar from "../SearchBar/SearchBar";

// Components
import Header from "../Header/Header";

const App = () => {
  return (
    <div className="page">
      <div className="page__content page__content_night">
        <Header />
        <img src={moon} className="page__moon" />

        <SearchBar />
      </div>
    </div>
  );
};

export default App;
