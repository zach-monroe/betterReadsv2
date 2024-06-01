import React from "react";
import { motion } from "framer-motion";
import "../output.css";
import BookCover from "./Book/BookCover";

function BookCard(props) {
  const { id, title, author_fname, author_lname, isbn, user_fname, onSelect } =
    props;

  //this handles formatting the data to present properly.
  // BUG: Doesn't handle when there is more than one word in a title.

  let shortTitle = "";
  const formattedTitle = title?.[0].toUpperCase() + title?.substring(1);
  const formattedAuthorFname =
    author_fname?.[0].toUpperCase() + author_fname?.substring(1);
  const formattedAuthorLname =
    author_lname?.[0].toUpperCase() + author_lname?.substring(1);
  const formattedUser =
    user_fname?.[0].toUpperCase() + user_fname?.substring(1);

  //keeps titles from being too long on home page.
  if (formattedTitle.length > 24) {
    shortTitle = formattedTitle.substring(0, 21) + "...";
  }

  return (
    <motion.div
      key={props.index}
      initial={{ x: "150vw", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: (props.index + 1) / 4, type: "tween" }}
      className="mx-4"
    >
      <motion.div whileHover={{ scale: 1.05 }}>
        <motion.div
          layoutId={id}
          onClick={onSelect}
          className="bg-primaryDark rounded overflow-hidden shadow-md max-w-80 py-4 px-4 my-4 cursor-pointer"
        >
          <motion.h1 className="text-material flex w-full justify-center my-2">
            Title: {shortTitle !== "" ? shortTitle : formattedTitle}
          </motion.h1>
          <motion.div className="flex ml-0 justify-center">
            <BookCover isbn={isbn} isAnimated={false} title={formattedTitle} />
          </motion.div>
          <motion.h2 className=" flex w-full justify-center my-2">
            Author: {formattedAuthorFname} {formattedAuthorLname}
          </motion.h2>
          {formattedUser ? (
            <h2 className="pb-2 flex w-full justify-center">
              User: {formattedUser}
            </h2>
          ) : null}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default BookCard;
