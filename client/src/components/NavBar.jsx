import React from "react";
import { Link } from "react-router-dom";
import "../output.css";

const NavBar = () => {
  return (
    <nav className="navbar bg-gray-900 text-white fixed w-full z-10 transition-transform duration-300 transform translate-y-0">
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
