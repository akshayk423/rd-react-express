import "./Header.css";
import Dropdown from "../../components/Dropdown/Dropdown.jsx";
import title from "../../assets/background/title.png";
import avatar from "../../assets/icons/avatar.png";

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

  return (
    <div className="header__content">
      <Dropdown
        items={menuItems}
        trigger={
          <img src={avatar} className="header__avatar" alt="User Avatar" />
        }
      />
      <img src={title} className="page__title" />
    </div>
  );
}

export default Header;
