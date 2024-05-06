import React from "react";
import { Link } from "react-router-dom";
import "../output.css";

const NavBar = () => {
  return (
    <nav className="flex justify-center container space-x-4">
      <li className="text-blue-400 text-center">
        <Link to="/">Home</Link>
      </li>
      <li className="text-center">
        <Link to="/new">New</Link>
      </li>
    </nav>
  );
};
export default NavBar;
