import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleClick = () => setClick(!click);

  const handleLogout = () => {
    // Clear all stored sessions and local storage items
    sessionStorage.clear();
    localStorage.removeItem("doctorData");

    // Clear any saved review form data
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("reviewFormData_")) {
        localStorage.removeItem(key);
      }
    });

    setIsLoggedIn(false);
    setUsername("");
    window.location.reload();
  };

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("email");
    const storedUsername = sessionStorage.getItem("username");

    if (storedEmail) {
      setIsLoggedIn(true);

      // If username already saved (from Sign_Up), use it
      if (storedUsername) {
        setUsername(storedUsername);
      } else {
        // Extract from email if not saved
        const simpleName = storedEmail.split("@")[0];
        setUsername(simpleName);
      }
    }
  }, []);

  return (
    <nav>
      <div className="nav__logo">
        <Link to="/">
          StayHealthy <i style={{ color: "#2190FF" }} className="fa fa-user-md"></i>
        </Link>
        <span>.</span>
      </div>

      <div className="nav__icon" onClick={handleClick}>
        <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
      </div>

      <ul className={click ? "nav__links active" : "nav__links"}>
        <li className="link">
          <Link to="/">Home</Link>
        </li>
        <li className="link">
          <Link to="/find-doctor">Appointments</Link>
        </li>
        <li className="link">
          <Link to="/healthblog">Health Blog</Link>
        </li>
        <li className="link">
          <Link to="/reviews">Reviews</Link>
        </li>

        {isLoggedIn ? (
          <>
            <li className="link">
              {/* Display username extracted from email */}
              <span className="navbar-username">{username && `Welcome ${username.charAt(0).toUpperCase() + username.slice(1)}`}</span>
            </li>
            <li className="link">
              <button className="btn2" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="link">
              <Link to="/signup">
                <button className="btn1">Sign Up</button>
              </Link>
            </li>
            <li className="link">
              <Link to="/login">
                <button className="btn1">Login</button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
