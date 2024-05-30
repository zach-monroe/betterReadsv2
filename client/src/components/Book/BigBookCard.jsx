import React from "react";
import "../../output.css";
import { motion, AnimatePresence } from "framer-motion";
import BookDetailsModal from "./BookDetailsModal";

function BigBookCard({
  isProfile,
  selectedBook,
  setSelectedBook,
  handleDelete,
  setHighlight,
}) {
  function closePopUp() {
    setSelectedBook(null);
  }

  return (
    <AnimatePresence>
      {selectedBook && (
        <motion.div
          layoutId={selectedBook.book_id}
          className="fixed max-h-screen inset-0 bg-black bg-opacity-50 z-50 flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1, style: "tween" }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="min-w-max"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0, duration: 0.1, style: "tween" }}
            exit={{ opacity: 0 }}
          >
            <BookDetailsModal
              selectedBook={selectedBook}
              isProfile={isProfile}
              handleDelete={handleDelete}
              closePopUp={closePopUp}
              setHighlight={setHighlight}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default BigBookCard;
