import React from "react";
import Page from "./Page";

function UserFlipBook({ highlights }) {
  return (
    <div className="book">
      <h1>User can edit</h1>
      {highlights && highlights.length > 0 ? (
        highlights.map((highlight, i) => (
          <Page key={i} page={i + 1} highlight={highlight.highlight} />
        ))
      ) : (
        <p>No Data</p>
      )}
    </div>
  );
}

export default UserFlipBook;
