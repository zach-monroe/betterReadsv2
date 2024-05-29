import "../../output.css";
import React, { useState } from "react";
import { useAuth } from "../../AuthProvider";

function DeleteButton(props) {
  const { user } = useAuth();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
  };

  const confirmDelete = async () => {
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
      props.closePopUp();
      setShowConfirm(false);
    }
  };

  return (
    <div>
      {!showConfirm ? (
        <button
          onClick={handleDeleteClick}
          className=" px-6 my-4 border-2 border-red-800 bg-red-800 hover:bg-white text-white hover:text-red-800 rounded-full"
        >
          Delete
        </button>
      ) : (
        <div className="flex flex-col items-center">
          <p>Are you sure?</p>
          <div className="flex justify-around">
            <button
              onClick={confirmDelete}
              className="m-2 px-4 bg-red-800 text-white rounded-full"
            >
              Yes
            </button>
            <button
              onClick={cancelDelete}
              className="m-2 px-4 bg-primary text-material rounded-full"
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteButton;
