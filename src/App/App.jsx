import "./App.css";
import moon from "../assets/background/moon.png";
import title from "../assets/background/title.png";

const App = () => {
  return (
    <div className="page">
      <div className="page__background">
        <img src={moon} alt="Moon" className="page__moon" />
        <img src={title} alt="RecommenDead" className="page__title" />
      </div>
    </div>
  );
};

export default App;
