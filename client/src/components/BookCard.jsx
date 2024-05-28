import React from "react";
import { motion } from "framer-motion";
import "../output.css";
import BookCover from "./Book/BookCover";
import Meatball from "./Book/Meatball";

function BookCard(props) {
  const {
    id,
    title,
    author_fname,
    author_lname,
    notes,
    rating,
    isbn,
    user_fname,
    menu,
    onSelect,
  } = props;

  let shortTitle = "";
  const formattedTitle = title?.[0].toUpperCase() + title?.substring(1);
  const formattedAuthorFname =
    author_fname?.[0].toUpperCase() + author_fname?.substring(1);
  const formattedAuthorLname =
    author_lname?.[0].toUpperCase() + author_lname?.substring(1);
  const formattedUser =
    user_fname?.[0].toUpperCase() + user_fname?.substring(1);
  if (formattedTitle.length > 24) {
    shortTitle = formattedTitle.substring(0, 21) + "...";
  }

  return (
    <motion.div
      layoutId={id}
      onClick={onSelect}
      className="bg-primaryDark rounded overflow-hidden shadow-md max-w-80 py-2 px-2 cursor-pointer"
    >
      <motion.h1 className="text-material pt-2">
        Title: {shortTitle !== "" ? shortTitle : formattedTitle}
      </motion.h1>
      <motion.div className="flex justify-center">
        <BookCover isbn={isbn} title={formattedTitle} />
      </motion.div>
      <motion.h2>
        Author: {formattedAuthorFname} {formattedAuthorLname}
      </motion.h2>
      <motion.p>Notes: {notes}</motion.p>
      <motion.p>Rating {rating}</motion.p>
      {formattedUser ? <h2 className="pb-2">User: {formattedUser}</h2> : null}
      {menu === true ? (
        <Meatball id={id} handleDelete={props.handleDelete} />
      ) : null}
    </motion.div>
  );
}

export default BookCard;
