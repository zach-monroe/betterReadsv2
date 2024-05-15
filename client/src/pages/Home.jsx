import { useEffect, useState } from "react";
import React from "react";
import Book from "../components/Book";
import "../output.css";
import { useAuth } from "../AuthProvider";

function Home() {
  const [backendData, setData] = useState({});
  const { user } = useAuth();

  //fetches all book data from server
  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []); //using promises here, but not using elsewhere.  FIX: Turn to async await.

  console.log(JSON.stringify(backendData));

  const { books } = backendData;

  return (
    <div className="px-4 mx-auto pt-16 grid grid-cols-2 justify-center items-center min-h-screen gap-2">
      {user?.name ? <p>Welcome {user.name}</p> : null}
      {books && books.length > 0 ? (
        books.map((book, i) => (
          <div className="-mx-1">
            <Book
              key={i}
              id={book.book_id}
              title={book.title}
              author_fname={book.author_fname}
              author_lname={book.author_lname}
              notes={book.notes}
              rating={book.rating}
              isbn={book.book_isbn}
              user_fname={book.user_fname}
              user_id={book.user_id}
            />
          </div>
        ))
      ) : (
        <p>No Data</p>
      )}
    </div>
  );
}
export default Home;
