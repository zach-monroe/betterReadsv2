import "../../output.css";
import React, { useState } from "react";
import FrontPage, { BackPage } from "./Page";

//TODO: FIX the buttons animating all over the place

function GenericFlipBook({ highlights }) {
  const [currentPage, setCurrentPage] = useState(0);

  function openBook(isAtBeginning) {
    const book = document.getElementById("book");
    const next = document.getElementById("next-btn");
    const prev = document.getElementById("prev-btn");

    if (isAtBeginning === true) {
      book.style.transform = "translateX(50%)";
      next.style.transform = "translateX(100%)";
      prev.style.transform = "translateX(-100%)";
    } else {
      book.style.transform = "translateX(50%)";
      next.style.transform = "translateX(100%)";
      prev.style.transform = "translateX(-100%)";
    }
  }

  function closeBook(isAtBeginning) {
    const book = document.getElementById("book");
    const next = document.getElementById("next-btn");
    const prev = document.getElementById("prev-btn");

    if (isAtBeginning === true) {
      book.style.transform = "translateX(0%)";
      next.style.transform = "translateX(0%)";
      prev.style.transform = "translateX(0%)";
    } else {
      book.style.transform = "translateX(100%)";
      next.style.transform = "translateX(-50%)";
      prev.style.transform = "translateX(50%)";
    }
  }
  const goNextPage = () => {
    if (currentPage < highlights.length - 1) {
      if (currentPage === 0) {
        openBook(true);
      }
      if (currentPage === highlights.length - 2) {
        closeBook(false);
      }
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const goPrevPage = () => {
    if (currentPage > 0) {
      if (currentPage === 1) {
        closeBook(true);
      }
      if (currentPage === highlights.length - 2) {
        openBook(false);
      }
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const pages = [];
  let i = 0;

  while (i < highlights.length) {
    pages.push(
      <div
        className="page"
        id={`page${Math.floor(i / 2)}`}
        key={i}
        style={{
          zIndex: highlights.length - Math.floor(i / 2),
          transform:
            currentPage > Math.floor(i / 2)
              ? "rotateY(-180deg)"
              : "rotateY(0deg)",
        }}
      >
        <FrontPage highlight={highlights[i].highlight} />
        {i + 1 < highlights.length && (
          <BackPage highlight={highlights[i + 1].highlight} />
        )}
      </div>,
    );
    i += 2;
  }

  return (
    <div className="flex justify-center items-center">
      <button id="prev-btn" onClick={goPrevPage} className="z-50 p-20">
        prev
      </button>
      <div className="book" id="book">
        {pages}
      </div>
      <button id="next-btn" onClick={goNextPage} className="z-50 p-20">
        next
      </button>
    </div>
  );
}

export default GenericFlipBook;
