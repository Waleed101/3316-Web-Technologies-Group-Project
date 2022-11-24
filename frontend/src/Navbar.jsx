import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/updatePassword">Update Password</Link>
        </li>
        <li>
          <Link to="/deleteAccount">Delete Account</Link>
        </li>
        <li>
          <Link to="/search">Search</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;