import "./MoonToggle.css";
import MoonYellow from "../../assets/background/night/moon-yellow.svg";
import MoonWhite from "../../assets/background/blood/moon-white.svg";
import AppContext from "../../contexts/AppContext.js";
import { useContext } from "react";
//Audio files
import hover1 from "../../assets/audio/hover1.wav";
import hover2 from "../../assets/audio/hover2.wav";
import hover3 from "../../assets/audio/hover3.wav";
import useHoverSounds from "../HoverSounds/UseHoverSounds.jsx";

const MoonToggle = () => {
  const contextData = useContext(AppContext);
  const isNight = contextData.isNight;
  const onClick = contextData.onThemeToggle;
  const playHover = useHoverSounds(hover1, hover2, hover3);

  return (
    <>
      <button
        onClick={() => {
          onClick();
          playHover();
        }}
        type="button"
        className="moon-toggle-btn"
      >
        <img
          src={`${isNight ? MoonYellow : MoonWhite}`}
          alt={`${isNight ? "moon-yellow" : "moon-white"}`}
          className="moon-toggle-btn__asset"
        />
      </button>
    </>
  );
};

export default MoonToggle;
