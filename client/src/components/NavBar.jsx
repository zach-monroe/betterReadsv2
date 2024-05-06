import React from "react";
import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <div className="container">
      <li className="text-blue">
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
