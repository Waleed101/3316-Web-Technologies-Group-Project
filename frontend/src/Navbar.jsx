import {React, useState} from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import './index.css'
import { getAuth, onAuthStateChanged, signOut} from "firebase/auth";
import "./firebase.js"

function Navbar() {
  const auth = getAuth();
  const [user, setUser] = useState(null)
  onAuthStateChanged(auth, (user) => {
      if (user) setUser(user)
  })
  
  return (
    <nav>
      <br/>
      <ul class="navbar">
        <li>
          <Link to="/">Home</Link>
        </li>
        {user ? 
          <>
            <li>
              <Link to="/updatepassword">Update Password</Link>
            </li>
            <li>
              <Link to="/deleteaccount">Delete Account</Link>
            </li>
            <li>
              <Link to="/playlists">Playlists</Link>
            </li>
          </>
        : 
          <>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        }
        
        <li>
          <Link to="/search">Search</Link>
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