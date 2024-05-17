import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input, { TextArea } from "../components/Inputs";
import { useAuth } from "../AuthProvider";

function New() {
  const { user } = useAuth();
  const [book, setBook] = useState({
    title: "",
    author_fname: "",
    author_lname: "",
    notes: "",
    rating: 0,
    user_id: user.id,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  //Function for getting the ISBN number from an API
  async function fetchISBN(title, author_lname) {
    try {
      // API request for getting the ISBN
      const urlTitle = title.toLowerCase().replace(/ /g, "+");
      const urlAuthor = author_lname.toLowerCase();
      const response = await fetch(
        `https://openlibrary.org/search.json?title=${urlTitle}&author=${urlAuthor}`,
      );
      const data = await response.json();

      // Check if ISBN exists
      if (data.docs && data.docs.length > 0 && data.docs[0].isbn) {
        const isbn = data.docs[0].isbn[0];
        return isbn;
      } else {
        return null; // ISBN not found
      }
    } catch (error) {
      throw new Error("Failed to fetch ISBN: " + error.message);
    }
  }

  // Function that handles adding the book to the database by sending an API post request.
  async function addBookToDatabase(bookData, isbn) {
    try {
      //Trying the post request to the api endpoint.
      const response = await fetch("/api/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...bookData, isbn }), // Include ISBN in the request body
      });

      if (!response.ok) {
        throw new Error("Failed to add book: " + response.statusText);
      }
    } catch (error) {
      throw new Error("Failed to add book to database: " + error.message);
    }
  }

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
      }
    } catch (error) {
      console.error("Error:", error);
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
          value={book.title}
        />
        <Input
          setBook={setBook}
          name="author_fname"
          type="text"
          placeholder="Author First Name"
          value={book.author_fname}
        />
        <Input
          setBook={setBook}
          name="author_lname"
          type="text"
          placeholder="Author Last Name"
          value={book.author_lname}
        />
        <TextArea
          setBook={setBook}
          name="notes"
          placeholder="Your Notes Here!"
          value={book.notes}
        />
        <Input
          setBook={setBook}
          name="rating"
          type="number"
          placeholder="Your rating!"
          value={book.rating}
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default New;
