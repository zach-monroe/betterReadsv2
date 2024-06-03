import React from "react";
import { useState } from "react";

const Page = React.forwardRef((props, ref) => {
  const [isDeleting, setDeleting] = useState(false)
  const user_id = props.user_id;
  const book_id = props.book_id;
  const entry = props.entry

  function handleClick() {
    console.log(props.entry)
    props.setEntry(props.entry)
    props.setNewHighlight(props.children)
  }

  function handleDelete(e) {
    e.preventDefault()
    console.log("delete called")
    const deleteFromApi = async () => {
      try {
        const response = await fetch(`/api/highlights/${user_id}/${book_id}/${entry}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
        })
        if (response.ok) {
          console.log("post deleted")
          setDeleting(true)
          setTimeout(() => {
            props.setPages((prevPages) => prevPages.filter((page) => page.props.entry !== entry));
          }, 300); // Adjust the delay as needed for the duration of your fade-out animation
        } else {
          throw new Error()
        }
      } catch (error) { console.log(error) }
    }

    deleteFromApi()

  }
  return (
    <div className={`bg-white relative ${isDeleting ? 'fade-out' : null}`} ref={ref}>
      <div className="flex justify-center items-center min-h-72 ">
        <div className="flex justify-center items-center">
          <p className="">{props.children}</p>
        </div>
        <br />

      </div>
      <div className="flex justify-center pt-4">
        <button onClick={handleClick} className=" bg-secondary rounded mx-4 px-2 text-white text-lg">&#x270e;</button>
        <br />
        <button onClick={handleDelete} className="bg-red-800 mx-4 px-2 text-white text-lg rounded">&#x1f5d1;</button>
      </div>
    </div>
  );
});

export default Page;
