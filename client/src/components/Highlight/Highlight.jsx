import "../../output.css";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../AuthProvider.js";
import UserFlipBook from "./UserFlipBook"
import GenericFlipBook from "./GenericFlipBook"


//This Function handles the fetching of the highlights for the selected book, as well as rendering the correct flipbook based on user permissions.
function Highlight({ selectedBook }) {
  const { user } = useAuth();
  const [backendData, setBackendData] = useState({});

  useEffect(() => {
    //fetches data from api for this particular book.
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

  //deconstructing backendData into the highlights array for mapping.
  const { highlights } = backendData;

  return (
    <div className="min-h-screen flex justify-center items-center">
      {highlights && highlights.length > 0 ? (
        highlights.some((highlight) => highlight.user_id === user?.id) ? (
          <UserFlipBook highlights={highlights} />
        ) : (
          <GenericFlipBook highlights={highlights} />
        )
      ) : (
        <GenericFlipBook highlights="No Highlights Added" />
      )}
    </div>
  );
}
export default Highlight;
