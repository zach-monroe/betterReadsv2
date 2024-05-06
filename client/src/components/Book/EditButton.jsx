import React from "react";

function EditButton(props) {
  return (
    <div>
      <button
        onClick={() => {
          console.log(props);
        }}
      >
        Edit
      </button>
    </div>
  );
}

export default EditButton;
