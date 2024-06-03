import "../../output.css";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../AuthProvider.js";
import TestHighlight from "../TestHighlight.jsx";

function Highlight({ selectedBook }) {
  const { user } = useAuth();
  const [backendData, setBackendData] = useState({});
  console.log(JSON.stringify(user));
  console.log(JSON.stringify(selectedBook));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/highlights?user_id=${selectedBook.user_id}&book_id=${selectedBook.book_id}`,
        );
        const data = await response.json();
        setBackendData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [selectedBook]);

  console.log(JSON.stringify(backendData));

  const { highlights } = backendData;
  console.log(highlights);

  return (
    <div className="min-h-screen flex justify-center items-center">
      {highlights && highlights.length > 0 ? (
        highlights.some((highlight) => highlight.user_id === user?.id) ? (
          <TestHighlight highlights={highlights} isUser={true} />
        ) : (
          <TestHighlight highlights={highlights} isUser={false} />
        )
      ) : (
        <TestHighlight highlights="No Highlights Added" isUser={false} />
      )}
    </div>
  );
}
export default Highlight;
