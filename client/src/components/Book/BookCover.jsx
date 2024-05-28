import React, { useState, useEffect } from "react";
import "../../output.css";
import genericBookImage from "../../assets/generic-book.png";
import axios from "axios";

function BookCover(props) {
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
    <>
      <div
        className={
          props.isAnimated
            ? "rounded hover:shadow-xl hover:shadow-accent"
            : "rounded hover:shadow-none"
        }
        style={{
          backgroundImage: `url(${imgSrc})`,
          width: "180px",
          height: "300px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {imgSrc !== genericBookImage ? null : (
          <p className="text-primary text-center">{props.title}</p>
        )}
      </div>
    </>
  );
}

export default BookCover;
