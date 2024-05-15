import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import Book from "../components/Book";

function Profile() {
  const [backendData, setBackendData] = useState([]);
  const auth = useAuth();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/profile/${user.id}`);
        if (response.ok) {
          const data = await response.json();
          setBackendData(data);
        } else {
          console.error("Failed to fetch data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user.id]);
  console.log(backendData);
  const { books } = backendData;
  console.log(books);
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
      <button
        onClick={() => {
          auth.logOut();
        }}
      >
        Log Out
      </button>
    </div>
  );
}

export default Profile;
