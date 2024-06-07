import React from "react";
import Modal from "react-modal";

function LogOutModal({ isOpen, closeModal, logOut }) {
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

  return (
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
  );
}

export default LogOutModal;
