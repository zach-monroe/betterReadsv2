import React from "react";
import "../../output.css";
import Page from "./GenericPage"
import UserPage from "./UserPage"


//This function is what is sent to the UserFlipBook and the GenericFlipBook component and used in their logic.
//They pass their props in this manner.
//Generic/UserFlipBook --> FullPage --> Page/UserPage


function FullPage({
  frontHighlight,
  frontEntry,
  backHighlight,
  backEntry,
  isUser,
  book_id,
  user_id,
  counter,
  i,
  currentPage,
  highlights_length,
}) {
  if (isUser) {
    return (
      <div
        className="page"
        id={`page${counter}`}
        key={counter}
        style={{//Handles the page flip functionality based on some basic logic.
          zIndex:
            currentPage > counter
              ? highlights_length + i * i
              : (highlights_length + 10) - counter,
          transform:
            currentPage > counter ? "rotateY(-180deg)" : "rotateY(0deg)",
        }}
      >
        <UserPage
          isFront={true}
          highlight={frontHighlight}
          entry={frontEntry}
          user_id={user_id}
          book_id={book_id}
        />
        <UserPage
          isFront={false}
          highlight={backHighlight}
          entry={backEntry}
          user_id={user_id}
          book_id={book_id}
        />
      </div>
    );
  } else {
    return (
      <div
        className="page"
        id={`page${counter}`}
        key={counter}
        style={{ //Handles the page flip functionality based on some basic logic.
          zIndex:
            currentPage > counter
              ? highlights_length + i * i
              : highlights_length - i,
          transform:
            currentPage > counter ? "rotateY(-180deg)" : "rotateY(0deg)",
        }}
      >
        <Page
          isFront={true}
          highlight={frontHighlight}
          entry={frontEntry}
          user_id={user_id}
          book_id={book_id}
        />
        <Page
          isFront={false}
          highlight={backHighlight}
          entry={backEntry}
          user_id={user_id}
          book_id={book_id}
        />
      </div>
    );
  }
}

export default FullPage;
