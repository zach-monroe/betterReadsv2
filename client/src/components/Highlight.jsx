import "../output.css";
import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthProvider.js";
import UserFlipBook from "./Highlight/UserFlipBook.jsx";
import GenericFlipBook from "./Highlight/GenericFlipBook.jsx";

function Highlight() {
  const { user } = useAuth();
  const [backendData, setBackendData] = useState({});
  console.log(JSON.stringify(user));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/highlights?user_id=1&book_id=118");
        const data = await response.json();
        setBackendData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  console.log(JSON.stringify(backendData));

  const { highlights } = backendData;
  console.log(highlights);

  return (
    <div className="min-h-screen flex justify-center items-center">
      {highlights && highlights.length > 0 ? (
        highlights.some((highlight) => highlight.user_id === user?.id) ? (
          <UserFlipBook highlights={highlights} />
        ) : (
          <GenericFlipBook highlights={highlights} />
        )
      ) : (
        <p>No highlights available</p>
      )}
    </div>
  );
}
export default Highlight;
