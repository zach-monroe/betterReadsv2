
import React from "react";
import "../../output.css"
import ContentEditable from "react-contenteditable";
import { useRef } from "react";


//this is a basic page that renders if the user does not have permissions
function Page({ highlight, isFront }) {
  const contentEditableRef = useRef(null)
  return (
    <div className={isFront ? "front-page" : "back-page"}>

      <div className="flex justify-start min-h-full items-center">

        <ContentEditable innerRef={contentEditableRef} html={highlight} disabled={true} />

      </div>
    </div>
  );
}

export default Page;
