import React from "react";
import "../../output.css";
import { useState } from "react";
import ContentEditable from "react-contenteditable";

function FrontPage({ highlight }) {
  return (
    <div className="front-page">
      <p>{highlight}</p>
    </div>
  );
}

function BackPage({ highlight }) {
  return (
    <div className="back-page">
      <p>{highlight}</p>
    </div>
  );
}

function UserFrontPage({ highlight, entry, user_id, book_id }) {
  const [editableHighlight, setEdit] = useState(highlight);
  console.log(highlight, entry, user_id, book_id);

  async function submitHighlight() {
    try {
      console.log(editableHighlight);
      console.log(
        "request body:",
        JSON.stringify({
          book_id: parseInt(book_id, 10),
          user_id: parseInt(user_id, 10),
          entry: parseInt(entry, 10),
          highlight: editableHighlight,
        }),
      );
      const response = await fetch("/api/highlights/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          book_id: parseInt(book_id, 10),
          user_id: parseInt(user_id, 10),
          entry: parseInt(entry, 10),
          highlight: editableHighlight,
        }),
      });
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
    }
  }
  return (
    <div className="front-page editable-content">
      <ContentEditable
        html={`<p>${editableHighlight}</p>`}
        onChange={(e) => setEdit(e.target.value)}
        onKeyDown={handleKeyPress}
      />
    </div>
  );
}

function UserBackPage({ highlight, entry, user_id, book_id }) {
  const [editableHighlight, setEdit] = useState(highlight);
  console.log(highlight, entry, user_id, book_id);

  async function submitHighlight() {
    try {
      console.log(editableHighlight);
      console.log(
        "request body:",
        JSON.stringify({
          book_id: parseInt(book_id, 10),
          user_id: parseInt(user_id, 10),
          entry: parseInt(entry, 10),
          highlight: editableHighlight,
        }),
      );
      const response = await fetch("/api/highlights/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          book_id: parseInt(book_id, 10),
          user_id: parseInt(user_id, 10),
          entry: parseInt(entry, 10),
          highlight: editableHighlight,
        }),
      });
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
    }
  }
  return (
    <div className="back-page editable-content">
      <ContentEditable
        html={`<p>${editableHighlight}</p>`}
        onChange={(e) => setEdit(e.target.value)}
        onKeyDown={handleKeyPress}
      />
    </div>
  );
}

export default FrontPage;
export { BackPage, UserFrontPage, UserBackPage };
