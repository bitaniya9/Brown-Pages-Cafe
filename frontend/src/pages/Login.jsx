import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>Login</h1>
        <form className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" required />
          </div>
          <button type="submit" className="hero-btn auth-button">
            Sign In
          </button>
        </form>
        <p className="auth-switch">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;