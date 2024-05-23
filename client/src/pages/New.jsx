import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input, { TextArea } from "../components/New/Inputs";
import { useAuth } from "../AuthProvider";
import { fetchISBN, addBookToDatabase } from "../components/New/newFunctions";

function New() {
  const { user } = useAuth();
  const [book, setBook] = useState({
    title: "",
    author_fname: "",
    author_lname: "",
    notes: "",
    rating: 5,
    user_id: user.id,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  //Function that combines fetchISBN and addBookToDatabase on form submission
  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      // Fetch the ISBN for the book
      const isbn = await fetchISBN(book.title, book.author_lname);
      console.log("ISBN:", isbn);

      // If ISBN is found, continue with adding the book to the database
      if (isbn) {
        // Call the function to add the book to the database
        await addBookToDatabase(book, isbn);
        console.log("Book added successfully");
        setIsSubmitting(false);
        // once form is submitted correctly redirect the user to the homescreen.
        navigate("/");
      } else {
        console.error("ISBN not found");
        navigate("/new");
      }
    } catch (error) {
      console.error("Error:", error);
      navigate("/new");
    }
  }

  return (
    <div className="bg-primary pt-4">
      <div className="col-start-5 col-end-9 flex justify-center items-center min-h-screen text-material">
        <div className="p-8 px-20 rounded bg-material">
          <form onSubmit={handleSubmit}>
            <div className="pb-4">
              <h2 className="mb-2 text-primary ">Book Title:</h2>
              <Input
                setBook={setBook}
                name="title"
                type="text"
                placeholder="Book Title"
                value={book.title}
              />
            </div>
            <div className="pb-4">
              <h2 className="mb-2 text-primary ">Author First Name:</h2>
              <Input
                setBook={setBook}
                name="author_fname"
                type="text"
                placeholder="Author First Name"
                value={book.author_fname}
              />
            </div>
            <div className="pb-4">
              <h2 className="mb-2 text-primary ">Author Last Name:</h2>
              <Input
                setBook={setBook}
                name="author_lname"
                type="text"
                placeholder="Author Last Name"
                value={book.author_lname}
              />
            </div>
            <div className="pb-4">
              <h2 className="mb-2 text-primary ">Add Your Notes Here:</h2>
              <TextArea
                setBook={setBook}
                name="notes"
                placeholder="Your Notes Here!"
                value={book.notes}
              />
            </div>
            <div className="pb-4">
              <h2 className="mb-2 text-primary ">Rate This Read From 1-5:</h2>
              <Input
                setBook={setBook}
                name="rating"
                type="number"
                max="5"
                min="1"
                placeholder="Your rating!"
                value={book.rating}
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

export default New;
