import React from "react";

function Book(props) {
  const imgUrl =
    "https://covers.openlibrary.org/b/isbn/" + props.isbn + "-M.jpg";
  return (
    <div id={props.id}>
      <h1>{props.title}</h1>
      <img src={imgUrl} alt={props.title} _book_cover />
      <h2>
        {props.author_fname} {props.author_lname}
      </h2>
      <p>{props.notes}</p>
      <p>{props.rating}</p>
    </div>
  );
}

export default Book;
