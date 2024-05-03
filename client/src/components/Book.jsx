import React, { useState, useEffect } from "react";
import axios from "axios";
import genericBookImage from "../assets/generic-book.jpg"; // Import your generic book image

function Book(props) {
  const [imgSrc, setImgSrc] = useState(null);

  useEffect(() => {
    async function fetchImg() {
      try {
        const imgUrl = `https://covers.openlibrary.org/b/isbn/${props.isbn}-M.jpg`;
        const response = await axios.get(imgUrl, { maxRedirects: 5 });

        // Check if response is successful and the content appears to be an image
        if (
          response &&
          response.status === 200 &&
          response.headers["content-type"].startsWith("image")
        ) {
          setImgSrc(response.request.responseURL); // Set fetched image as source
        } else {
          setImgSrc(genericBookImage); // Fallback to generic book image
        }
      } catch (error) {
        console.error("Error fetching image:", error);
        setImgSrc(genericBookImage); // Fallback to generic book image
      }
    }

    fetchImg();
  }, [props.isbn]);

  return (
    <div id={props.id}>
      <h1>{props.title}</h1>
      {imgSrc !== genericBookImage ? (
        <img src={imgSrc} alt={props.title} />
      ) : (
        <div
          style={{
            backgroundImage: `url(${genericBookImage})`,
            width: "180px",
            height: "300px",
            backgroundSize: "cover",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {props.title}
        </div>
      )}
      <h2>
        {props.author_fname} {props.author_lname}
      </h2>
      <p>{props.notes}</p>
      <p>{props.rating}</p>
    </div>
  );
}

export default Book;
