import React, { useState } from "react";

function New() {
  // TODO: Users can edit isbn?
  const [book, setBook] = useState({
    title: "",
    author_fname: "",
    author_lname: "",
    notes: "",
    rating: 0,
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

    try {
      // Fetch the ISBN for the book
      const isbn = await fetchISBN(book.title, book.author_lname);
      console.log("ISBN:", isbn);

      // If ISBN is found, continue with adding the book to the database
      if (isbn) {
        // Call the function to add the book to the database
        await addBookToDatabase(book, isbn);
        console.log("Book added successfully");
      } else {
        console.error("ISBN not found");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

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

  async function addBookToDatabase(bookData, isbn) {
    try {
      // Call your API endpoint to add the book to the database
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

  return (
    <form onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        name="title"
        type="text"
        placeholder="title"
        value={book.title}
      />
      <input
        onChange={handleChange}
        name="author_fname"
        type="text"
        placeholder="Author First Name"
        value={book.author_fname}
      />
      <input
        onChange={handleChange}
        name="author_lname"
        type="text"
        placeholder="Author Last Name"
        value={book.author_lname}
      />
      <textarea
        onChange={handleChange}
        name="notes"
        placeholder="Your Notes Here!"
        value={book.notes}
      ></textarea>
      <input
        onChange={handleChange}
        name="rating"
        type="number"
        placeholder="Your rating!"
        value={book.rating}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default New;
