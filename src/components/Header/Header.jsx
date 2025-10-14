import "./Header.css";
import title from "../../assets/icons/logo-title.png";
import avatar from "../../assets/icons/avatar.png";
import avatarDark from "../../assets/icons/avatar-dark.png";
import MoonToggle from "../MoonToggle/MoonToggle";
import AppContext from "../../contexts/AppContext";
import { useContext } from "react";

function Header() {
  const contextData = useContext(AppContext);
  const isNight = contextData.isNight;

  return (
    <div className="header__content">
      <img
        src={`${isNight ? avatar : avatarDark}`}
        className="header__avatar"
      />
      <img src={title} className="page__title" />
      <MoonToggle />
    </div>
  );
}

export default Header;
