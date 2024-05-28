import { useEffect, useState } from "react";
import React from "react";
import "../output.css";
import BookCard from "../components/BookCard";
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

  return (
    <div>
      <div className="flex justify-center text-material bg-primary">
        {user?.name ? <h1 className="pt-10">Welcome {user.name}</h1> : null}
      </div>
      <div className="flex justify-center bg-primary">
        <div className="px-5 mx-auto pt-8 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xs:max-w-sm text-material min-h-screen min-w-fit gap-2">
          {books && books.length > 0 ? (
            books.map((book, i) => (
              <motion.div
                key={book.book_id}
                initial={{ x: "150vw", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: (i + 1) / 4, type: "tween" }}
                className="mx-4"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.8 }}
                >
                  <BookCard
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
                    onSelect={() => setSelectedBook(book)}
                  />
                </motion.div>
                <br />
              </motion.div>
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
            className="fixed inset-0 bg-white rounded p-4 shadow-md flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.h5 className="text-2xl mb-4">
              {selectedBook.title}
            </motion.h5>
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
              <h2 className="text-md mb-2">User: {selectedBook.user_fname}</h2>
            )}
            <motion.button
              className="mt-4 p-2 bg-gray-300 rounded"
              onClick={() => setSelectedBook(null)}
            >
              Close
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
export default Home;
