import "./App.css";
import moon from "../../assets/background/moon.png";
import plus from "../../assets/icons/plus.svg";

import Header from "../Header/Header";

const App = () => {
  return (
    <div className="page">
      <div className="page__content">
        <Header />
        <img src={moon} className="page__moon" />
        <div className="page__searchbar-container">
          <form action="#" className="page__searchbar" method="get">
            <input className="page__searchbar-input" type="search" />
            <button className="page__searchbar-button" type="submit">
              <img src={plus} alt="Plus" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
