import React from "react";
import "../../output.css";

//made input and change handling into a separate component to make the New.jsx and Edit.jsx file more readable.

//replaces <input> element in form
function Input(props) {
  const setBook = props.setBook;
  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    setBook((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  }
  const type = props.type;
  return (
    <input
      name={props.name}
      type={props.type}
      onChange={handleChange}
      placeholder={props.placeholder}
      {...(type === "number" ? { max: 5, min: 1 } : null)}
      value={props.value}
      className="px-2 rounded"
      required
    />
  );
}

export default Input;
