import React from "react";
import "../output.css"
import { useState, useEffect, useRef } from "react";
import HTMLFlipBook from "react-pageflip";

const Page = React.forwardRef((props, ref) => {
  function handleClick() {
    console.log(props.entry)
    props.setEntry(props.entry)
    props.setNewHighlight(props.children)
  }
  return (
    <div className="bg-white flex items-around min-h-full" ref={ref}>
      <p className="pt-10">{props.children}</p>
      <button onClick={handleClick} className="absolute bg-secondary rounded px-2 text-white text-lg">&#x270e;</button>
    </div>
  );
});

function TestHighlight() {
  const [pages, setPages] = useState([]);
  const [newHighlight, setNewHighlight] = useState("Add your highlight here!");
  const [entry, setEntry] = useState()

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
              <Page key={i} id={i} entry={page.entry} setEntry={setEntry} setNewHighlight={setNewHighlight}>
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
            book_id: 134,
            user_id: 1,
            entry: entry,
            highlight: newHighlight
          }),
        })
      } catch (error) {
        console.log(error.message)
      }
    }
    sendToApi()
  }

  return (
    <div className="min-h-screen">
      <div className="flex  min-w-screen justify-center items-center">
        <HTMLFlipBook width={200} height={333} className="mt-20" ref={bookRef}>
          {pages}
        </HTMLFlipBook>
      </div>
      <div className="flex justify-center mt-8">
        <div className="bg-primaryDark p-4 rounded mb-10">
          <form onSubmit={handleSubmit}>
            <input type="hidden" value={entry} />
            <textarea
              cols={50}
              rows={4}
              maxLength={300}
              value={newHighlight}
              className="min-w-fit"
              onChange={handleChange}
            />
            <br />
            <div className="flex justify-around mt-4">
              <button className="py-2 px-4 w-[46px] rounded bg-red-600" onClick={handleClose}>x</button>
              <button type="submit" className="py-2 px-4 w-[46px] rounded bg-green-600" >
                &#x2713;
              </button>
            </div></form>
        </div>
      </div>
    </div>
  );
}

export default TestHighlight;
