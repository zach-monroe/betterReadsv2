import "../../output.css";
import React, { useState, useRef } from "react";
import ContentEditable from "react-contenteditable";
import useHighlight from "../../hooks/useHighlight";


//This is a page that renders if the user does have permisisons.
function UserPage({ highlight, entry, user_id, book_id, isFront }) {
  const [editableHighlight, setEdit] = useState(highlight !== "" ? highlight : "Add Your Highlight Here");
  const contentEditableRef = useRef(null);
  const { submitHighlight, error } = useHighlight()


  //this handles if the user has hit the enter key, triggering submission of the Highlight 
  //instead of adding a new space to the editable content
  async function handleKeyPress(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      try { submitHighlight(book_id, user_id, entry, contentEditableRef); }
      finally { contentEditableRef.current.blur() }
    } else {
      setEdit(contentEditableRef.current.innerHTML)

    }
  }


  return (
    <div className={`${isFront ? "front-page" : "back-page"} editable-content`}>
      <div className="flex justify-start min-h-full items-center">
        <ContentEditable
          innerRef={contentEditableRef}
          html={editableHighlight}
          onKeyDown={handleKeyPress}
          onChange={(e) => setEdit(e.target.value)}
        />
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}

export default UserPage;
