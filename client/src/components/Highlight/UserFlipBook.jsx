import "../../output.css";
import React, { useState } from "react";
import FullPage from "./FullPage";


//This file does not adhere to React best practices.
//There are a few reasons for this.
//1. React Component Libraries for this purpose were not compatible with edit functionality.
//2. Using state management as I have in the rest of this project proved to only inhibit the rendering of the pages.
//////for some reason. The only way to get this to render correctly in the dom was to create my own generatePages function.

function UserFlipBook({ highlights }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  //function for when user hits the next arrow. Handles animations for opening and closing the book (Defined below.)
  const goNextPage = () => {
    if (currentPage < pages.length + 1) {
      if (currentPage === 0) {
        setIsOpen(true);
      }
      if (currentPage === pages.length) {
        setIsOpen(false);
      }
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  //function for when user hits the previous arrow. Handles animations for opening and closing the book (Defined below.)
  const goPrevPage = () => {
    if (currentPage > 0) {
      if (currentPage === 1) {
        setIsOpen(false);
      }
      if (currentPage === pages.length + 1) {
        setIsOpen(true);
      }
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  //defining pages outside of the scope of generatePages so it can be accessed globally if needed.
  let pages = []

  //generatePages generates the pages in accordance with the length and content of highlights.
  const generatePages = () => {

    //begin the pages list with the front cover. key is -1 so I don't have to use 1 based while loop.
    pages = [
      <div
        key={-1}
        className={`cover ${currentPage > 0 ? "flipcover" : null}`}
        id="cover"
      ></div>,
    ];

    let i = 0;
    let counter = 0;


    //used a while loop instead of a for loop for the sake of clarity and visualizing exactly where i is changed.
    while (i < highlights.length + 10) {
      //used highlights.length + 10 because I want users to have blank pages accessible to them for their new entries.


      //counter is used for z-indexing and animation purposes.
      counter = Math.floor(i / 2) + 1;

      if (i + 1 < highlights.length) {
        //if statement ensures that highlights are added first before blank pages.

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

      } else if (i + 1 >= highlights.length && i < highlights.length) {
        //handles if there is a front entry but not a back entry, rendering an editable page in it's place.

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

      } else if (i > highlights.length) {
        //renders blank pages for users to make additions.

        pages.push(
          <FullPage
            key={i}
            frontHighlight={"Add Your Own Highlight Here!"}
            frontEntry={highlights[highlights.length - 1].entry + i}
            i={i}
            counter={counter}
            currentPage={currentPage}
            backHighlight={"Add Your Own Highlight Here!"}
            backEntry={highlights[highlights.length - 1].entry + (i + 1)}
            highlights_length={highlights.length}
            isUser={true}
            user_id={highlights[0].user_id}
            book_id={highlights[0].book_id} />
        )

      }

      i += 2;
    }

    //pushes back-cover to the pages array.
    pages.push(
      <div
        key={pages.length + 1}
        className={`back-cover ${currentPage === pages.length + 2 ? "flipback" : null}`}
        id="back-cover"
        style={{
          zIndex: currentPage > pages.length + 1 ? 1000 : -1,
          transition: "zIndex 1.5s",
          transitionDuration: "1.0s",
        }}
      ></div>,
    );

  }

  generatePages()



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
