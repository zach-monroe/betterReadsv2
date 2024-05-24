import React from "react";
import { slide as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthProvider";

function Burger() {
  const { token } = useAuth();
  return (
    <Menu>
      <Link to="/">Home</Link>
      <Link to="/new">New</Link>
      {token ? (
        <Link to="/profile">Profile</Link>
      ) : (
        <Link to="/login">Log-In</Link>
      )}
    </Menu>
  );
}

export default Burger;
