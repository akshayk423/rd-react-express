import "./Header.css";
import Dropdown from "../../components/Dropdown/Dropdown.jsx";
import title from "../../assets/icons/logo-title.png";
import avatar from "../../assets/icons/avatar.png";
import avatarDark from "../../assets/icons/avatar-dark.png";
import MoonToggle from "../MoonToggle/MoonToggle";
import AppContext from "../../contexts/AppContext";
import { useContext } from "react";

function Header() {
  const menuItems = [
    {
      label: "View recommendations",
      onClick: () => {
        //need to route to recommendations page//
        console.log("View recommendations clicked");
      },
    },
    {
      label: "Sign Out",
      onClick: () => {
        //need to handle sign out//
        console.log("Sign Out clicked");
      },
    },
  ];

  const contextData = useContext(AppContext);
  const isNight = contextData.isNight;

  return (
    <div className="header__content">
      <Dropdown
        trigger={
          <img
            src={`${isNight ? avatar : avatarDark}`}
            className="header__avatar"
          />
        }
        items={[
          {
            onClick: console.log("View Recommendations"),
            label: "View Recommendations",
          },
          {
            onClick: console.log("Sign Out"),
            label: "Sign Out",
          },
        ]}
      />

      <img src={title} className="page__title" />
      <MoonToggle />
    </div>
  );
}

export default Header;
