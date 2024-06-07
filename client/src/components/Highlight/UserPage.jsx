import React from "react";
import "../../output.css";
import { useState, useRef } from "react";
import ContentEditable from "react-contenteditable";


//This is a page that renders if the user does have permisisons.
function UserPage({ highlight, entry, user_id, book_id, isFront }) {
  const [editableHighlight, setEdit] = useState(highlight !== "" ? highlight : "Add Your Highlight Here");
  const contentEditableRef = useRef(null);

  async function submitHighlight() {
    try {
      //handles submission of the highlight if they hit the enter key.
      const response = await fetch("http://18.219.34.33:5000/api/highlights/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          book_id: parseInt(book_id, 10),
          user_id: parseInt(user_id, 10),
          entry: parseInt(entry, 10),
          highlight: contentEditableRef.current.innerHTML,
        }),
      })

      if (!response.ok) {
        throw new Error("couldn't add highlight" + response.statusText);
      }
    } catch (error) {
      throw new Error("couldn't add highlight" + error.message);
    }
  }

  //this handles if the user has hit the enter key, triggering submission of the Highlight 
  //instead of adding a new space to the editable content
  //
  //TODO: Take care of ben's comment below.

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      // Function needed to get rid of '&nbsp;' when user hits space twice -- the characters show up in HTML and ends up getting sent in the POST request
      e.preventDefault();
      submitHighlight();
      contentEditableRef.current.blur();
    }
  }


  return (
    <div className={`${isFront ? "front-page" : "back-page"} editable-content`}>
      <div className="flex justify-start min-h-full items-center">
        <ContentEditable
          innerRef={contentEditableRef}
          html={editableHighlight}
          onChange={(e) => setEdit(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      </div>
    </div>
  );
}

export default UserPage;
