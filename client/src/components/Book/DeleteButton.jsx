import React, { useState } from "react";

function DeleteButton(props) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true); // Set deleting state to true

    try {
      const response = await fetch("/api/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: props.id }), // Send the id to delete
      });

      if (response.ok) {
        // If deletion is successful, you can perform any UI updates here if needed
        console.log("Item deleted successfully");
      } else {
        // If deletion fails, handle the error
        console.error("Failed to delete item:", response.status);
      }
    } catch (error) {
      // If an error occurs during the deletion process, log it
      console.error("Error deleting item:", error);
    } finally {
      setIsDeleting(false); // Reset the deleting state to false
    }
  };

  return (
    <form onSubmit={handleDelete}>
      <input type="hidden" name="id" value={props.id} />
      <button type="submit" disabled={isDeleting}>
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
    </form>
  );
}

export default DeleteButton;
