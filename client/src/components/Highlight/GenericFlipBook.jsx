import "../../output.css";
import React, { useState } from "react";
import Page from "./Page";

function GenericFlipBook({ highlights }) {
  const [currentPage, setCurrentPage] = useState(0);

  const goNextPage = () => {
    if (currentPage < highlights.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const goPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <button id="prev-btn" onClick={goPrevPage}>
        prev
      </button>
      <div className="book" id="book">
        {highlights.map((highlight, i) => (
          <Page
            key={i}
            page={i}
            highlight={highlight.highlight}
            z={
              currentPage === i ? highlights.length + 1 : highlights.length - i
            }
          />
        ))}
      </div>
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
