import React from "react";

const Page = React.forwardRef(({ isUser, children, entry, setNewHighlight, setEntry }, ref) => {

  function handleClick() {
    console.log(entry)
    setEntry(entry)
    setNewHighlight(children)
  }

  return (
    <div className="bg-white relative" ref={ref}>
      <div className="flex justify-center items-center min-h-full border-2 border-t-0 border-b-0 border-black">
        <div className="flex justify-center items-center">
          <p className="mx-2">{children}</p>
        </div>
        <br />

      </div>
      {isUser &&
        <div className="flex justify-center mt-2">
          <button onClick={handleClick} className=" bg-secondary rounded mx-4 px-2 text-white text-lg">Edit</button>
        </div>}
    </div>
  );
});

export default Page;
