import { useRef } from "react";

import "./App.css";
import moon from "../../assets/background/moon.png";
import plus from "../../assets/icons/plus.svg";

//Audio files
import hover1 from "../../assets/audio/hover1.wav";
import hover2 from "../../assets/audio/hover2.wav";
import hover3 from "../../assets/audio/hover3.wav";

// Components
import Header from "../Header/Header";
import useHoverSounds from "../HoverSounds/UseHoverSounds";

const App = () => {
  const playHover = useHoverSounds(hover1, hover2, hover3);

  return (
    <div className="page">
      <div className="page__content">
        <Header />
        <img src={moon} className="page__moon" onMouseOver={playHover} />
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
