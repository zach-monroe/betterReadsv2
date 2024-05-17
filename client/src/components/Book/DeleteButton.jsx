import React, { useState } from "react";
import "../../output.css";
import { useAuth } from "../../AuthProvider";

function DeleteButton(props) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { user } = useAuth();

  const handleDelete = async (e) => {
    e.preventDefault();
    setIsDeleting(true); // Set deleting state to true

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
      } else {
        console.error("Failed to delete item:", response.status);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <form onSubmit={handleDelete}>
      <input type="hidden" name="id" value={props.id} />
      <button
        className="rounded-full bg-red-800 px-4 mt-4"
        type="submit"
        disabled={isDeleting}
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
    </form>
  );
}

export default DeleteButton;
