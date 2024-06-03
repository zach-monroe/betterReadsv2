import React, { useState, useRef, useEffect } from "react";
import "../output.css";
import HTMLFlipBook from "react-pageflip";
import Page from "./TestHighlight/Page";

function TestGenHighlight({ highlights }) {
  const book_id = highlights[0].book_id;
  const user_id = highlights[0].user_id;
  const [pages, setPages] = useState([]);


  const bookRef = useRef(null);

  useEffect(() => {
    const pageElements =
      highlights.length > 0
        ? highlights.map((page, i) => (
          <Page
            key={i}
            id={i}
            entry={page.entry}
            user_id={user_id}
            book_id={book_id}
            setPages={setPages}
          >
            {page.highlight}
          </Page>
        ))
        : [
          <Page key={0} number={1}>
            No Highlights!
          </Page>,
        ];

    setPages(pageElements);

  }, [highlights, book_id, user_id]);





  return (
    <div className="min-h-screen">
      <div className="flex min-w-screen justify-center items-center">
        <HTMLFlipBook width={300} height={500} className="mt-20" ref={bookRef}>
          {pages}
        </HTMLFlipBook>
      </div>

    </div>
  );
}

export default TestGenHighlight;


