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
    setShowDropdown(false);
    window.location.reload();
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const closeDropdown = (e) => {
      if (!e.target.closest('.profile-dropdown')) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('click', closeDropdown);
    }

    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, [showDropdown]);

  useEffect(() => {
    const updateUsername = () => {
      const storedEmail = sessionStorage.getItem("email");
      const storedUsername = sessionStorage.getItem("username");
  
      if (storedEmail) {
        setIsLoggedIn(true);
        setUsername(storedUsername || storedEmail.split("@")[0]);
      }
    };
  
    // Run when component loads
    updateUsername();
  
    // Listen for storage changes (e.g. from ProfileCard)
    window.addEventListener("storage", updateUsername);
  
    return () => {
      window.removeEventListener("storage", updateUsername);
    };
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
            <li className="link profile-dropdown">
              {/* Dropdown for logged-in user */}
              <div className="profile-menu" onClick={toggleDropdown}>
                <span className="navbar-username">
                  Welcome, {username && username.charAt(0).toUpperCase() + username.slice(1)}
                </span>
                <i className={`fa fa-chevron-${showDropdown ? 'up' : 'down'}`} style={{ marginLeft: '5px', fontSize: '12px' }}></i>
              </div>
              
              {showDropdown && (
                <div className="dropdown-menu show">
                  <Link to="/profile" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                    Your Profile
                  </Link>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item logout-item" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
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
