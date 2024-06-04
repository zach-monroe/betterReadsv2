import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Input from "../components/New/Inputs";
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
    rating: 0,
    id: "",
    user_id: "",
  });
  const navigate = useNavigate();

  //getting data from backend to prefill the form
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/edit/${id}`);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
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
        navigate("/profile");
      } else {
        throw new Error("Failed to add book: " + response.statusText);
      }
    } catch (error) {
      throw new Error("Failed to add book to database: " + error.message);
    }
  }

  return (
    <div className="bg-primary pt-4">
      <div className="flex justify-center items-center min-h-screen text-material">
        <div className="p-8 px-20 rounded bg-material">
          <form onSubmit={handleSubmit}>
            <div className="pb-4">
              <h2 className="mb-2 text-primary">Book Title:</h2>
              <Input
                setBook={setBook}
                name="title"
                type="text"
                placeholder="title"
                value={bookData.title}
              />
            </div>
            <div className="pb-4">
              <h2 className="mb-2 text-primary">Author First Name:</h2>

              <Input
                setBook={setBook}
                name="author_fname"
                type="text"
                placeholder="Author First Name"
                value={bookData.author_fname}
              />
            </div>
            <div className="pb-4">
              <h2 className="mb-2 text-primary">Author Last Name:</h2>
              <Input
                setBook={setBook}
                name="author_lname"
                type="text"
                placeholder="Author Last Name"
                value={bookData.author_lname}
              />
            </div>
            <div className="pb-4">
              <h2 className="mb-2 text-primary">Rate This Read from 1-5:</h2>
              <Input
                setBook={setBook}
                name="rating"
                type="number"
                max="5"
                min="1"
                placeholder="Your rating!"
                value={bookData.rating}
              />
            </div>
            <button
              className="text-primary bg-accent border-primary border-2 rounded-full my-4 px-4 mx-auto block"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Edit;
