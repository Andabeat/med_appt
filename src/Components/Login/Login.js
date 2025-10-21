import React from 'react';
import './Login.css';
// If you use react-router-dom for navigation, import Link:
// import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div>
      <div className="container">
        {/* Login grid layout */}
        <div className="login-grid">
          {/* Login header */}
          <div className="login-text">
            <h2>Login</h2>
          </div>

          {/* Sign-up link */}
          <div className="login-text">
            Are you a new member?{' '}
            {/* Use Link if you're using react-router-dom */}
            {/* <Link to="/signup" style={{ color: '#2190FF' }}>Sign Up Here</Link> */}
            <a href="../Sign_Up/Sign_Up.html" style={{ color: '#2190FF' }}>Sign Up Here</a>
          </div>

          <br />

          {/* Login form */}
          <div className="login-form">
            <form>
              {/* Email input */}
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter your email"
                  aria-describedby="helpId"
                />
              </div>

              {/* Password input */}
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter your password"
                  aria-describedby="helpId"
                />
              </div>

              {/* Login and reset buttons */}
              <div className="btn-group">
                <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light">Login</button>
                <button type="reset" className="btn btn-danger mb-2 waves-effect waves-light">Reset</button>
              </div>

              <br />

              {/* Forgot Password text */}
              <div className="login-text">
                Forgot Password?
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* Remove duplicate heading */}
      {/* <h1>Login</h1> */}
    </div>
  );
};

export default Login;
