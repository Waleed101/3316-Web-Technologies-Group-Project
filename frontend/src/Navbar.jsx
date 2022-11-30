import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import './index.css'

function Navbar() {
  return (
    <nav>
      <ul>
        <li color="gray.100">
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
        <li>
          <Link to="/playlists">Playlists</Link>
        </li>
        <li>
          <Link to="/public/playlists">Public Playlists</Link>
        </li>
        <li>
          <Link to="/policies">Policies</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;