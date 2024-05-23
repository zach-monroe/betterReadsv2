import React from "react";
import { useState, useEffect, useRef } from "react";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

function Meatball(props) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  function toggleMenu() {
    setIsOpen((prevState) => !prevState);
  }

  // Close the menu if the user clicks outside of it
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div ref={menuRef}>
      <div className="flex justify-end">
        <button onClick={toggleMenu}>{!isOpen ? ". . ." : null}</button>
      </div>
      {isOpen ? (
        <div className="flex justify-around">
          <EditButton id={props.id} />
          <DeleteButton id={props.id} onDelete={props.handleDelete} />
        </div>
      ) : null}
    </div>
  );
}

export default Meatball;
