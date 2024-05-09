import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import Book from "../components/Book";

function Profile() {
  const [backendData, setBackendData] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Define a function inside useEffect to fetch data
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/profile/${user.id}`);
        if (response.ok) {
          const data = await response.json();
          setBackendData(data);
        } else {
          // Handle non-OK response status
          console.error("Failed to fetch data:", response.status);
        }
      } catch (error) {
        // Handle fetch errors
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the fetchData function

    // Add user.id to dependency array to ensure useEffect runs when user.id changes
  }, [user.id]);

  const { books } = backendData;
  return (
    <div>
      <h1>hello {user.name}</h1>
      {books && books.length > 0 ? (
        books.map((book, i) => (
          <div className="-mx-1" key={i}>
            <Book
              id={book.book_id}
              title={book.title}
              author_fname={book.author_fname}
              author_lname={book.author_lname}
              notes={book.notes}
              rating={book.rating}
              isbn={book.book_isbn}
            />
          </div>
        ))
      ) : (
        <p>No Data</p>
      )}
      <button
        onClick={() => {
          navigate("/new");
        }}
      >
        make a new post!
      </button>
    </div>
  );
}

export default Profile;
