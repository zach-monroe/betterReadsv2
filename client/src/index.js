import React from "react";
import ReactDOM from "react-dom/client";
import "../src/output.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

//TODOS GO HERE;
//
//Home.jsx:
//TODO: Style and layout
//
//Book.jsx:
//TODO: Add functionality for editing and deleting entries
//TODO: Refactor into individual components. Maybe make the image component its own entity in a folder titled Book/
//TODO: Style book components
//
//
// App.jsx
//TODO: make navbar own component
//TODO: style navbar
//
// New.jsx:
//TODO: Add redirect functionality after successful submit
// TODO: Add Edit functionality as well.
//
//Login.jsx
//TODO: set up OAuth with passport
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
