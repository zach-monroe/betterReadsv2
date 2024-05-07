import { useEffect, useState } from "react";
import React from "react";
import Book from "../components/Book";
import "../output.css";

function Home() {
  const [backendData, setData] = useState([]);

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  console.log(JSON.stringify(backendData));

  const { books } = backendData;

  return (
    <div className="px-4 mx-auto pt-16 grid grid-cols-2 justify-center items-center min-h-screen gap-2">
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
