import React from "react";
import "../../output.css";
import BookCover from "./BookCover";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";

function BookDetailsModal({
  selectedBook,
  isProfile,
  handleDelete,
  closePopUp,
  setHighlight,
}) {
  function renderHighlight() {
    setHighlight(true);
  }

  return (
    <div className="bg-primaryDark min-w-max rounded p-4 shadow-md flex flex-col items-center justify-between">
      <h5 className="text-2xl text-center mb-4">{selectedBook.title}</h5>
      <div className="flex flex-row items-center text-right my-4">
        <div className="mx-4" onClick={renderHighlight}>
          <BookCover
            isbn={selectedBook.book_isbn}
            isAnimated={true}
            title={selectedBook.title}
          />
        </div>
        <div>
          <p className="text-md mb-2">Rating: {selectedBook.rating}</p>
          <p className="text-md mb-2">
            Author: {selectedBook.author_fname} {selectedBook.author_lname}
          </p>
          {selectedBook.user_fname && (
            <h2 className="text-md mb-2">User: {selectedBook.user_fname}</h2>
          )}
        </div>
      </div>
      {isProfile && (
        <div className="flex justify-center items-center">
          <div className="mx-2">
            <EditButton id={selectedBook.book_id} />
          </div>
          <div className="mx-2">
            <DeleteButton
              id={selectedBook.book_id}
              onDelete={handleDelete}
              closePopUp={closePopUp}
            />
          </div>
        </div>
      )}
      <button className="mt-4 p-2 bg-gray-300 rounded" onClick={closePopUp}>
        Close
      </button>
    </div>
  );
}

export default BookDetailsModal;
