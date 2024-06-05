
import React from "react";
import "../../output.css"


//this is a basic page that renders if the user does not have permissions
function Page({ highlight, isFront }) {
  return (
    <div className={isFront ? "front-page" : "back-page"}>
      <p>{highlight}</p>
    </div>
  );
}

export default Page;
