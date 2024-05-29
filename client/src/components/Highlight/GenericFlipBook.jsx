import "../../output.css";
import React, { useState } from "react";
import FrontPage, { BackPage } from "./Page";

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
      next.style.transform = "translateX(0%)";
      prev.style.transform = "translateX(0%)";
    }
  }
  const goNextPage = () => {
    if (currentPage < pages.length) {
      if (currentPage === 0) {
        openBook(true);
      }
      if (currentPage === pages.length) {
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
      if (currentPage === pages.length - 1) {
        openBook(false);
      }
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const pages = [
    <div
      key={0}
      className={`cover ${currentPage >= 1 ? "flipcover" : null}`}
      id="cover"
    ></div>,
  ];

  let i = 0;

  while (i < highlights.length) {
    pages.push(
      <div
        className="page"
        id={`page${Math.ceil(i + 1 / 2)}`}
        key={i + 1}
        style={{
          zIndex: highlights.length - Math.ceil(i + 1 / 2),
          transform:
            currentPage > Math.ceil(i + 1 / 2)
              ? "rotateY(-180deg)"
              : "rotateY(0deg)",
        }}
      >
        <FrontPage highlight={highlights[i].highlight} />
        {i + 1 < highlights.length ? (
          <BackPage highlight={highlights[i + 1].highlight} />
        ) : (
          <BackPage highlight={"hello"} />
        )}
      </div>,
    );
    i += 2;
  }

  pages.push(<div className="back-cover" id="back-cover"></div>);

  return (
    <div className="flex justify-center items-center">
      <button id="prev-btn" onClick={goPrevPage} className="z-50 p-20">
        <i className="fas fa-chevron-left"></i>
      </button>
      <div className="book" id="book">
        {pages}
      </div>
      <button id="next-btn" onClick={goNextPage} className="z-50 p-20">
        <i className="fas fa-chevron-right"></i>
      </button>
    </div>
  );
}

export default GenericFlipBook;
