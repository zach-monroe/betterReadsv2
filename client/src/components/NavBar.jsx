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
    <nav className="flex justify-between items-center bg-material text-primary z-10 px-20 h-20">
      <div className="hover:text-accent" onClick={changeColor}>
        <Link to="/">Home</Link>
      </div>
      <div className="hover:text-accent">
        <Link to="/new">New</Link>
      </div>
      <div className="hover:text-accent">
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
