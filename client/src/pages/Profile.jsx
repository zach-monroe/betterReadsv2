import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import Book from "../components/Book";
import EditButton from "../components/Book/EditButton";
import DeleteButton from "../components/Book/DeleteButton";

function Profile() {
  const [backendData, setBackendData] = useState({});
  const auth = useAuth();
  const { user } = useAuth();
  const navigate = useNavigate();

  //fetches profile data from server to render onto the page.
  useEffect(() => {
    //using a callback function to handle async functions.
    const fetchData = async () => {
      if (user) {
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
      }
    };

    //calls fetch data function defined within use effect so that it actually triggers.
    fetchData();
  }, [user]);

  //checking backendData
  console.log(backendData);

  //deconstructing backendData into a "books" array for mapping.
  const { books } = backendData;

  //checking books array
  console.log(books);

  //returns a filtered array where all books except the deleted book appear.
  const handleDelete = (bookId) => {
    setBackendData((prevData) => ({
      ...prevData,
      books: prevData.books.filter((book) => book.book_id !== bookId),
    }));
  };

  return (
    <div className="mx-auto text-center justify-center items-center">
      <h1>hello {user?.name}</h1>
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
            <DeleteButton id={book.book_id} onDelete={handleDelete} />
            <EditButton id={book.book_id} />
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
      <br />
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
