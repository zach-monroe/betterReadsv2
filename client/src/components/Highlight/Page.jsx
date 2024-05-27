import React from "react";
import "../../output.css"; // Import CSS file for Page styling

function Page({ page, highlight, z }) {
  return (
    <div className="page" style={{ zIndex: z }}>
      <div className="front">{highlight}</div>
      <div className="back">Blank bc its the abck</div>
    </div>
  );
}

export default Page;
