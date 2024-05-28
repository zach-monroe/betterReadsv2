import "../../output.css";
import React, { useState } from "react";
import FrontPage, { BackPage } from "./Page";

function GenericFlipBook({ highlights }) {
  const [currentPage, setCurrentPage] = useState(0);

  const goNextPage = () => {
    if (currentPage < highlights.length - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const goPrevPage = () => {
    if (currentPage > 0) {
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
      <button id="prev-btn" onClick={goPrevPage}>
        prev
      </button>
      <div className="book">{pages}</div>
      <button id="next-btn" onClick={goNextPage}>
        next
      </button>
    </div>
  );
}

export default GenericFlipBook;
//
////        <Page
//          key={0}
//          page={0}
//          highlight="cover"
//          z={currentPage === 0 ? highlights.length + 1 : 0}
//        />
//
//      <Page
//          key={highlights.length + 1}
//          page={highlights.length + 1}
//          highlight="The buck stops here"
//          z={
//            currentPage === highlights.length + 1
//              ? highlights.length + 1
//              : highlights.length
//          }
//        />
//
//
//
//
//          <Page
//            key={i}
//            page={i}
//            highlight={highlight.highlight}
//            z={
//              currentPage === i ? highlights.length + 1 : highlights.length - i
//            }
//          />
