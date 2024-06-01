import "../../output.css";
import React, { useState } from "react";
import FullPage from "./Page";

// HACK: This file is in fact a hot mess.
// - Have tried using useState instead of pages with a while loop.  It never renders correctly.
// - Have tried using useEffect to make the book re render when the book closes, generating a new highlight.
//
// It seems the only workable solution will be adding an input field
// on the back cover which allows users to add entries and automatically increments.

function UserFlipBook({ highlights }) {
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

  const pages = [
    <div
      key={0}
      className={`cover ${currentPage > 0 ? "flipcover" : null}`}
      id="cover"
    ></div>,
  ];

  let i = 0;
  let counter = 0;

  if (highlights[0].highlight === "No Highlights Added") {
    pages.push(
      <FullPage
        key={0}
        frontHighlight={
          "To add your first post, just click on this text, add your highlight and hit enter!"
        }
        frontEntry={1}
        i={0}
        counter={1}
        currentPage={currentPage}
        backHighlight={"Add your post here!"}
        backEntry={2}
        highlights_length={highlights.length}
        isUser={true}
        user_id={highlights[i].user_id}
        book_id={highlights[i].book_id}
      />,
    );
  } else {
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
            isUser={true}
            user_id={highlights[i].user_id}
            book_id={highlights[i].book_id}
          />,
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
            backHighlight={"Add Your Own Highlight Here!"}
            backEntry={highlights[i].entry + 1}
            highlights_length={highlights.length}
            isUser={true}
            user_id={highlights[i].user_id}
            book_id={highlights[i].book_id}
          />,
        );
      }

      i += 2;
    }
  }

  if (highlights.length % 2 === 0 && highlights.length > 0) {
    pages.push(
      <FullPage
        key={i + 1}
        frontHighlight={"Add Your Own Highlight"}
        frontEntry={highlights[highlights.length - 1].entry + 1}
        i={i + 1}
        counter={counter + 1}
        currentPage={currentPage}
        backHighlight={"Add Your Own Highlight"}
        backEntry={highlights[highlights.length - 1].entry + 2}
        highlights_length={highlights.length}
        isUser={true}
        user_id={highlights[0].user_id}
        book_id={highlights[0].book_id}
      />,
    );
  }

  pages.push(
    <div
      key={pages.length + 1}
      className={`back-cover ${currentPage === pages.length + 1 ? "flipback" : null}`}
      id="back-cover"
      style={{
        zIndex: currentPage > pages.length ? 1000 : -1,
        transition: "zIndex 1.5s",
        transitionDuration: "1.0s",
      }}
    ></div>,
  );

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

export default UserFlipBook;
