import React from "react";
import "../output.css"
import { useState, useEffect, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import Page from "./TestHighlight/Page"
import { HighlightForm } from "./TestHighlight/HighlightForm";

function TestHighlight() {
  const user_id = 1;
  const book_id = 134
  const [pages, setPages] = useState([]);
  const [newHighlight, setNewHighlight] = useState("Add your highlight here!");
  const [entry, setEntry] = useState('')

  const bookRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/highlights?user_id=1&book_id=134");
        const data = await response.json();
        console.log(JSON.stringify(data));
        const { highlights } = data;
        const pageElements =
          highlights.length > 0
            ? highlights.map((page, i) => (
              <Page key={i} id={i} entry={page.entry} user_id={user_id} book_id={book_id} setEntry={setEntry} setPages={setPages} setNewHighlight={setNewHighlight}>
                {page.highlight}
              </Page>
            ))
            : [
              <Page key={0} number={1}>
                No Highlights!
              </Page>,
            ];

        setPages(pageElements);
        setEntry(highlights.length + 1)
      } catch (error) {
        console.log("error");
      }
    };
    fetchData();
  }, []);

  function handleChange(e) {
    setNewHighlight(e.target.value);
  }

  function handleClose() {
    setNewHighlight("")
    setEntry(pages.length + 1)

  }
  function handleSubmit(e) {
    e.preventDefault()
    console.log(entry)
    const sendToApi = async () => {
      try {
        await fetch("/api/highlights/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            book_id: book_id,
            user_id: user_id,
            entry: entry,
            highlight: newHighlight
          }),
        })
      } catch (error) {
        console.log(error.message)
      }
    }
    sendToApi()
    e.currentTarget.submit()
  }

  return (
    <div className="min-h-screen">
      <div className="flex  min-w-screen justify-center items-center">
        <HTMLFlipBook width={200} height={333} className="mt-20" ref={bookRef}>
          {pages}
        </HTMLFlipBook>
      </div>
      <HighlightForm handleChange={handleChange} handleSubmit={handleSubmit} handleClose={handleClose} entry={entry} newHighlight={newHighlight} />

    </div>
  );
}

export default TestHighlight;
////
//      <div className="flex justify-center mt-8">
//        <div className="bg-primaryDark p-4 rounded mb-10">
//          <form onSubmit={handleSubmit}>
//            <input type="hidden" value={entry} />
//            <textarea
//              cols={50}
//              rows={4}
//              maxLength={300}
//              value={newHighlight}
//              className="min-w-fit"
//              onChange={handleChange}
//            />
//            <br />
//            <div className="flex justify-around mt-4">
//              <button className="py-2 px-4 w-[46px] rounded bg-red-600" onClick={handleClose}>x</button>
//              <button type="submit" className="py-2 px-4 w-[46px] rounded bg-green-600" >
//                &#x2713;
//              </button>
//            </div></form>
//        </div>

