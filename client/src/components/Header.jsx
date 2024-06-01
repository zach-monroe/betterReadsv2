import React from "react";
import { motion } from "framer-motion";

function Header() {
  return (
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
    </h1>
  );
}

export default Header;
