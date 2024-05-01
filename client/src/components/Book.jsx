import React, { useState, useEffect } from "react";
import axios from "axios";

function Book(props) {
  // BUG: Not all images render, need to figure out how to fix redirects. Read Api documentation for fix: https://openlibrary.org/dev/docs/api/covers
  const [imgSrc, setImgSrc] = useState(null);
  // TODO: Make image and image validation its own component. Send Isbn through props.
  useEffect(() => {
    async function fetchImg() {
      try {
        const imgUrl = `https://covers.openlibrary.org/b/isbn/${props.isbn}-M.jpg`;
        const response = await axios.get(imgUrl, { maxRedirects: 5 });
        setImgSrc(response.request.responseURL);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    }

    fetchImg();
  }, [props.isbn]);

  return (
    <div id={props.id}>
      <h1>{props.title}</h1>
      {imgSrc && <img src={imgSrc} alt={props.title} />}
      <h2>
        {props.author_fname} {props.author_lname}
      </h2>
      <p>{props.notes}</p>
      <p>{props.rating}</p>
    </div>
  );
}

export default Book;
