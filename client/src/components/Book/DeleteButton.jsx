import "../../output.css";
import React, { useState } from "react";
import { useAuth } from "../../AuthProvider";

function DeleteButton(props) {
  const { user } = useAuth();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDeleteClick = () => {
    //shows confirmation menu
    setShowConfirm(true);
  };

  const cancelDelete = () => {
    //removes confirmation menu if user clicks "No".
    setShowConfirm(false);
  };

  const confirmDelete = async () => {
    //this function is called only AFTER the user has confirmed their desire to delete.
    console.log("handle delete has been called");

    try {
      //Calls Delete Endpoint
      const response = await fetch("http://18.219.34.33:5000/api/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: props.id, user: user.id }), // Send the id to delete, and user_id to verify
      });
      //handles when deletion behaves as expected.
      if (response.ok) {
        console.log("Item deleted successfully");
        props.onDelete(props.id); //Called to handle the deletion animation for the client.
        console.log("DeleteButton handle delete worked");
      } else {
        console.error("Failed to delete item:", response.status);
        throw new Error()
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      //closes both the confirmation menu and the BigBookCard
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
