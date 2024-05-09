import React from "react";
import { Link } from "react-router-dom";
import "../output.css";

const NavBar = () => {
  function changeColor() {
    console.log("time to change the color");
  }
  return (
    <nav className="navbar flex bg-gray-950 text-gray-300 sticky z-10 rounded  justify-center gap-8">
      <span></span>
      <div className="self-start" onClick={changeColor}>
        <Link to="/">Home</Link>
      </div>
      <div className="text-center">
        <Link to="/new">New</Link>
      </div>
      <div className="text-right">
        <Link to="/login">Log-In/Sign-Up</Link>
      </div>

      <div className="text-right">
        <Link to="/profile">Profile</Link>
      </div>
    </nav>
  );
};
export default NavBar;
