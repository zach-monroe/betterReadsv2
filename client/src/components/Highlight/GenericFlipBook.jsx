import "../../output.css";
import React, { useState } from "react";
import Page from "./Page";

function GenericFlipBook({ highlights }) {
  const [currentPage, setCurrentPage] = useState(0);
  var isAtBeginning = currentPage === 1;

  const openBook = () => {
    const book = document.getElementById("book");
    const next = document.getElementById("next-btn");
    if (book) {
      book.style.transform = "translateX(50%)";
      next.style.transform = "translateX(50%)";
    }
  };

  const closeBook = () => {
    const book = document.getElementById("book");
    if (book) {
      if (isAtBeginning) {
        book.style.transform = "translateX(0%)";
      } else {
        book.style.transform = "translateX(0%)";
      }
    }
  };

  const goNextPage = () => {
    if (currentPage <= highlights.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
    if (currentPage === 0) {
      openBook();
      setCurrentPage((prevPage) => prevPage + 1);
    }
    if (currentPage === highlights.length) {
      closeBook();
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const goPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
    if (currentPage === 1) {
      closeBook();
      setCurrentPage((prevPage) => prevPage - 1);
    }
    if (currentPage > highlights.length) {
      openBook();
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <button id="prev-btn" onClick={goPrevPage}>
        prev
      </button>
      <div className="book" id="book">
        <Page
          key={0}
          page={0}
          highlight="cover"
          z={currentPage === 0 ? highlights.length + 1 : 0}
        />
        {highlights.map((highlight, i) => (
          <Page
            key={i + 1}
            page={i + 1}
            highlight={highlight.highlight}
            z={
              currentPage === i + 1
                ? highlights.length + 1
                : highlights.length - i
            }
          />
        ))}
        <Page
          key={highlights.length + 1}
          page={highlights.length + 1}
          highlight="The buck stops here"
          z={
            currentPage === highlights.length + 1
              ? highlights.length + 1
              : highlights.length
          }
        />
      </div>
      <button id="next-btn" onClick={goNextPage}>
        next
      </button>
    </div>
  );
}

export default GenericFlipBook;
