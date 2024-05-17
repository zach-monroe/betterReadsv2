import React from "react";
import { Link } from "react-router-dom";
import "../output.css";
import { useAuth } from "../AuthProvider";
//import { useState } from "react";

const NavBar = () => {
  const user = useAuth();
  //const [hamburgerOpen, setHamburgerOpen] = useState(false);
  function changeColor() {
    console.log("time to change the color");
  }
  console.log(user);
  return (
    <nav className="col-span-1 bg-gray-950 text-gray-300 z-10 w-20">
      <div className="hover:text-blue-800" onClick={changeColor}>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/new">New</Link>
      </div>
      <div>
        {!user.token ? (
          <Link to="/login">Log-In/Sign-Up</Link>
        ) : (
          <Link to="/profile">Profile</Link>
        )}
      </div>
    </nav>
  );
};
export default NavBar;
