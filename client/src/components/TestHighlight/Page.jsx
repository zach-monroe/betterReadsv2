import React from "react";
import { useAuth } from "../../AuthProvider";

const Page = React.forwardRef(({ user_id, book_id, children, entry, setNewHighlight, setEntry }, ref) => {
  const { user } = useAuth()

  function handleClick() {
    console.log(entry)
    setEntry(entry)
    setNewHighlight(children)
  }

  return (
    <div className={`bg-white relative`} ref={ref}>
      <div className="flex justify-center items-center min-h-full ">
        <div className="flex justify-center items-center">
          <p className="">{children}</p>
        </div>
        <br />

      </div>
      {user?.id === user_id &&
        <div className="flex justify-center mt-2">
          <button onClick={handleClick} className=" bg-secondary rounded mx-4 px-2 text-white text-lg">Edit</button>
        </div>}
    </div>
  );
});

export default Page;
