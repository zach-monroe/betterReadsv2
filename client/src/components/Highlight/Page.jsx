import React from "react";
import "../../output.css";
import { useState, useRef } from "react";
import ContentEditable from "react-contenteditable";

function Page({ highlight, isFront }) {
  return (
    <div className={isFront ? "front-page" : "back-page"}>
      <p>{highlight}</p>
    </div>
  );
}

function UserPage({ highlight, entry, user_id, book_id, isFront }) {
  const [editableHighlight, setEdit] = useState(highlight);
  const contentEditableRef = useRef(null);

  async function submitHighlight() {
    try {
      const response = await fetch("/api/highlights/", {
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
      const data = await response.json()
      console.log(JSON.stringify(data))

      if (!response.ok) {
        throw new Error("couldn't add highlight" + response.statusText);
      }
    } catch (error) {
      throw new Error("couldn't add highlight" + error.message);
    }
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
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

function FullPage({
  frontHighlight,
  frontEntry,
  backHighlight,
  backEntry,
  isUser,
  book_id,
  user_id,
  counter,
  i,
  currentPage,
  highlights_length,
}) {
  if (isUser) {
    return (
      <div
        className="page"
        id={`page${counter}`}
        key={counter}
        style={{
          zIndex:
            currentPage > counter
              ? highlights_length + i * i
              : (highlights_length + 10) - counter,
          transform:
            currentPage > counter ? "rotateY(-180deg)" : "rotateY(0deg)",
        }}
      >
        <UserPage
          isFront={true}
          highlight={frontHighlight}
          entry={frontEntry}
          user_id={user_id}
          book_id={book_id}
        />
        <UserPage
          isFront={false}
          highlight={backHighlight}
          entry={backEntry}
          user_id={user_id}
          book_id={book_id}
        />
      </div>
    );
  } else {
    return (
      <div
        className="page"
        id={`page${counter}`}
        key={counter}
        style={{
          zIndex:
            currentPage > counter
              ? highlights_length + i * i
              : highlights_length - counter,
          transform:
            currentPage > counter ? "rotateY(-180deg)" : "rotateY(0deg)",
        }}
      >
        <Page
          isFront={true}
          highlight={frontHighlight}
          entry={frontEntry}
          user_id={user_id}
          book_id={book_id}
        />
        <Page
          isFront={false}
          highlight={backHighlight}
          entry={backEntry}
          user_id={user_id}
          book_id={book_id}
        />
      </div>
    );
  }
}

export default FullPage;
