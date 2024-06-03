import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Highlight from "./Highlight";
import { useEffect } from "react";

function AnimateHighlight({ highlightIsOpen, selectedBook, setHighlight }) {

  useEffect(() => {
    if (highlightIsOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [highlightIsOpen]);

  return (
    <AnimatePresence>
      {highlightIsOpen && (
        <motion.div
          layoutId={selectedBook.id}
          className="fixed  inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center max-h-screen overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, type: "tween" }}
          exit={{ opacity: 0 }}
        >
          <motion.div className="p-4 pointer-events-auto ">
            <motion.button
              className="text-white text-2xl absolute top-4 right-4  "
              onClick={() => setHighlight(false)}
              style={{ zIndex: 60 }}
            >
              x
            </motion.button>
            <motion.div
              initial={{ x: "150vw" }}
              animate={{ x: 0 }}
              transition={{ duration: 0.3, style: "tween", delay: 0.7 }}
            >
              <Highlight selectedBook={selectedBook} />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AnimateHighlight;
