import React from "react";

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

  return (
    <input
      name={props.name}
      type={props.type}
      onChange={handleChange}
      placeholder={props.placeholder}
      value={props.value}
    />
  );
}

//replaces <textarea> element in form.
function TextArea(props) {
  const setBook = props.setBook;
  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    setBook((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  }

  return (
    <textarea
      name={props.name}
      type={props.type}
      onChange={handleChange}
      placeholder={props.placeholder}
      value={props.value}
    ></textarea>
  );
}

export default Input;
export { TextArea };
