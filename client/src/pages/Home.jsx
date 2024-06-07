import React, { useEffect, useState } from "react";
import "../output.css";
import BookCard from "../components/BookCard";
import AnimateBigBookCard from "../components/Book/BigBookCard";
import AnimateHighlight from "../components/Highlight/AnimateHighlight";
import Header from "../components/Header";
import LoadingSpinner from "../components/LoadingSpinner";

function Home() {
  const [backendData, setBackendData] = useState({});
  const [selectedBook, setSelectedBook] = useState(null);
  const [highlightIsOpen, setHighlight] = useState(false);
  const [loading, setLoading] = useState(true);

  //Fetches Data from server to fill BookCards
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://18.219.34.33:5000/api");
        const data = await response.json();
        setBackendData(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    //calls fetchData within the scope of useEffect so that it actually fills backendData on render.
    fetchData();
  }, []);

  //deconstructing backendData into a "books" array for mapping.
  const { books } = backendData;

  return (
    <div>
      <div className="flex sticky justify-center text-material bg-primary border-b-2 border-primaryDark pb-2">
        <Header />
      </div>
      <div className="flex justify-center bg-primary">
        {loading ? (
          <div className="flex min-h-screen items-center">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="my-4 px-5 mx-auto pt-8 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xs:max-w-sm text-material min-h-screen min-w-fit gap-2">
            {books && books.length > 0 ? (
              books.map((book, i) => (
                <BookCard
                  key={i}
                  index={i}
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
                  onSelect={() => setSelectedBook(book)}
                />
              ))
            ) : (
              <p>No Data</p>
            )}
          </div>
        )}
      </div>
      <AnimateBigBookCard
        isProfile={false}
        selectedBook={selectedBook}
        setSelectedBook={setSelectedBook}
        setHighlight={setHighlight}
      />
      <AnimateHighlight
        highlightIsOpen={highlightIsOpen}
        setHighlight={setHighlight}
        selectedBook={selectedBook}
      />
    </div>
  );
}
export default Home;
