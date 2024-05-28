import React from "react";
import "../../output.css"; // Import CSS file for Page styling

function FrontPage({ page, highlight, z }) {
  return (
    <div class="front-page">
      <p>{highlight}</p>
    </div>
  );
}

function BackPage({ page, highlight, z }) {
  return (
    <div class="back-page">
      <p>{highlight}</p>
    </div>
  );
}

export default FrontPage;
export { BackPage };
