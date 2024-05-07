import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Edit() {
  const { id } = useParams();
  const [backendData, setData] = useState({});
  const [bookData, setBook] = useState({
    title: "",
    author_fname: "",
    author_lname: "",
    notes: "",
    rating: 0,
    id: "",
  });
  const navigate = useNavigate();
  console.log(id);

  useEffect(() => {
    fetch(`/api/edit/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, [id]);

  const { book } = backendData;
  useEffect(() => {
    if (book) {
      setBook(...book);
    }
  }, [book]);

  console.log(JSON.stringify(backendData));

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
    try {
      const response = await fetch("/api/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...bookData }),
      });

      if (response.ok) {
        navigate("/");
      } else {
        throw new Error("Failed to add book: " + response.statusText);
      }
    } catch (error) {
      throw new Error("Failed to add book to database: " + error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        name="title"
        type="text"
        placeholder="title"
        value={bookData.title}
      />
      <input
        onChange={handleChange}
        name="author_fname"
        type="text"
        placeholder="Author First Name"
        value={bookData.author_fname}
      />
      <input
        onChange={handleChange}
        name="author_lname"
        type="text"
        placeholder="Author Last Name"
        value={bookData.author_lname}
      />
      <textarea
        onChange={handleChange}
        name="notes"
        placeholder="Your Notes Here!"
        value={bookData.notes}
      ></textarea>
      <input
        onChange={handleChange}
        name="rating"
        type="number"
        placeholder="Your rating!"
        value={bookData.rating}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Edit;
