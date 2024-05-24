import React from "react";
import { useState } from "react";
import { slide as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import Modal from "react-modal/lib/components/Modal";

Modal.setAppElement("#root");

function Burger() {
  const [isOpen, setIsOpen] = useState(false);
  const auth = useAuth();

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#242424",
    },
  };

  function openModal() {
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
        <Link to="/">Home</Link>
        <Link to="/new">New</Link>
        {token ? (
          <div>
            <Link to="/profile">Profile</Link>
            <div>
              <button onClick={openModal}>Log-Out</button>
            </div>
          </div>
        ) : (
          <Link to="/login">Log-In</Link>
        )}
      </Menu>
      <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
        <div className="flex justify-center items-center bg-material text-primary">
          <div>
            <div className="flex justify-center text-center py-4">
              <p>Are you sure you want to Log-Out?</p>
            </div>
            <div className="flex justify-around py-4">
              <button
                className="rounded-full px-4 bg-material border-primary text-primary border-2"
                onClick={closeModal}
              >
                Close
              </button>
              <button
                className="rounded-full px-4 bg-red-800 border-primary text-primary border-2"
                onClick={logOut}
              >
                Log-Out
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Burger;
