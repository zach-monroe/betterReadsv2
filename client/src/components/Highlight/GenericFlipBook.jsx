import "../../output.css";
import React, { useState } from "react";
import FullPage from "./FullPage";


//This file does not adhere to React best practices.
//There are a few reasons for this.
//1. React Component Libraries for this purpose were not compatible with edit functionality.
//2. Using state management as I have in the rest of this project proved to only inhibit the rendering of the pages.
//////for some reason. The only way to get this to render correctly in the dom was to create my own generatePages function.

function GenericFlipBook({ highlights }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const goNextPage = () => {
    if (currentPage < pages.length) {
      if (currentPage === 0) {
        setIsOpen(true);
      }
      if (currentPage === pages.length - 1) {
        setIsOpen(false);
      }
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const goPrevPage = () => {
    if (currentPage > 0) {
      if (currentPage === 1) {
        setIsOpen(false);
      }
      if (currentPage === pages.length) {
        setIsOpen(true);
      }
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  let pages = []
  const generatePages = () => {
    pages = [
      <div
        key={-1}
        className={`cover ${currentPage > 0 ? "flipcover" : null}`}
        id="cover"
      ></div>,
    ];

    let i = 0;
    let counter = 0;

    while (i < highlights.length) {
      counter = Math.floor(i / 2) + 1;
      if (i + 1 < highlights.length) {
        pages.push(
          <FullPage
            key={i}
            frontHighlight={highlights[i].highlight}
            frontEntry={highlights[i].entry}
            i={i}
            counter={counter}
            currentPage={currentPage}
            backHighlight={highlights[i + 1].highlight}
            backEntry={highlights[i + 1].entry}
            highlights_length={highlights.length}
            highlights={highlights}
            isUser={false}
            user_id={highlights[i].user_id}
            book_id={highlights[i].book_id}
          />
        );
      } else {
        pages.push(
          <FullPage
            key={i}
            frontHighlight={highlights[i].highlight}
            frontEntry={highlights[i].entry}
            i={i}
            counter={counter}
            currentPage={currentPage}
            backHighlight={""}
            highlights_length={highlights.length}
            backEntry={highlights[i].entry + 1}
            highlights={highlights}
            isUser={false}
            user_id={highlights[i].user_id}
            book_id={highlights[i].book_id}
          />
        );
      }

      i += 2;
    }

    pages.push(
      <div
        key={pages.length}
        className={`back-cover ${currentPage > pages.length ? "flipback" : null}`}
        id="back-cover"
        style={{
          zIndex: currentPage > pages.length ? 1000 : -1,
          transition: "zIndex 1.5s",
          transitionDuration: "1.0s",
        }}
      ></div>
    );

  };

  generatePages();

  return (
    <div className="flex justify-center items-center">
      <button
        id="prev-btn"
        onClick={goPrevPage}
        className="z-50 p-20"
        style={{ transform: isOpen ? "translateX(-100%)" : "translateX(0%)" }}
      >
        <i className="fas fa-chevron-left text-white"></i>
      </button>
      <div
        className="book"
        id="book"
        style={{
          transform:
            isOpen && currentPage > 0
              ? "translateX(50%)"
              : !isOpen && currentPage > 0
                ? "translateX(100%)"
                : "translateX(0%)",
        }}
      >
        {pages}
      </div>
      <button
        id="next-btn"
        onClick={goNextPage}
        className="z-50 p-20"
        style={{ transform: isOpen ? "translateX(100%)" : "translateX(0%)" }}
      >
        <i className="fas fa-chevron-right text-white"></i>
      </button>
    </div>
  );
}

export default GenericFlipBook;
