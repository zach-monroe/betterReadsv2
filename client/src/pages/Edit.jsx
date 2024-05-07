import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Input, { TextArea } from "../components/Inputs";

//follows very similarly to New.jsx. Could have made both functions (add, update) fit into one form, but this felt like a cleaner approach.
//specifying any areas that differ from New.jsx for clarity
function Edit() {
  const { id } = useParams();
  const [backendData, setData] = useState({});

  //had to change book to bookData for destructuring backendData to make sense.
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

  //getting data from backend to prefill the form
  useEffect(() => {
    fetch(`/api/edit/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, [id]);

  const { book } = backendData;

  //setting bookData with the destructred backendData variable "book"
  useEffect(() => {
    if (book) {
      setBook(...book);
    }
  }, [book]);

  //submits data to the update endpoint which changes the entry in the database.
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
    <div className="container min-h-screen pt-20">
      <form onSubmit={handleSubmit}>
        <Input
          setBook={setBook}
          name="title"
          type="text"
          placeholder="title"
          value={bookData.author_fname}
        />
        <Input
          setBook={setBook}
          name="author_lname"
          type="text"
          placeholder="Author Last Name"
          value={bookData.author_lname}
        />
        <TextArea
          setBook={setBook}
          name="notes"
          placeholder="Your Notes Here!"
          value={bookData.notes}
        />
        <Input
          setBook={setBook}
          name="rating"
          type="number"
          placeholder="Your rating!"
          value={bookData.rating}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Edit;
