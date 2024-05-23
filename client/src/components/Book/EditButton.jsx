import React from "react";
import { useNavigate } from "react-router-dom";
function EditButton(props) {
  const navigate = useNavigate();

  return (
    <div>
      <button
        className="bg-gray-800 rounded-full text-white px-6 my-4"
        onClick={() => {
          navigate(`/edit/${props.id}`);
        }}
      >
        {" "}
        Edit{" "}
      </button>
    </div>
  );
}

export default EditButton;
