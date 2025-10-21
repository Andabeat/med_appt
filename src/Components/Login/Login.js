// Following code has been commented with appropriate comments for your reference.
import React, { useState, useEffect } from 'react';
import './Login.css'; // optional: apply CSS as per your design
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const Login = () => {
  // State variables for managing form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // useNavigate hook to navigate programmatically
  const navigate = useNavigate();

  // Check if user is already authenticated — if yes, redirect to home
  useEffect(() => {
    if (sessionStorage.getItem('auth-token')) {
      navigate('/');
    }
  }, [navigate]);

  // Function to handle login form submission and API call
  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const json = await res.json();
      console.log("Response from server:", json);

      if (json.authtoken) {
        // If authentication is successful, store data in sessionStorage
        sessionStorage.setItem('auth-token', json.authtoken);
        sessionStorage.setItem('email', email);

        // Extract name before '@' from email and store it
        const username = email.split('@')[0];
        sessionStorage.setItem('username', username);

        // Navigate to home once signed in successfully
        navigate('/');
        window.location.reload();
      } else {
        // Handle failed login attempts
        if (json.errors) {
          for (const error of json.errors) {
            alert(error.msg);
          }
        } else {
          alert(json.error || 'Invalid credentials. Please try again.');
        }
      }
    } catch (err) {
      console.error('Error during login:', err);
      alert('Server connection failed. Please try again later.');
    }
  };

  return (
    <div className="container" style={{ marginTop: '5%' }}>
      <div className="login-grid">
        <div className="login-text">
          <h2>Login</h2>
        </div>
        <div className="login-text">
          Are you a new member?{' '}
          <span>
            <Link to="/signup" style={{ color: '#2190FF' }}>
              Sign Up Here
            </Link>
          </span>
        </div>
        <br />

        <div className="login-form">
          <form onSubmit={login}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              {/* Email input field */}
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                aria-describedby="helpId"
                required
              />
            </div>

            {/* Password input (matches sample solution) */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                aria-describedby="helpId"
                required
              />
            </div>

            <div className="btn-group">
              <button
                type="submit"
                className="btn btn-primary mb-2 mr-1 waves-effect waves-light"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
