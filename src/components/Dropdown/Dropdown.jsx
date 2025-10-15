import { useState, useRef, useEffect, useContext } from "react";
import "./Dropdown.css";
import AppContext from "../../contexts/AppContext";

// trigger is the element that opens the menu, items is the options for the menu
function Dropdown({ trigger, items }) {
  //context variable for current theme
  const contextData = useContext(AppContext);
  const isNight = contextData.isNight;

  //useState and ref logic to handle opening and closing of dropdown
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // on mount
  useEffect(() => {
    // listener function for checking if the click event is on the current element
    const closeOnOutsideClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", closeOnOutsideClick);
    //removes the listener after unmounted
    return () => document.removeEventListener("click", closeOnOutsideClick);
  }, []);

  const handleItemClick = (onClick) => {
    if (onClick) {
      onClick();
      setOpen(false);
    }
  };

  return (
    <div className={`dropdown`} ref={ref}>
      <button
        className="dropdown__trigger"
        onClick={() => setOpen((prev) => !prev)}
      >
        {trigger}
      </button>

      {open && (
        <ul
          className={`dropdown__menu ${
            isNight ? "dropdown__menu_type_night" : "dropdown__menu_type_blood"
          }`}
        >
          {items.map((item, i) => (
            <li
              key={i}
              className="dropdown__item"
              onClick={() => handleItemClick(item.onClick)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
