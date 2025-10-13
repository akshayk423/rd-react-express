import "./App.css";
import moon from "../assets/background/moon.png";
import title from "../assets/background/title.png";
import plus from "../assets/icons/plus.svg";

const App = () => {
  return (
    <div className="page">
      <div className="page__background">
<<<<<<< Updated upstream
        <img src={moon} alt="Moon" className="page__moon" />
        <img src={title} alt="RecommenDead" className="page__title" />
        <div className="page__searchbar-container">
          <form action="#" className="page__searchbar" method="get">
            <input className="page__searchbar-input" type="search" />
            <button className="page__searchbar-button" type="submit">
              <img src={plus} alt="Plus" />
            </button>
          </form>
        </div>
=======
        <img src={moon} className="page__moon" />
        <img src={title} className="page__title" />
>>>>>>> Stashed changes
      </div>
    </div>
  );
};

export default App;
