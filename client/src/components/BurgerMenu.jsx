import React from "react";
import { useState } from "react";
import { slide as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import LogOutModal from "./LogOutModal";
import Modal from "react-modal";

Modal.setAppElement("#root");

function Burger() {
  const [isOpen, setIsOpen] = useState(false);
  const auth = useAuth();

  function simulateEscapeKeyPress() {
    const event = new KeyboardEvent("keydown", {
      key: "Escape",
      keyCode: 27,
      which: 27,
      bubbles: true,
      cancelable: true,
    });

    document.dispatchEvent(event);
  }

  function openModal() {
    simulateEscapeKeyPress();
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function logOut() {
    auth.logOut();
    setIsOpen(false);
  }

  const { token } = useAuth();
  return (
    <div>
      <Menu>
        <Link onClick={simulateEscapeKeyPress} to="/">
          Home
        </Link>
        <Link onClick={simulateEscapeKeyPress} to="/new">
          New
        </Link>
        {token ? (
          <Link onClick={simulateEscapeKeyPress} to="/profile">
            Profile
          </Link>
        ) : (
          <Link onClick={simulateEscapeKeyPress} to="/login">
            Log-In
          </Link>
        )}
        {token ? <button onClick={openModal}>Log-Out</button> : null}
      </Menu>
      <LogOutModal isOpen={isOpen} closeModal={closeModal} logOut={logOut} />
    </div>
  );
}

export default Burger;
