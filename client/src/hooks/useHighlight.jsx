import { useState, useCallback } from "react";


//custom hook for submitting a highlight.
const useHighlight = () => {
  const [error, setError] = useState()

  const submitHighlight = useCallback(async (book_id, user_id, entry, contentEditableRef) => {
    const highlight = contentEditableRef.current.innerHTML
    try {
      const response = await fetch("http://18.219.34.33:5000/api/highlights/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          book_id: parseInt(book_id, 10),
          user_id: parseInt(user_id, 10),
          entry: parseInt(entry, 10),
          highlight: highlight,
        }),
      });

      if (!response.ok) {
        throw new Error(response.statusText)
      }

    } catch (error) {
      setError("Couldn't add highlight:" + error.message)
    }
  }, [])
  return { submitHighlight, error }
};

export default useHighlight;
