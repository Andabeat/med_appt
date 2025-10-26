import React, { useState } from 'react';
import './Sign_Up.css';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const Sign_Up = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showerr, setShowerr] = useState([]);
  const navigate = useNavigate();

  // Handles form field reset
  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setPassword('');
    setShowerr([]);
  };

  const register = async (e) => {
    e.preventDefault();
    setShowerr([]);
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, phone }),
      });

      const json = await response.json();
      if (json.authtoken) {
        const username = email.split('@')[0];
        sessionStorage.setItem('auth-token', json.authtoken);
        sessionStorage.setItem('name', name);
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('phone', phone);
        sessionStorage.setItem('email', email);
        navigate('/');
        window.location.reload();
      } 
      else if (json.errors) {
        const messages = json.errors.map((err) => err.msg);
        setShowerr(messages);
      } 
      else if (json.error) {
        setShowerr([json.error]);
      }
    } catch (err) {
      setShowerr(['Failed to connect to server. Please try again later.']);
    }
  };

  return (
    <div className="container" style={{ marginTop: '5%' }}>
      <div className="signup-grid">
        <div className="signup-form">
          <h1>Sign Up</h1>
          <div className="signup-text1">
            Already a member?{' '}
            <span>
              <Link to="/login" style={{ color: '#2190FF' }}>Login</Link>
            </span>
          </div>
          <form method="POST" onSubmit={register}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                id="name"
                className="form-control"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                id="phone"
                className="form-control"
                placeholder="Enter your phone number"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="btn-group" style={{ width: '100%' }}>
              <button
                type="submit"
                className="btn btn-primary mb-2 mr-1 waves-effect waves-light"
                style={{ width: '100%' }}
              >
                Sign Up
              </button>
              <button
                type="button"
                className="btn btn-danger mb-2 ml-1 waves-effect waves-light"
                style={{ width: '100%', marginTop: '10px' }}
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
            {showerr.length > 0 && (
              <div className="err" style={{ color: 'red', marginTop: '1rem' }}>
                {showerr.map((msg, index) => (
                  <div key={index}>
                    {typeof msg === 'object' ? msg.msg : msg}
                  </div>
                ))}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Sign_Up;
