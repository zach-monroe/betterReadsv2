import React from "react";
import BookCover from "./BookCover";
import { motion, AnimatePresence } from "framer-motion";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";

function BigBookCard({
  isProfile,
  selectedBook,
  setSelectedBook,
  handleDelete,
}) {
  //handles exiting BigBookCard on Deletion. Passed down to DelteButton component.
  function closePopUp() {
    setSelectedBook(null);
  }

  return (
    <>
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
              {isProfile ? (
                <>
                  <motion.div>
                    <EditButton id={selectedBook.book_id} />
                  </motion.div>
                  <motion.div>
                    <DeleteButton
                      id={selectedBook.book_id}
                      onDelete={handleDelete}
                      closePopUp={closePopUp}
                    />
                  </motion.div>{" "}
                </>
              ) : null}
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
    </>
  );
}

export default BigBookCard;
