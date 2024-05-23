import React from "react";
import "../output.css";
import BookCover from "./Book/BookCover";

function Book(props) {
  let shortTitle = "";
  const title = props.title?.[0].toUpperCase() + props.title?.substring(1);
  const author_fname =
    props.author_fname?.[0].toUpperCase() + props.author_fname?.substring(1);
  const author_lname =
    props.author_lname?.[0].toUpperCase() + props.author_lname?.substring(1);
  const user =
    props.user_fname?.[0].toUpperCase() + props.user_fname?.substring(1);
  if (title.length > 24) {
    shortTitle = title.substring(0, 21) + "...";
  }
  return (
    <div
      id={props.id}
      className="bg-primaryDark rounded overflow-hidden shadow-md max-w-80 py-2 px-2"
    >
      <h1 className="text-material pt-2">
        Title: {shortTitle !== "" ? shortTitle : title}
      </h1>
      <br />
      <div className="flex justify-center">
        <BookCover isbn={props.isbn} title={title} />
      </div>
      <br />
      <h2>
        Author: {author_fname} {author_lname}
      </h2>
      <p>Notes: {props.notes}</p>
      <p>Rating {props.rating}</p>
      {user ? <h2 className="pb-2">User: {user}</h2> : null}
    </div>
  );
}

export default Book;
