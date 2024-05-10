import React from "react";
import BookCover from "./Book/BookCover";
import DeleteButton from "./Book/DeleteButton";
import EditButton from "./Book/EditButton";
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
      <DeleteButton id={props.id} />
      <EditButton id={props.id} />
      <h2>
        {props.user_fname} id number {props.user_id}
      </h2>
    </div>
  );
}

export default Book;
