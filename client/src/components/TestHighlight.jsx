import React, { useState, useRef, useEffect } from "react";
import "../output.css";
import HTMLFlipBook from "react-pageflip";
import Page from "./TestHighlight/Page";
import { HighlightForm } from "./TestHighlight/HighlightForm";

function TestHighlight({ highlights }) {
  const book_id = highlights[0].book_id;
  const user_id = highlights[0].user_id;
  const [pages, setPages] = useState([]);
  const [newHighlight, setNewHighlight] = useState("Add your highlight here!");
  const [entry, setEntry] = useState('');

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
            setEntry={setEntry}
            setPages={setPages}
            setNewHighlight={setNewHighlight}
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
    setEntry(highlights.length + 1);
  }, [highlights, book_id, user_id]);

  function handleChange(e) {
    setNewHighlight(e.target.value);
  }

  function handleClose() {
    setNewHighlight("");
    setEntry(pages.length + 1);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(entry);
    const sendToApi = async () => {
      try {
        await fetch("/api/highlights/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            book_id: book_id,
            user_id: user_id,
            entry: entry,
            highlight: newHighlight,
          }),
        });
      } catch (error) {
        console.log(error.message);
      }
    };
    sendToApi();
    e.currentTarget.submit();
  }

  return (
    <div className="min-h-screen">
      <div className="flex min-w-screen justify-center items-center">
        <HTMLFlipBook width={200} height={333} className="mt-20" ref={bookRef}>
          {pages}
        </HTMLFlipBook>
      </div>
      <HighlightForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        entry={entry}
        newHighlight={newHighlight}
      />
    </div>
  );
}

export default TestHighlight;
