import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import Book from "../components/Book";

function Profile() {
  const [backendData, setBackendData] = useState({});
  const auth = useAuth();
  const { user } = useAuth();
  const navigate = useNavigate();

  //fetches profile data from server to render onto the page.
  useEffect(() => {
    //using a callback function to handle async functions.
    const fetchData = async () => {
      try {
        //requests the user's data by using their id number.
        const response = await fetch(`/api/profile/${user.id}`);
        if (response.ok) {
          //handles normal response.
          const data = await response.json();
          setBackendData(data);
        } else {
          //prints status and error message if fetch does not work.
          console.error("Failed to fetch data:", response.status);
        }
      } catch (error) {
        //basic error handling
        console.error("Error fetching data:", error);
      }
    };

    //calls fetch data function defined within use effect so that it actually triggers.
    fetchData();
  }, [user.id]);

  //checking backendData
  console.log(backendData);

  //deconstructing backendData into a "books" array for mapping.
  const { books } = backendData;

  //checking books array
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
