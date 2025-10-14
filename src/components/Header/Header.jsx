import "./Header.css";
import title from "../../assets/icons/logo-title.png";
import avatar from "../../assets/icons/avatar.png";
import MoonToggle from "../MoonToggle/MoonToggle";

function Header() {
  return (
    <div className="header__content">
      <img src={avatar} className="header__avatar" />
      <img src={title} className="page__title" />
      <MoonToggle />
    </div>
  );
}

export default Header;
