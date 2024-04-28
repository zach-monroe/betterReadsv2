import { useEffect, useState } from "react";
import React from "react";

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
        books.map((book, i) => <p key={i}>{book.title}</p>)
      ) : (
        <p>No Data</p>
      )}
    </div>
  );
}

export default Home;
