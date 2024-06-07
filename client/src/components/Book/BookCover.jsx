import React, { useState, useEffect } from "react";
import "../../output.css";
import genericBookImage from "../../assets/generic-book.png";

function BookCover(props) {
  const [imgSrc, setImgSrc] = useState(null);

  useEffect(() => {
    async function fetchImg() {
      try {
        const imgUrl = `https://covers.openlibrary.org/b/isbn/${props.isbn}-M.jpg`;
        const response = await fetch(imgUrl, { redirect: 'follow' });

        // Check if response is successful and the content appears to be an image
        const contentType = response.headers.get("content-type");
        if (response.ok && contentType && contentType.startsWith("image")) {
          setImgSrc(response.url); // Set fetched image as source
        } else {
          setImgSrc(genericBookImage); // Fallback to generic book image
        }
      } catch (error) {
        setImgSrc(genericBookImage); // Fallback to generic book image
      }
    }

    fetchImg();
  }, [props.isbn]);

  return (
    <>
      <div
        className={ //Insures that the shadow functionality only appears in the BigBookCard
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
          <p className="text-primary text-center font-libre-baskerville">{props.title}</p>
        )}
      </div>
    </>
  );
}

export default BookCover;
