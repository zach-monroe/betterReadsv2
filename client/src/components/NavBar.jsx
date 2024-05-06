import React from "react";
import { Link } from "react-router-dom";
import "../output.css";
const NavBar = () => {
  return (
    <div className="container">
      <li className="text-blue text-xl">
        <Link className="mx-auto text-blue" to="/">
          Home
        </Link>
      </li>
      <li>
        <Link to="/new">New</Link>
      </li>
    </div>
  );
};
export default NavBar;
