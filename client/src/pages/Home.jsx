import { useEffect, useState } from "react";
import React from "react";
import "../output.css";
import Book from "../components/Book";
import { useAuth } from "../AuthProvider";

function Home() {
  const [backendData, setData] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api");
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  console.log(JSON.stringify(backendData));

  const { books } = backendData;

  return (
    <div>
      <div className="flex justify-center text-material bg-primary">
        {user?.name ? <h1 className="pt-10">Welcome {user.name}</h1> : null}
      </div>
      <div className="flex justify-center bg-primary">
        <div className="px-5 mx-auto pt-8 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1  xs:max-w-sm text-material min-h-screen min-w-fit gap-2">
          {books && books.length > 0 ? (
            books.map((book, i) => (
              <div className="mx-4">
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
                  menu={false}
                />
                <br />
              </div>
            ))
          ) : (
            <p>No Data</p>
          )}
        </div>
      </div>
    </div>
  );
}
export default Home;
