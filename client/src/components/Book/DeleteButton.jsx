import React from "react";

function DeleteButton(props) {
  return (
    <form action="/api/delete" method="POST">
      <input type="hidden" name="id" value={props.id} />
      <button
        onSubmit={(event) => {
          event.preventDefault();
        }}
        type="submit"
      >
        Delete
      </button>
    </form>
  );
}

export default DeleteButton;
