import { useEffect, useState } from "react";
import React from "react";
import Book from "../components/Book";

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
    <div>
      {books && books.length > 0 ? (
        books.map((book, i) => (
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
        ))
      ) : (
        <p>No Data</p>
      )}
    </div>
  );
}
export default Home;
