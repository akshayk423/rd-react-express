import "./Header.css";
import Dropdown from "../../components/Dropdown/Dropdown.jsx";
import title from "../../assets/icons/logo-title.png";
import avatar from "../../assets/icons/avatar.png";
import avatarDark from "../../assets/icons/avatar-dark.png";
import MoonToggle from "../MoonToggle/MoonToggle";
import AppContext from "../../contexts/AppContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const contextData = useContext(AppContext);
  const isNight = contextData.isNight;

  const navigate = useNavigate();
  const menuItems = contextData.currentUser
    ? [
        {
          label: "View recommendations",
          onClick: () => {
            //need to route to recommendations page//
            navigate("/rd-react-express/view-recommendations");
          },
        },
        {
          label: "Sign Out",
          onClick: () => {
            //need to handle sign out//
            contextData.setCurrentUser(null);
            navigate("/rd-react-express/");
          },
        },
      ]
    : [
        {
          label: "Login/Register",
          onClick: () => {
            //need to handle sign out//
            navigate("/rd-react-express/login");
          },
        },
        { label: "Home", onClick: () => navigate("/rd-react-express/") },
      ];
  return (
    <div className="header__content">
      <Dropdown
        trigger={
          <img
            src={`${isNight ? avatar : avatarDark}`}
            className="header__avatar"
          />
        }
        items={menuItems}
      />

      <img
        src={title}
        className="page__title"
        onClick={() => navigate("/rd-react-express")}
      />
      <MoonToggle />
    </div>
  );
}

export default Header;
