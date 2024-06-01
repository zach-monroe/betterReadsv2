import React from "react";
import { useNavigate } from "react-router-dom";
function EditButton(props) {
  const navigate = useNavigate();

  return (
    <div>
      <button
        className="bg-material rounded-full w-[100px] text-primary border-2 border-material hover:bg-primary hover:text-material px-8 my-4"
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
