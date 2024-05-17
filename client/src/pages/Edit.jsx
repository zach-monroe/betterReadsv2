import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Input, { TextArea } from "../components/Inputs";
import { useAuth } from "../AuthProvider";

//follows very similarly to New.jsx. Could have made both functions (add, update) fit into one form, but this felt like a cleaner approach.
//
//I will be specifying any areas that differ from New.jsx for clarity
function Edit() {
  const { user } = useAuth();
  const { id } = useParams(); //used for finding the database entry by ID is passed as a query param.
  const [backendData, setData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  //had to change book to bookData for destructuring backendData to make sense.
  const [bookData, setBook] = useState({
    title: "",
    author_fname: "",
    author_lname: "",
    notes: "",
    rating: 0,
    id: "",
    user_id: "",
  });
  const navigate = useNavigate();

  //getting data from backend to prefill the form
  useEffect(() => {
    fetch(`/api/edit/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, [id]);

  const { book } = backendData;

  //setting bookData with the destructred backendData variable "book" (prefilling the form values with previously submitted user data)
  //This also validates if the user has editting rights for this book. (Crudely.)
  useEffect(() => {
    if (book) {
      if (user !== null && book[0].user_id === user.id) {
        setBook(...book);
      } else {
        navigate("/login");
      }
    }
  }, [book, user, navigate]);

  //submits data to the update endpoint which changes the entry in the database.
  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...bookData }),
      });

      if (response.ok) {
        setIsSubmitting(false);
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
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default Edit;
