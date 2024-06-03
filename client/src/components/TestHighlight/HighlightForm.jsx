import React from "react";

export function HighlightForm({ handleClose, handleSubmit, entry, newHighlight, handleChange }) {
  return <div className="flex justify-center mt-8">
    <div className="bg-primaryDark p-4 rounded mb-10">
      <form onSubmit={handleSubmit}>
        <input type="hidden" value={entry} />
        <textarea
          cols={50}
          rows={4}
          maxLength={300}
          value={newHighlight}
          className="min-w-fit"
          onChange={handleChange}
        />
        <br />
        <div className="flex justify-around mt-4">
          <button type="button" className="py-2 px-4 w-[46px] rounded bg-red-600" onClick={handleClose}>x</button>
          <button type="submit" className="py-2 px-4 w-[46px] rounded bg-green-600" >
            &#x2713;
          </button>
        </div></form>
    </div>
  </div>
}
