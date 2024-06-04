import React from "react";
import { useState } from "react";
import { slide as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import LogOutModal from "./LogOutModal";
import { motion } from "framer-motion";
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
        <motion.div initial={{ scale: 1 }} className="my-4" whileHover={{ scale: 1.2, x: 40, }}>
          <Link onClick={simulateEscapeKeyPress} to="/" className="py-4">
            Home
          </Link></motion.div>

        <motion.div initial={{ scale: 1 }} className="my-4" whileHover={{ scale: 1.2, x: 40, }}>
          <Link onClick={simulateEscapeKeyPress} to="/new" className="py-4">
            New
          </Link></motion.div>
        {token ? (
          <motion.div initial={{ scale: 1 }} className="my-4" whileHover={{ scale: 1.2, x: 40, }}>
            <Link onClick={simulateEscapeKeyPress} to="/profile" className="py-4">
              Profile
            </Link></motion.div>
        ) : (

          <motion.div initial={{ scale: 1 }} className="my-4" whileHover={{ scale: 1.2, x: 40, }}>
            <Link onClick={simulateEscapeKeyPress} to="/login" className="py-4">
              Log-In
            </Link></motion.div>
        )}
        {token ? (

          <motion.div initial={{ scale: 1 }} className="my-4" whileHover={{ scale: 1.2, x: 40, }}>
            <button onClick={openModal} className="hover:italic">
              Log-Out
            </button></motion.div>
        ) : null}
      </Menu>
      <LogOutModal isOpen={isOpen} closeModal={closeModal} logOut={logOut} />
    </div>
  );
}

export default Burger;
