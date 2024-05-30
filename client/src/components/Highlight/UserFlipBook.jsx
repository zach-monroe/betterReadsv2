import "../../output.css";
import React, { useState } from "react";
import { UserFrontPage, UserBackPage } from "./Page";

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

  while (i < highlights.length) {
    counter = Math.floor(i / 2) + 1;
    pages.push(
      <div
        className="page"
        id={`page${counter}`}
        key={counter}
        style={{
          zIndex:
            currentPage > counter
              ? highlights.length + i
              : highlights.length - counter,
          transform:
            currentPage > counter ? "rotateY(-180deg)" : "rotateY(0deg)",
        }}
      >
        <UserFrontPage
          highlight={highlights[i].highlight}
          entry={highlights[i].entry}
          user_id={highlights[i].user_id}
          book_id={highlights[i].book_id}
        />
        {i + 1 < highlights.length ? (
          <UserBackPage
            highlight={highlights[i + 1].highlight}
            entry={highlights[i + 1].entry}
            user_id={highlights[i + 1].user_id}
            book_id={highlights[i + 1].book_id}
          />
        ) : (
          <UserBackPage
            highlight={"Add Your Own Highlight Here!"}
            entry={highlights[i].entry + 1}
            user_id={highlights[i].user_id}
            book_id={highlights[i].book_id}
          />
        )}
      </div>,
    );
    i += 2;
  }

  if (highlights.length % 2 === 0 && highlights.length > 0) {
    pages.push(
      <div
        className="page"
        id={`page${counter + 1}`}
        key={counter}
        style={{
          zIndex:
            currentPage > counter + 1
              ? highlights.length + i
              : highlights.length - counter - 1,
          transform:
            currentPage > counter + 1 ? "rotateY(-180deg)" : "rotateY(0deg)",
        }}
      >
        <UserFrontPage
          highlight={"add your highlight here!"}
          entry={i + 1}
          user_id={highlights[0].user_id}
          book_id={highlights[0].book_id}
        />

        <UserBackPage
          highlight={"Add your Highlight here!"}
          entry={i + 2}
          user_id={highlights[0].user_id}
          book_id={highlights[0].book_id}
        />
      </div>,
    );
  }

  pages.push(
    <div
      key={pages.length + 1}
      className={`back-cover ${currentPage === pages.length + 1 ? "flipback" : null}`}
      id="back-cover"
      style={{
        zIndex: currentPage > pages.length ? 99 : -1,
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
