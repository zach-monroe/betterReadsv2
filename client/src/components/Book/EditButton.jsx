import React from "react";

function test(x) {
  console.log(x);
}

function EditButton(props) {
  return (
    <button
      onClick={() => {
        test(props);
      }}
    >
      Edit
    </button>
  );
}

export default EditButton;
