import React from "react";
import { useState } from "react";
import HTMLFlipBook from "react-pageflip";
import ContentEditable from "react-contenteditable";

const Page = React.forwardRef((props, ref) => {
  const [html, setHtml] = useState(props.children);

  return (
    <div className="bg-white" ref={ref}>
      <ContentEditable
        html={html}
        style={{ zIndex: 1000 }}
        disable={false}
        onChange={(e) => setHtml(e.target.value)}
      />
      <button onClick={(e) => console.log("i have been clicked")}>Edit</button>
      <p>Page number: {props.number}</p>
    </div>
  );
});

function TestHighlight() {
  return (
    <div className="min-h-screen">
      <div className="flex  min-w-screen justify-center items-center">
        <HTMLFlipBook width={200} height={333} className="mt-20">
          <Page number="1">Please Edit Me</Page>
          <div className="demoPage">Page 2</div>
          <div className="demoPage">Page 3</div>
          <div className="demoPage">Page 4</div>
          <div className="demoPage">Page 5</div>
        </HTMLFlipBook>
      </div>
      <div className="flex justify-center mt-8">
        <div className="bg-primaryDark p-4 rounded mb-10">
          <textarea className="min-w-fit">Add Your Highlights Here</textarea>
        </div>
      </div>
    </div>
  );
}

export default TestHighlight;
