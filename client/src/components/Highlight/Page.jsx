import React from "react";
import "../../output.css"; // Import CSS file for Page styling

function FrontPage({ highlight }) {
  return (
    <div class="front-page">
      <p>{highlight}</p>
    </div>
  );
}

function BackPage({ highlight }) {
  return (
    <div class="back-page">
      <p>{highlight}</p>
    </div>
  );
}

export default FrontPage;
export { BackPage };
