import React from "react";
import BookCover from "./Book/BookCover";
import "../output.css";

function Book(props) {
  return (
    <div id={props.id} className="container mx-auto ml-4">
      <h1>{props.title}</h1>
      <BookCover isbn={props.isbn} title={props.title} />

      <h2>
        {props.author_fname} {props.author_lname}
      </h2>
      <p>{props.notes}</p>
      <p>{props.rating}</p>
      <h2>{props.user_fname}</h2>
    </div>
  );
}

export default Book;
