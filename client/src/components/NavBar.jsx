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
    <div className="flex justify-center mx-auto">
      <nav className="grid grid-cols-6 mx-auto px-10 mx-16 place-items-center text-left bg-material text-primary z-10 min-w-full h-20">
        <div className="col-start-1 hover:text-accent" onClick={changeColor}>
          <Link to="/">Home</Link>
        </div>
        <div className="col-start-5 hover:text-accent">
          <Link to="/new">New</Link>
        </div>
        <div className="hover:text-accent">
          {!user.token ? (
            <Link to="/login">Log-In</Link>
          ) : (
            <Link to="/profile">Profile</Link>
          )}
        </div>
      </nav>
    </div>
  );
};
export default NavBar;
