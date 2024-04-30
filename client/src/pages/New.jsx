import React from "react";
import { useState } from "react";

function New() {
  const [book, setBook] = useState({
    title: "",
    author_fname: "",
    author_lname: "",
    notes: "",
    rating: null,
  });

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    setBook((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });

    // Check if the request was successful (status code 2xx)
    if (response.ok) {
      // Assuming the response contains JSON data, you can access it using response.json()
      const data = await response.json();
      console.log("Book added successfully:", data);
    } else {
      // If the request was not successful, log the error message
      console.error("Error adding book:", response.statusText);
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        name="title"
        type="text"
        placeholder="title"
      />
      <input
        onChange={handleChange}
        name="author_fname"
        type="text"
        placeholder="Author First Name"
      />
      <input
        onChange={handleChange}
        name="author_lname"
        type="text"
        placeholder="Author Last Name"
      />
      <textarea
        onChange={handleChange}
        name="notes"
        placeholder="Your Notes Here!"
      ></textarea>
      <input
        onChange={handleChange}
        name="rating"
        type="number"
        placeholder="Your rating!"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default New;
