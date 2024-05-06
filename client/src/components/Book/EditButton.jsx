import React from "react";
import { useNavigate } from "react-router-dom";

function EditButton(props) {
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => {
          navigate(`/edit/${props.id}`);
        }}
      >
        Edit
      </button>
    </div>
  );
}

export default EditButton;
