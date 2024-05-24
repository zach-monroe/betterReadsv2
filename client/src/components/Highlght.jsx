import "../output.css";
import React, { useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";

function Highlight() {
  const [backendData, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/highlights?user_id=1&book_id=118");
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  console.log(JSON.stringify(backendData));

  const { highlights } = backendData;
  return (
    <div className="flex justify-center items-center min-h-screen">
      <HTMLFlipBook width={300} height={500}>
        {highlights && highlights.length > 0 ? (
          highlights.map((highlight, i) => (
            <div>
              {highlight.highlight} {i}
            </div>
          ))
        ) : (
          <div>no data</div>
        )}
      </HTMLFlipBook>
    </div>
  );
}

export default Highlight;
