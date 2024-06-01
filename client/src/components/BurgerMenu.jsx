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
    <div className="font-libre-baskerville">
      <Menu>
        <Link onClick={simulateEscapeKeyPress} to="/" className="py-4">
          Home
        </Link>
        <Link onClick={simulateEscapeKeyPress} to="/new" className="py-4">
          New
        </Link>
        {token ? (
          <Link onClick={simulateEscapeKeyPress} to="/profile" className="py-4">
            Profile
          </Link>
        ) : (
          <Link onClick={simulateEscapeKeyPress} to="/login" className="py-4">
            Log-In
          </Link>
        )}
        {token ? (
          <button onClick={openModal} className="py-4">
            Log-Out
          </button>
        ) : null}
      </Menu>
      <LogOutModal isOpen={isOpen} closeModal={closeModal} logOut={logOut} />
    </div>
  );
}

export default Burger;
