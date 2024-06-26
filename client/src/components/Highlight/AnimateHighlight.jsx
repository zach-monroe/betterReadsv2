import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Highlight from "./Highlight";
import { useEffect } from "react";


//this is a wrapper to animate the Highlight component. Much like how AnimateBigBookCard is the animation wrapper for the BookDetailsModal.
function AnimateHighlight({ highlightIsOpen, selectedBook, setHighlight }) {
  // props are sent from whatever page has been rendered (Home.jsx or Profile.jsx)

  useEffect(() => {
    //this makes sure that that the background doesn't scroll when the user has the highlight flipbook open.
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
          className="fixed  inset-0 bg-black bg-opacity-50
          flex items-center justify-center max-h-screen overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, type: "tween" }}
          exit={{ opacity: 0 }}
        >
          <motion.div className="p-4 pointer-events-auto ">
            <motion.button
              className="text-white text-2xl absolute top-4 right-4  "
              onClick={() => setHighlight(false)}
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
        </motion.div >
      )
      }
    </AnimatePresence >
  );
}

export default AnimateHighlight;
