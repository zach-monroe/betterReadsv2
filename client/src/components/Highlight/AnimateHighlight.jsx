import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Highlight from "./Highlight";

function AnimateHighlight({ highlightIsOpen, selectedBook, setHighlight }) {
  return (
    <AnimatePresence>
      {highlightIsOpen && (
        <motion.div
          layoutId={selectedBook.id}
          className="fixed max-h-screen inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, type: "tween" }}
          exit={{ opacity: 0 }}
        >
          <motion.div>
            <motion.button
              className="text-white mt-20"
              onClick={() => setHighlight(false)}
            >
              x
            </motion.button>
            <motion.div
              initial={{ x: "150vw" }}
              animate={{ x: 0 }}
              transition={{ duration: 0.3, style: "tween", delay: 0.7 }}
            >
              <Highlight />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AnimateHighlight;
