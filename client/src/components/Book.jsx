import React from "react";
import "../output.css";
import BookCover from "./Book/BookCover";

function Book(props) {
  const title = props.title?.[0].toUpperCase() + props.title?.substring(1);
  const author_fname =
    props.author_fname?.[0].toUpperCase() + props.author_fname?.substring(1);
  const author_lname =
    props.author_lname?.[0].toUpperCase() + props.author_lname?.substring(1);
  const user =
    props.user_fname?.[0].toUpperCase() + props.user_fname?.substring(1);
  return (
    <div
      id={props.id}
      className="bg-primaryDark rounded overflow-hidden shadow-md"
    >
      <h1 className="text-material">Title: {title}</h1>
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
      {user ? <h2>User: {user}</h2> : null}
    </div>
  );
}

export default Book;
