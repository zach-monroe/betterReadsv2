import React from "react";
import "../../output.css";
import { useState } from "react";

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

function UserFrontPage({ highlight }) {
  const [editableHighlight, setEdit] = useState(highlight);

  return (
    <div className="front-page editable-content text-left items-center wrap max-h-">
      <p contentEditable onChange={(e) => setEdit(e.target.value)}>
        {editableHighlight}
      </p>
    </div>
  );
}

function UserBackPage({ highlight }) {
  const [editableHighlight, setEdit] = useState(highlight);
  return (
    <div className="back-page editable-content">
      <p contentEditable onChange={(e) => setEdit(e.target.value)}>
        {editableHighlight}
      </p>
    </div>
  );
}

export default FrontPage;
export { BackPage, UserFrontPage, UserBackPage };
