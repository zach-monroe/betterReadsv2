import React from "react";
import Page from "./Page";

function GenericFlipBook({ highlights }) {
  return (
    <div>
      <h1>User can't edit</h1>
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

export default GenericFlipBook;
