import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>Sign Up</h1>
        <form className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" required />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" required />
          </div>
          <button type="submit" className="hero-btn auth-button">
            Create Account
          </button>
        </form>
        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
