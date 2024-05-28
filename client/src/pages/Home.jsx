import { useEffect, useState } from "react";
import React from "react";
import "../output.css";
import BookCard from "../components/BookCard";
import BookCover from "../components/Book/BookCover";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../AuthProvider";

function Home() {
  const [backendData, setData] = useState({});
  const { user } = useAuth();
  const [selectedBook, setSelectedBook] = useState(null);

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

  if (selectedBook) {
    console.log(JSON.stringify(selectedBook));
  }

  return (
    <div>
      <div className="flex justify-center text-material bg-primary">
        {user?.name ? <h1 className="pt-10">Welcome {user.name}</h1> : null}
      </div>
      <div className="flex justify-center bg-primary">
        <div className="px-5 mx-auto pt-8 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xs:max-w-sm text-material min-h-screen min-w-fit gap-2">
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

      <AnimatePresence>
        {selectedBook && (
          <motion.div
            layoutId={selectedBook.book_id}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0, style: "tween" }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-primaryDark min-w-max rounded p-4 shadow-md flex flex-col items-center justify-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <motion.h5 className="text-2xl mb-4">
                {selectedBook.title}
              </motion.h5>
              <motion.div className="mb-4">
                <BookCover
                  isbn={selectedBook.book_isbn}
                  isAnimated={true}
                  title={selectedBook.title}
                />
              </motion.div>
              <motion.h2 className="text-lg mb-2">
                Notes: {selectedBook.notes}
              </motion.h2>
              <motion.p className="text-md mb-2">
                Rating: {selectedBook.rating}
              </motion.p>
              <motion.p className="text-md mb-2">
                Author: {selectedBook.author_fname} {selectedBook.author_lname}
              </motion.p>
              {selectedBook.user_fname && (
                <h2 className="text-md mb-2">
                  User: {selectedBook.user_fname}
                </h2>
              )}
              <motion.button
                className="mt-4 p-2 bg-gray-300 rounded"
                onClick={() => setSelectedBook(null)}
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
export default Home;
