import React, { useState } from "react";
import "../../output.css";
import { useAuth } from "../../AuthProvider";
import Modal from "react-modal/lib/components/Modal";

Modal.setAppElement("#root");

function DeleteButton(props) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

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

  const openModal = (id) => {
    console.log("received id", id);
    setIsOpen(true);
  };

  function closeModal() {
    setIsOpen(false);
  }
  const handleDelete = async () => {
    console.log("handle delete has been called");

    try {
      const response = await fetch("/api/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: props.id, user: user.id }), // Send the id to delete, and user_id to verify
      });

      if (response.ok) {
        console.log("Item deleted successfully");
        props.onDelete(props.id);
        console.log("DeleteButton handle delete worked");
      } else {
        console.error("Failed to delete item:", response.status);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <div>
      <button
        className="rounded-full bg-red-800 text-primary border-2 border-red-800 hover:bg-primary hover:text-red-800 px-4 my-4"
        onClick={() => openModal(props.id)}
      >
        Delete
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="flex justify-center items-center bg-material text-primary">
          <div>
            <div className="flex justify-center text-center py-4">
              <p>Are you sure you want to delete this post?</p>
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
                onMouseDown={handleDelete}
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default DeleteButton;
