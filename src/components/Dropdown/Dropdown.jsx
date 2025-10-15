import { useState, useRef, useEffect } from "react";
import "./Dropdown.css";

function Dropdown({ trigger, items }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const closeOnOutsideClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", closeOnOutsideClick);
    return () => document.removeEventListener("click", closeOnOutsideClick);
  }, []);

  const handleItemClick = (onClick) => {
    if (onClick) {
      onClick();
      setOpen(false);
    }
  };

  return (
    <div className="dropdown" ref={ref}>
      <button
        className="dropdown__trigger"
        onClick={() => setOpen((prev) => !prev)}
      >
        {trigger}
      </button>

      {open && (
        <ul className="dropdown__menu">
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
