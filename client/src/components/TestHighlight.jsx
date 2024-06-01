import React from "react";
import { useState, useEffect, useRef } from "react";
import HTMLFlipBook from "react-pageflip";

const Page = React.forwardRef((props, ref) => {
  return (
    <div className="bg-white" ref={ref}>
      <p>{props.children}</p>
      <button onClick={(e) => console.log("i have been clicked")}>Edit</button>
      <p>Page number: {props.number}</p>
    </div>
  );
});

function TestHighlight() {
  const [pages, setPages] = useState([]);
  const [newHighlight, setNewHighlight] = useState();
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
                <Page key={i} number={i + 1}>
                  {page.highlight}
                </Page>
              ))
            : [
                <Page key={0} number={1}>
                  No Highlights!
                </Page>,
              ];

        setPages(pageElements);
      } catch (error) {
        console.log("error");
      }
    };
    fetchData();
  }, []);

  function handleChange(e) {
    setNewHighlight(e.target.value);
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
          <textarea
            cols={50}
            rows={4}
            maxLength={300}
            defaultValue="Add your highlights!"
            className="min-w-fit"
            onChange={handleChange}
          />
          <br />
          <div className="flex justify-around mt-4">
            <button className="py-2 px-4 w-[46px] rounded bg-red-600">x</button>
            <button className="py-2 px-4 w-[46px] rounded bg-green-600">
              &#x2713;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestHighlight;
