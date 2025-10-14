import "./MoonToggle.css";
import MoonYellow from "../../assets/background/night/moon-yellow.svg";
import MoonWhite from "../../assets/background/blood/moon-white.svg";
import AppContext from "../../contexts/AppContext.js";
import { useContext } from "react";

const MoonToggle = () => {
  const contextData = useContext(AppContext);
  const isNight = contextData.isNight;
  const onClick = contextData.onThemeToggle;

  return (
    <>
      <button onClick={onClick} type="button" className="moon-toggle-btn">
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
