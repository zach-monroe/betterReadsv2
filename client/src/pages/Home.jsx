import { useEffect, useState } from "react";
import React from "react";
import "../output.css";
import BookCard from "../components/BookCard";
import BigBookCard from "../components/Book/BigBookCard";
import AnimateHighlight from "../components/Highlight/AnimateHighlight";
import { motion } from "framer-motion";

function Home() {
  const [backendData, setData] = useState({});
  const [selectedBook, setSelectedBook] = useState(null);
  const [highlightIsOpen, setHighlight] = useState(false);

  //Fetches Data from server to fill BookCards
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

    //calls fetchData within the scope of useEffect so that it actually fills backendData on render.
    fetchData();
  }, []);

  //deconstructing backendData into a "books" array for mapping.
  const { books } = backendData;

  return (
    <div>
      <div className="flex sticky justify-center text-material bg-primary border-b-2 border-primaryDark pb-2">
        <h1 className="pt-10 text-3xl font-libre-baskerville">
          <motion.span
            whileHover={{ rotateY: 180 }}
            className="letter"
            transition={{ duration: 0.3 }}
          >
            R
          </motion.span>
          <motion.span
            whileHover={{ rotateY: 180 }}
            className="letter"
            transition={{ duration: 0.3 }}
          >
            e
          </motion.span>
          <motion.span
            whileHover={{ rotateY: 180 }}
            className="letter"
            transition={{ duration: 0.3 }}
          >
            a
          </motion.span>
          <motion.span
            whileHover={{ rotateY: 180 }}
            className="letter"
            transition={{ duration: 0.3 }}
          >
            d
          </motion.span>
          <motion.span
            whileHover={{ rotateY: 180 }}
            className="letter"
            transition={{ duration: 0.3 }}
          >
            s
          </motion.span>
          <motion.span>.</motion.span>
        </h1>
      </div>
      <div className="flex justify-center bg-primary">
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
      </div>
      <BigBookCard
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
